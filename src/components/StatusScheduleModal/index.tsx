import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import dateFormatter from "@/utils/dateFormatter";

type StatusScheduleModalProps = {
  isOpen: boolean;
  onConfirm: any;
  onRefuse: any;
  onClose: () => void;
  id: string;
};

const StatusScheduleModal: React.FC<StatusScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onRefuse,
  id,
}) => {
  const useClasses = useStyle(classes);

  const handleConfirm = (id: string) => {
    onConfirm(id);
    onClose();
  };

  const handleRefuse = (id: string) => {
    onRefuse(id);
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
                Deseja aceitar ou recusar este agendamento?
              </Dialog.Title>
              <hr className="mt-4" />

              <div className="mt-4 mb-8">
                <h4 className={useClasses.h4}>Informações gerais</h4>
                <ul>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Cliente:</p>
                    <p className={useClasses.listItem}>Lucas</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Telefone:</p>
                    <p className={useClasses.listItem}>(87) 99211-0368</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Serviço:</p>
                    <p className={useClasses.listItem}>Eletricista</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Data de Solicitação:</p>
                    <p className={useClasses.listItem}>
                      {dateFormatter("2023-05-23")}
                    </p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Data de Agendamento:</p>
                    <p className={useClasses.listItem}>
                      {dateFormatter("2023-05-23")}
                    </p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Status:</p>
                    <p className={useClasses.listItem}>PENDENTE</p>
                  </li>
                </ul>

                <h4 className={useClasses.h4}>Endereço</h4>
                <ul>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Endereço:</p>
                    <p className={useClasses.listItem}>Rua teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Número:</p>
                    <p className={useClasses.listItem}>102</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Complemento:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Bairro:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Referência:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Cidade:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>Estado:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                  <li className={useClasses.textGroup}>
                    <p className={useClasses.listLabel}>CEP:</p>
                    <p className={useClasses.listItem}>teste</p>
                  </li>
                </ul>
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonConfirm}
                  onClick={() => handleConfirm(id)}
                >
                  Confirmar
                </button>

                <button
                  type="button"
                  className={useClasses.buttonRefuse}
                  onClick={() => handleRefuse(id)}
                >
                  Recusar
                </button>

                <button
                  type="button"
                  className={useClasses.buttonCancel}
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StatusScheduleModal;
