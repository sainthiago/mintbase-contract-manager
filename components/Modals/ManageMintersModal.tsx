import { debounce } from "lodash";
import { nearWalletExists } from "near-wallet-validator";
import { useEffect, useState } from "react";
import { useMintersController } from "../../controllers/useMintersController.controller";
import { getCurrentRpc } from "../../utils/getCurrentRpc";
import InputSelect from "../InputSelect";

const ManageMintersModal = ({
  storeId,
  accountId,
}: {
  storeId: string;
  accountId: string;
}) => {
  const [isValidWallet, setIsValidWallet] = useState(true);
  const [selectedMinters, setSelectedMinters] = useState<string[]>([]);
  const [minterWallet, setMinterWallet] = useState(null);

  const {
    handleAddMinter,
    handleRevokeMinters,
    isLoadingMinters,
    minterAccounts,
  } = useMintersController(storeId);

  const validateWallet = async (account: string) => {
    if (!account) {
      setIsValidWallet(true);
      return true;
    }
    const valid = await nearWalletExists(account, getCurrentRpc());

    setIsValidWallet(valid);
    return valid;
  };

  const disableRemoveBtn = selectedMinters?.length < 1;
  const disableAddBtn = !minterWallet;

  return (
    <div className="flex flex-col gap-12 w-full">
      <div>
        <p className="mb-4 font-bold text-lg mb-4">Manage Minters</p>
        <div>
          <p className="mb-4 font-bold">Remove minters</p>
          <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-end">
            <div className="w-full">
              <InputSelect
                placeholder="select at least one minter"
                options={minterAccounts
                  .filter((minter) => minter !== accountId)
                  .map((minter) => {
                    return { value: minter, label: minter };
                  })}
                setValue={setSelectedMinters}
                isMultiple
                isMinters
              />
            </div>
            <div>
              <button
                className={`block w-fit py-2 px-4 text-sm rounded-full text-white ${
                  disableRemoveBtn
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-light-green cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
                }`}
                disabled={disableRemoveBtn}
                onClick={() => handleRevokeMinters(selectedMinters)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-4 font-bold">Add minters</p>
        <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-end">
          <div className="w-full">
            <input
              className="rounded relative border-2 border-light-green py-1.5 px-3 bg-transparent focus:outline-none w-full"
              onChange={debounce(async (e) => {
                const value = e.target.value ?? null;
                const valid = await validateWallet(value);

                if (!valid) return;
                setMinterWallet(value);
              }, 500)}
              placeholder="account.near"
            />

            <p
              className={`${
                !isValidWallet ? "block" : "hidden"
              } text-sm text-red-600 mt-2`}
            >
              This wallet doesn&apos;t exist.
            </p>
          </div>
          <div>
            <button
              className={`block w-fit py-2 px-4 text-sm rounded-full text-white ${
                disableAddBtn
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-light-green cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
              }`}
              disabled={disableAddBtn}
              onClick={() => handleAddMinter(minterWallet)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMintersModal;
