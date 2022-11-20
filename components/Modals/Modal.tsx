import { SetStateAction } from "react";
import { ReactSimpleModal } from "react-awesome-simple-modal";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  children: JSX.Element;
}) => {
  return (
    <ReactSimpleModal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex bg-white w-1/2 h-96 rounded m-auto p-8">
        {children}
      </div>
    </ReactSimpleModal>
  );
};

export default Modal;
