import { debounce } from "lodash";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useMintersController } from "../../controllers/useMintersController.controller";
import { BUTTON_CLASS } from "../../utils/classes";
import { getCurrentRpc } from "../../utils/getCurrentRpc";
import { walletExists } from "../../utils/walletExists";

const animatedComponents = makeAnimated();

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
    const valid = await walletExists(account, getCurrentRpc());

    setIsValidWallet(valid);
    return valid;
  };

  const updateMinters = (event) => {
    setSelectedMinters(event.map((minter) => minter.value));
  };

  const disableRemoveBtn = selectedMinters.length < 1;
  const disableAddBtn = !minterWallet;

  return (
    <div className="flex flex-col gap-12 w-full">
      <div>
        <p className="mb-4 font-bold text-lg mb-4">Manage Minters</p>
        <div>
          <p className="mb-4 font-bold">Remove minters</p>
          <div className="flex gap-4">
            <div className="w-full">
              <Select
                closeMenuOnSelect
                components={animatedComponents}
                isMulti
                placeholder="select at least one minter"
                onChange={updateMinters}
                options={minterAccounts
                  .filter((minter) => minter !== accountId)
                  .map((minter) => {
                    return { value: minter, label: minter };
                  })}
              />
            </div>
            <div>
              <button
                className={BUTTON_CLASS(disableRemoveBtn)}
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
        <div className="flex gap-4">
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
              className={BUTTON_CLASS(disableAddBtn)}
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
