import { useLazyQuery } from "@apollo/client";
import { CHECK_STORE } from "../queries/stores.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";

export const useStoreController = () => {
  const { wallet } = useWallet();

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
    await wallet.transferStoreOwnership(newOwner, storeId as string, {
      keepOldMinters: true,
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        args: {
          newOwner: newOwner,
          contractName: storeId,
        },
      }),
    });
  };

  const deployStore = async (name: string, symbol: string) => {
    await wallet.deployStore(name, symbol, {
      attachedDeposit: "6500000000000000000000000",
      icon: "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAJCT/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAEQAAAAEAEAEAEAAAAQAQAQAQAAAAEREREQAAAAAAEAAAAAAAAAAQAAAAAAAAABEQAAEQAAAAEAEAEAEAAAAQAQAQAQAAAAEREREQAAAAAAAAEAAAAAAAAAAQAAAAAAAAERAAAAAAAAEAEAAAAAAAAQAQAAAAAAAAEQAADnnwAA228AANtvAADgHwAA+/8AAPv/AAD48wAA+20AAPttAAD8AwAA/+8AAP/vAAD/jwAA/28AAP9vAAD/nwAA",
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        args: {
          contractName: `${name}.${wallet.constants.FACTORY_CONTRACT_NAME}`,
        },
      }),
    });
  };

  return {
    transferOwnership,
    deployStore,
    checkStoreName,
  };
};
