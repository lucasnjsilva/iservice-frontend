"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { requestHeader } from "@/services/api";

type CancelScheduleModalProps = {
  isOpen: boolean;
  id: string;
  onCancel: any;
  onClose: () => void;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const CancelScheduleModal: React.FC<CancelScheduleModalProps> = ({
  isOpen,
  id,
  onClose,
  onCancel,
}) => {
  const useClasses = useStyle(classes);
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getData() {
      const request = await fetch(`${API_HOST}/attendances/${id}`, {
        headers: requestHeader,
      });

      if (!request.ok) {
        throw new Error("Failed to fetch data");
      }

      return request.json();
    }

    getData().then(({ result }) => setData(result));
  }, [id]);

  const handleCancel = (id: string) => {
    onCancel(id);
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
                Cancelar agendamento
              </Dialog.Title>
              <hr className="mt-4" />

              <div className="mt-4 mb-8">
                Tem certeza que deseja cancelar este agendamento?
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  className={useClasses.buttonRefuse}
                  onClick={() => handleCancel(id)}
                  disabled={data && data.status !== "PENDING"}
                >
                  Cancelar
                </button>

                <button
                  className={useClasses.buttonCancel}
                  onClick={() => onClose()}
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

export default CancelScheduleModal;
