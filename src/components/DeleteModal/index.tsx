import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";

type DeleteModalProps = {
  isOpen: boolean;
  onDelete: any;
  onClose: () => void;
  id: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  id,
}) => {
  const useClasses = useStyle(classes);

  const handleDelete = () => {
    onDelete(id);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className={useClasses.dialog} onClose={onClose}>
        <div className={useClasses.container}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={useClasses.dialogOverlay} />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={useClasses.dialogBody}>
              <Dialog.Title as="h3" className={useClasses.dialogTitle}>
                Deletar
              </Dialog.Title>

              <div className="mt-4 mb-8">
                <p>Tem certeza que deseja deletar este item?</p>
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonConfirm}
                  onClick={handleDelete}
                >
                  Deletar
                </button>
                <button
                  type="button"
                  className={useClasses.buttonCancel}
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteModal;
