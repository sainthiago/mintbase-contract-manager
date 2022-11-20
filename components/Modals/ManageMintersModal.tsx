import { useMintersController } from "../../controllers/useMintersController.controller";

const ManageMintersModal = ({ storeId }: { storeId: string }) => {
  const {
    handleAddMinter,
    handleRevokeMinter,
    isLoadingMinters,
    minterAccounts,
  } = useMintersController(storeId);

  return (
    <div className="flex flex-col gap-8">
      <p className="mb-4 font-bold text-lg">Manage Minters</p>
      <div className="grid grid-cols-3 gap-x-24 gap-y-2">
        {minterAccounts.map((minter, index) => (
          <div className="flex gap-2 items-center" key={`${minter}_${index}`}>
            <p>{minter}</p>
            <p
              className="font-bold text-lg text-red-500 cursor-pointer transform transition duration-200 hover:scale-105 hover:-translate-y-0.5 hover:text-red-600"
              onClick={() => handleRevokeMinter(minter)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMintersModal;
