import { useQuery } from "@apollo/client";
import { useState } from "react";
import { TransactionSuccessEnum } from "../constants/enums";
import { IMinters } from "../interfaces";
import { GET_MINTERS_BY_STORE_ID } from "../queries/minters.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";

export const useMintersController = (storeId: string) => {
  const { wallet } = useWallet();

  const [minterAccounts, setMinterAccounts] = useState<string[]>([]);

  const { loading: isLoadingMinters } = useQuery(GET_MINTERS_BY_STORE_ID, {
    variables: {
      contractId: storeId,
    },
    onCompleted: (data: IMinters) => {
      const minters = data.mb_store_minters.flatMap((s) => s.minter_id);

      setMinterAccounts(minters);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleAddMinter = async (minter: string) => {
    await wallet.grantMinter(minter, storeId as string, {
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        type: TransactionSuccessEnum.ADD_MINTER,
        args: {
          minterId: minter,
          contractName: storeId,
        },
      }),
    });
    return null;
  };

  const handleRevokeMinters = async (minters: string[]) => {
    if (minters.length === 1) {
      wallet.revokeMinter(minters[0], storeId as string, {
        callbackUrl: `${window.location.origin}/wallet-callback`,
        meta: JSON.stringify({
          type: TransactionSuccessEnum.REVOKE_MINTER,
          args: {
            minterId: minters[0],
            contractName: storeId,
          },
        }),
      });
    } else {
      wallet.batchChangeMinters([], minters, storeId as string, {
        callbackUrl: `${window.location.origin}/wallet-callback`,
        meta: JSON.stringify({
          type: TransactionSuccessEnum.REVOKE_MINTER,
          args: {
            minterId: minters,
            contractName: storeId,
          },
        }),
      });
    }
    return null;
  };

  return {
    minterAccounts,
    isLoadingMinters,
    handleAddMinter,
    handleRevokeMinters,
  };
};
