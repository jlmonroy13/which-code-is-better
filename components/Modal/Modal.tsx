import { IoMdClose } from "react-icons/io";

const Modal = ({
  children,
  close,
  isOpen,
}: {
  children: React.ReactNode;
  close(): void;
  isOpen: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          className="absolute right-4 top-4 hover:text-primary transition-colors duration-300"
          onClick={close}
        >
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
