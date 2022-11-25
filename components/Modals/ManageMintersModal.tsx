import { debounce } from "lodash";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useMintersController } from "../../controllers/useMintersController.controller";
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

  const {
    handleAddMinter,
    handleRevokeMinters,
    isLoadingMinters,
    minterAccounts,
  } = useMintersController(storeId);

  const validateWallet = async (account: string) => {
    const valid = await walletExists(account, getCurrentRpc());

    setIsValidWallet(valid);
    return;
  };

  const updateMinters = (event) => {
    setSelectedMinters(event.map((minter) => minter.value));
  };

  const disableRemoveBtn = selectedMinters.length < 1;

  return (
    <div className="flex flex-col justify-between w-full">
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
                placeholder="Select at least one minter"
                onChange={updateMinters}
                options={minterAccounts
                  .filter((minter) => minter !== accountId)
                  .map((minter) => {
                    return { value: minter, label: minter.split(".")[0] };
                  })}
              />
            </div>

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
            {/* {minterAccounts.map((minter, index) => (
            <div className="flex gap-2 items-center" key={`${minter}_${index}`}>
              <p>{minter}</p>
              <p
                className="font-bold text-lg text-red-500 cursor-pointer transform transition duration-200 hover:scale-105 hover:-translate-y-0.5 hover:text-red-600"
                onClick={() => handleRevokeMinter(minter)}
              >
                X
              </p>
            </div>
          ))} */}
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
                await validateWallet(value);
              }, 500)}
            />

            <p
              className={`${
                !isValidWallet ? "block" : "hidden"
              }text-sm text-red-600 mt-2`}
            >
              This wallet doesn&apos;t exist.
            </p>
          </div>
          <div>
            <button className="block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMintersModal;
