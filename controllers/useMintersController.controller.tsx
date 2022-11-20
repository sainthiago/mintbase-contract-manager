import { useQuery } from "@apollo/client";
import { useState } from "react";
import { TransactionSuccessEnum } from "../constants/enums";
import { IMinters } from "../interfaces";
import { GET_MINTERS_BY_STORE_ID } from "../queries/minters.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";

export const useMintersController = (storeId: string) => {
  const { wallet } = useWallet();

  // store minters state
  const [minterAccounts, setMinterAccounts] = useState<string[]>([]);
  const [pendingMinterAccount, setPendingMinterAccount] = useState<
    string | null
  >(null);

  //   const [minterSavedStatus, setMinterSavedStatus] =
  //     useState<SavedStatus | null>(null);

  // query for minters
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

  const handleAddMinter = async (minters: string) => {
    await wallet.grantMinter(minters[0], storeId as string, {
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        type: TransactionSuccessEnum.ADD_MINTER,
        args: {
          minterId: pendingMinterAccount,
          contractName: storeId,
        },
      }),
    });
    return null;
  };

  const handleRevokeMinter = async (minter: string) => {
    wallet.revokeMinter(minter, storeId as string, {
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        type: TransactionSuccessEnum.REVOKE_MINTER,
        args: {
          minterId: pendingMinterAccount,
          contractName: storeId,
        },
      }),
    });

    return null;
  };

  return {
    minterAccounts,
    isLoadingMinters,
    handleAddMinter,
    handleRevokeMinter,
  };
};
