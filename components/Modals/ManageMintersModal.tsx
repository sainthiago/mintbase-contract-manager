import { debounce } from "lodash";
import { useMintersController } from "../../controllers/useMintersController.controller";
import { getCurrentRpc } from "../../utils/getCurrentRpc";
import { walletExists } from "../../utils/walletExists";

const ManageMintersModal = ({ storeId }: { storeId: string }) => {
  const {
    handleAddMinter,
    handleRevokeMinter,
    isLoadingMinters,
    minterAccounts,
  } = useMintersController(storeId);

  const validateAccount = async (account: string) => {
    const valid = await walletExists(account, getCurrentRpc());

    return valid;
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <p className="mb-4 font-bold text-lg mb-4">Manage Minters</p>
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

      <div>
        <p className="mb-4 font-bold">Add minter</p>
        <div className="flex gap-4">
          <input
            className="rounded relative border-2 border-light-green py-1.5 px-3 bg-transparent focus:outline-none w-full"
            onChange={debounce(async (e) => {
              const value = e.target.value ?? null;
              await validateAccount(value);
            }, 500)}
          />
          <button className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMintersModal;
