import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_STORES } from "../queries/stores.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const ContractForm = () => {
  const [stores, setStores] = useState<string[]>([]);
  const { wallet } = useWallet();

  const accountId = wallet?.activeAccount?.accountId;
  console.log(wallet);

  const { refetch: fetchStores } = useQuery(GET_STORES, {
    variables: {
      accountId,
    },
    onCompleted: (data) => {
      if (!accountId) {
        return;
      }

      if (data && data.mb_store_minters?.length) {
        console.log(data);
        setStores(
          data.mb_store_minters.map(({ nft_contract_id }) => nft_contract_id)
        );
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="w-full mt-24">
      <div className="flex justify-between mb-16">
        <p className="font-bold text-2xl text-light-black">
          Manage your smart contract
        </p>
        <button className="">+ NEW</button>
      </div>

      <div className="flex flex-col gap-12">
        <div>
          Select your contract
          <div
            className={`flex items-center justify-between rounded relative border-2 border-light-green py-1.5 px-3 w-48`}
          >
            <select
              id="select"
              className="bg-transparent focus:outline-none w-full cursor-pointer"
              //   onChange={(event) => onValueChange(event.target.value)}
            >
              {stores.map((store) => (
                <option value={store}>{store}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>Add new minter</div>
          <input />
        </div>

        <div>
          <div>Remove minter</div>
          <input />
        </div>

        <div>
          <div>Transfer ownership</div>
          <input />
        </div>
      </div>
    </div>
  );
};

export default ContractForm;
