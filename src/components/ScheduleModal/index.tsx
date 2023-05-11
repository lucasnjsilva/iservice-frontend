import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const useClasses = useStyle(classes);

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
                Para qual dia deseja agendar o serviço?
              </Dialog.Title>

              <div className="my-12">
                <label htmlFor="name" className={useClasses.label}>
                  Selecione a melhor data para você
                </label>
                <input name="name" type="date" className={useClasses.input} />
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonSchedule}
                  onClick={onClose}
                >
                  Agendar
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

export default ScheduleModal;
