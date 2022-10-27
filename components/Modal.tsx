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
      <div className="flex justify-center items-center">{children}</div>
    </ReactSimpleModal>
  );
};

export default Modal;
