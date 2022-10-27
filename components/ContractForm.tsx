import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ReactSimpleModal } from "react-awesome-simple-modal";
import { GET_STORES } from "../queries/stores.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const ContractForm = () => {
  const [stores, setStores] = useState<string[]>([]);
  const { wallet } = useWallet();

  const [addMintersModal, setAddMintersModal] = useState(false);
  const [removeMintersModal, setRemoveMintersModal] = useState(false);
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const [newStoreModal, setNewStoreModal] = useState(false);

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
      <div className="w-full mt-24">
        <div className="flex justify-between mb-16 gap-4 flex-wrap">
          <p className="font-bold text-2xl text-light-black">
            Manage your smart contract
          </p>
          <button
            className="font-bold block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
            onClick={() => setNewStoreModal(true)}
          >
            + New
          </button>
        </div>

        <div className="flex flex-col gap-36 items-center text-center">
          <div>
            <p className="mb-4 font-bold text-lg">Select your contract</p>
            <div className="flex items-center justify-between rounded relative border-2 border-light-green py-1.5 px-3 w-full">
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
          <div className="flex flex-wrap gap-8 justify-center">
            <button
              className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              onClick={() => setAddMintersModal(true)}
            >
              Add new minter
            </button>

            <button
              className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              onClick={() => setRemoveMintersModal(true)}
            >
              Remove minter
            </button>

            <button
              className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              onClick={() => setTransferOwnershipModal(true)}
            >
              Transfer ownership
            </button>
          </div>
        </div>
      </div>
      <ReactSimpleModal
        open={addMintersModal}
        onClose={() => setAddMintersModal(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1>Hello!</h1>
        </div>
      </ReactSimpleModal>
      <ReactSimpleModal
        open={removeMintersModal}
        onClose={() => setRemoveMintersModal(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1>Hello!</h1>
        </div>
      </ReactSimpleModal>
      <ReactSimpleModal
        open={transferOwnershipModal}
        onClose={() => setTransferOwnershipModal(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1>Hello!</h1>
        </div>
      </ReactSimpleModal>
      <ReactSimpleModal
        open={newStoreModal}
        onClose={() => setNewStoreModal(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <h1>Hello!</h1>
        </div>
      </ReactSimpleModal>
    </>
  );
};

export default ContractForm;
