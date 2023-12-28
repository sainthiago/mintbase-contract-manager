import { useQuery } from "@apollo/client";
import { useMbWallet } from "@mintbase-js/react";
import { addMinter, execute } from "@mintbase-js/sdk";
import { useState } from "react";
import { TransactionSuccessEnum } from "../constants/enums";
import { IMinters } from "../interfaces";
import { GET_MINTERS_BY_STORE_ID } from "../queries/minters.graphql";

export const useMintersController = (storeId: string) => {
  const { selector } = useMbWallet();

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
    const wallet = await selector.wallet();

    const grantMinterArgs = addMinter({
      minterId: minter,
      contractAddress: storeId,
    });

    await execute({ wallet }, grantMinterArgs);

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
