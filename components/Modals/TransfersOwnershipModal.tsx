import { debounce } from "lodash";
import { useState } from "react";
import { useStoreController } from "../../controllers/useStoreController.controller";
import { BUTTON_CLASS } from "../../utils/classes";
import { getCurrentRpc } from "../../utils/getCurrentRpc";
import { walletExists } from "../../utils/walletExists";

const TransferOwnershipModal = ({ storeId }: { storeId: string }) => {
  const [isValidWallet, setIsValidWallet] = useState(true);
  const [newOwner, setNewOwner] = useState(null);

  const { transferOwnership } = useStoreController();

  const validateWallet = async (account: string) => {
    if (!account) {
      setIsValidWallet(true);
      return true;
    }
    const valid = await walletExists(account, getCurrentRpc());

    setIsValidWallet(valid);
    return valid;
  };

  const disableTransferBtn = !newOwner;

  return (
    <div className="flex flex-col gap-12 w-full">
      <div>
        <p className="mb-4 font-bold text-lg mb-4">Transfer Ownership</p>
        <div>
          <p className="mb-4 font-bold">
            Transfer your store ownership to another account.
          </p>
          <div className="flex gap-4 w-full">
            <div className="w-full">
              <input
                className="rounded relative border-2 border-light-green py-1.5 px-3 bg-transparent focus:outline-none w-full"
                onChange={debounce(async (e) => {
                  const value = e.target.value ?? null;
                  const valid = await validateWallet(value);

                  if (!valid) return;
                  setNewOwner(value);
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
                className={BUTTON_CLASS(disableTransferBtn)}
                disabled={disableTransferBtn}
                onClick={() => transferOwnership(newOwner, storeId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferOwnershipModal;
