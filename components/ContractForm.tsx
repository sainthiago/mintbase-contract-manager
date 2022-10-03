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
    <>
      <div>
        Select your contract
        <div
          className={`select-wrapper flex items-center justify-between rounded relative border-2 border-light-green py-1.5 px-3`}
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
        Add new minter
        <input />
      </div>
      <div>
        Remove minter
        <input />
      </div>
      <div>
        Transfer ownership
        <input />
      </div>
      <button>+ NEW</button>
    </>
  );
};

export default ContractForm;
