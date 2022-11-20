import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_STORES } from "../queries/stores.graphql";
import { useWallet } from "../services/providers/MintbaseWalletContext";
import CreateStoreModal from "./Modals/CreateStoreModal";
import ManageMintersModal from "./Modals/ManageMintersModal";
import Modal from "./Modals/Modal";
import TransferOwnershipModal from "./Modals/TransfersOwnershipModal";

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

  useEffect(() => {
    if (!stores?.length) return;
    setSelectedStoreId(stores[0]);
  }, [stores]);

  return (
    <>
      <div className="w-full mt-24">
        <div className="flex justify-between mb-16 gap-4 flex-wrap">
          <div>
            <p className="font-bold text-2xl text-light-black mb-4">
              Manage your smart contract
            </p>
            <div className="flex items-center justify-between rounded relative border-2 border-light-green py-1.5 px-3 w-full">
              <select
                id="select"
                className="bg-transparent focus:outline-none w-full cursor-pointer"
                onChange={(event) => setSelectedStoreId(event.target.value)}
              >
                {stores.map((store) => (
                  <option value={store}>{store}</option>
                ))}
              </select>
            </div>
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

        <div className="flex flex-wrap gap-8">
          <button
            className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
            onClick={() => setManageMintersModal(true)}
          >
            Manage minters
          </button>

          <button
            className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
            onClick={() => setTransferOwnershipModal(true)}
          >
            Transfer ownership
          </button>
        </div>
      </div>
      <Modal isOpen={manageMintersModal} setIsOpen={setManageMintersModal}>
        <ManageMintersModal storeId={selectedStoreId} />
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
