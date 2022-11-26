import { debounce } from "lodash";
import { useState } from "react";
import { useStoreController } from "../../controllers/useStoreController.controller";
import { BUTTON_CLASS } from "../../utils/classes";

const CreateStoreModal = () => {
  const [isValidStoreName, setIsValidStoreName] = useState(true);
  const [isValidStoreSymbol, setIsValidStoreSymbol] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const [storeName, setStoreName] = useState(null);
  const [storeSymbol, setStoreSymbol] = useState(null);

  const { deployStore, checkStoreName } = useStoreController();

  const disableCreateStoreBtn = !storeName || !storeSymbol;

  return (
    <div className="flex flex-col gap-12 w-full">
      <div>
        <p className="mb-4 font-bold text-lg mb-4">Create Store</p>
        <div>
          <p className="mb-4 font-bold">Name</p>
          <div className="flex gap-4 w-full">
            <div className="w-full">
              <input
                className="rounded relative border-2 border-light-green py-1.5 px-3 bg-transparent focus:outline-none w-full"
                onChange={debounce(async (e) => {
                  const value = e.target.value ?? null;
                  if (!value) {
                    setIsValidStoreName(true);
                    setAlreadyExists(false);
                    return;
                  }

                  if (!/^[a-z0-9]{1,20}$/.test(value)) {
                    setIsValidStoreName(false);
                    return;
                  }

                  if (checkStoreName(value)) {
                    setIsValidStoreName(true);
                    setAlreadyExists(true);
                    return;
                  }
                  setAlreadyExists(false);
                  setIsValidStoreName(true);
                  setStoreName(value);
                }, 500)}
                placeholder="mynewstore"
              />

              <p
                className={`${
                  alreadyExists ? "block" : "hidden"
                } text-sm text-red-600 mt-2`}
              >
                Name already exists.
              </p>

              <p
                className={`${
                  !isValidStoreName ? "block" : "hidden"
                } text-sm text-red-600 mt-2`}
              >
                Name can only contain lowercase letters and numbers and
                can&apos;t be longer than 20 characters.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <p className="mb-4 font-bold">Symbol</p>
          <div className="flex gap-4 w-full">
            <div className="w-full">
              <input
                className="rounded relative border-2 border-light-green py-1.5 px-3 bg-transparent focus:outline-none w-full"
                onChange={debounce(async (e) => {
                  const value = e.target.value ?? null;

                  if (value.length > 5) {
                    setIsValidStoreSymbol(false);
                    return;
                  }
                  setIsValidStoreSymbol(true);
                  setStoreSymbol(value);
                }, 500)}
                placeholder="MFS"
              />

              <p
                className={`${
                  !isValidStoreSymbol ? "block" : "hidden"
                } text-sm text-red-600 mt-2`}
              >
                Symbol can&apos;t be longer than 5 characters.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className={BUTTON_CLASS(disableCreateStoreBtn)}
            disabled={disableCreateStoreBtn}
            onClick={() => deployStore(storeName, storeSymbol)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoreModal;
