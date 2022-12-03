import { useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { GET_STORES } from "../queries/stores.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import InputSelect from "./InputSelect";
import CreateStoreModal from "./Modals/CreateStoreModal";
import ManageMintersModal from "./Modals/ManageMintersModal";
import Modal from "./Modals/Modal";
import TransferOwnershipModal from "./Modals/TransfersOwnershipModal";

const animatedComponents = makeAnimated();

const ContractForm = () => {
  const [stores, setStores] = useState<string[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const { wallet } = useWallet();

  const [manageMintersModal, setManageMintersModal] = useState(false);
  const [transferOwnershipModal, setTransferOwnershipModal] = useState(false);
  const [newStoreModal, setNewStoreModal] = useState(false);

  const accountId = wallet?.activeAccount?.accountId;

  const { refetch: fetchStores } = useQuery(GET_STORES, {
    variables: {
      accountId,
    },
    onCompleted: (data) => {
      if (!accountId) {
        return;
      }

      if (data && data.mb_store_minters?.length) {
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
          <div>
            <p className="font-bold text-2xl text-light-black mb-4">
              Manage your smart contract
            </p>
          </div>
          <div>
            <button
              className="font-bold block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              onClick={() => setNewStoreModal(true)}
            >
              + New
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-12 justify-center items-center">
          <div className="w-full sm:w-96">
            <InputSelect
              placeholder="select store"
              options={stores.map((store) => {
                return { value: store, label: store };
              })}
              setValue={setSelectedStoreId}
            />
          </div>
          <div className="flex gap-8 flex-wrap">
            <button
              className={`block w-fit py-2 px-4 text-sm rounded-full text-white ${
                !selectedStoreId
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-light-green cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              }`}
              onClick={() => setManageMintersModal(true)}
            >
              Manage minters
            </button>

            <button
              className={`block w-fit py-2 px-4 text-sm rounded-full text-white ${
                !selectedStoreId
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-light-green cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              }`}
              onClick={() => setTransferOwnershipModal(true)}
            >
              Transfer ownership
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={manageMintersModal} setIsOpen={setManageMintersModal}>
        <ManageMintersModal storeId={selectedStoreId} accountId={accountId} />
      </Modal>
      <Modal
        isOpen={transferOwnershipModal}
        setIsOpen={setTransferOwnershipModal}
      >
        <TransferOwnershipModal storeId={selectedStoreId} />
      </Modal>
      <Modal isOpen={newStoreModal} setIsOpen={setNewStoreModal}>
        <CreateStoreModal />
      </Modal>
    </>
  );
};

export default ContractForm;
