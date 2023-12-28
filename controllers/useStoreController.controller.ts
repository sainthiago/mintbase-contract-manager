import { useLazyQuery } from "@apollo/client";
import { useMbWallet } from "@mintbase-js/react";
import { CHECK_STORE } from "../queries/stores.graphql";
import {
  MINTBASE_CONTRACTS,
  deployContract,
  execute,
  mbjs,
  transferContractOwnership,
} from "@mintbase-js/sdk";
import { getCurrentNetwork } from "../utils/getCurrentNetwork";

export const useStoreController = () => {
  const { selector, activeAccountId } = useMbWallet();

  const [checkStoreNameExists] = useLazyQuery<any>(CHECK_STORE);

  const checkStoreName = async (store: string) => {
    const req = await checkStoreNameExists({
      variables: { name: store },
    });

    const { data, error } = req;

    if (error) {
      return false;
    }

    return data?.nft_contracts.length === 0;
  };

  const transferOwnership = async (newOwner: string, storeId: string) => {
    const wallet = await selector.wallet();

    const transferOwnershipArgs = transferContractOwnership({
      contractAddress: storeId,
      nextOwner: newOwner,
      options: { keepMinters: true },
    });

    await execute({ wallet }, transferOwnershipArgs);
  };

  const deployStore = async (name: string, symbol: string) => {
    const wallet = await selector.wallet();

    const deployArgs = deployContract({
      name: name,
      ownerId: activeAccountId,
      factoryContractId: MINTBASE_CONTRACTS[getCurrentNetwork()],
      metadata: {
        symbol: symbol,
      },
    });

    await execute({ wallet }, deployArgs);
  };

  return {
    transferOwnership,
    deployStore,
    checkStoreName,
  };
};
