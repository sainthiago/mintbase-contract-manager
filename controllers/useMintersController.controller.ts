import { useQuery } from "@apollo/client";
import { useMbWallet } from "@mintbase-js/react";
import {
  addMinter,
  batchChangeMinters,
  execute,
  removeMinter,
} from "@mintbase-js/sdk";
import { useState } from "react";
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
    const wallet = await selector.wallet();

    if (minters.length === 1) {
      const revokeMinterArgs = removeMinter({
        minterId: minters[0],
        contractAddress: storeId,
      });

      await execute({ wallet }, revokeMinterArgs);
    } else {
      const revokeMintersArgs = batchChangeMinters({
        contractAddress: storeId,
        removeMinters: minters,
      });

      await execute({ wallet }, revokeMintersArgs);
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
