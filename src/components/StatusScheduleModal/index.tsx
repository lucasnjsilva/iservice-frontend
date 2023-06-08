"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import dateFormatter from "@/utils/dateFormatter";
import useSWR from "swr";
import { getToken } from "@/services/isAuthenticated";
import phoneFormatter from "@/utils/phoneFormatter";
import { AttendanceStatus } from "@/utils/dictionaries";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

type StatusScheduleModalProps = {
  isOpen: boolean;
  onConfirm: any;
  onRefuse: any;
  onClose: () => void;
  id: string;
};

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

const StatusScheduleModal: React.FC<StatusScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onRefuse,
  id,
}) => {
  const useClasses = useStyle(classes);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<{
    customer: string;
    phone: string;
    service: string;
    solicitationDate: string;
    scheduleDate: string;
    status: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    reference: string;
    city: string;
    uf: string;
    cep: string;
  }>();

  const url = `${API_HOST}/attendances/${id}`;
  const useFetcher = useSWR(url, id ? fetcher : null);

  useEffect(() => {
    if (
      useFetcher.error ||
      useFetcher.isLoading ||
      !useFetcher.data ||
      !useFetcher.data.result
    ) {
      return;
    }

    const result = useFetcher.data.result;

    setData({
      customer: result.customer.name,
      phone: result.customer.phone,
      service: result.service.name,
      solicitationDate: result.solicitation_date,
      scheduleDate: result.attendance_date,
      status: result.status,
      address: result.customer.address.address,
      number: result.customer.address.number,
      complement: result.customer.address.complement,
      neighborhood: result.customer.address.neighborhood,
      reference: result.customer.address.reference,
      city: result.customer.address.city,
      uf: result.customer.address.uf,
      cep: result.customer.address.cep,
    });
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  const renderInfo = () => {
    if (data) {
      return (
        <>
          <h4 className={useClasses.h4}>Informações gerais</h4>
          <ul>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Cliente:</p>
              <p className={useClasses.listItem}>{data.customer}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Telefone:</p>
              <p className={useClasses.listItem}>
                {phoneFormatter(data!.phone)}
              </p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Serviço:</p>
              <p className={useClasses.listItem}>{data.service}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Data de Solicitação:</p>
              <p className={useClasses.listItem}>
                {dateFormatter(data.solicitationDate)}
              </p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Data de Agendamento:</p>
              <p className={useClasses.listItem}>
                {dateFormatter(data.scheduleDate)}
              </p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Status:</p>
              <p className={useClasses.listItem}>
                {AttendanceStatus(data.status)}
              </p>
            </li>
          </ul>

          <h4 className={useClasses.h4}>Endereço</h4>
          <ul>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Endereço:</p>
              <p className={useClasses.listItem}>{data.address}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Número:</p>
              <p className={useClasses.listItem}>{data.number}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Complemento:</p>
              <p className={useClasses.listItem}>{data.complement}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Bairro:</p>
              <p className={useClasses.listItem}>{data.neighborhood}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Referência:</p>
              <p className={useClasses.listItem}>{data.reference}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Cidade:</p>
              <p className={useClasses.listItem}>{data.city}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>Estado:</p>
              <p className={useClasses.listItem}>{data.uf}</p>
            </li>
            <li className={useClasses.textGroup}>
              <p className={useClasses.listLabel}>CEP:</p>
              <p className={useClasses.listItem}>{data.cep}</p>
            </li>
          </ul>
        </>
      );
    } else {
      return <p>Carregando informações...</p>;
    }
  };

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

              <div className="mt-4 mb-8">{renderInfo()}</div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonConfirm}
                  onClick={() => handleConfirm(id)}
                  disabled={data && data.status !== "PENDING"}
                >
                  Confirmar
                </button>

                <button
                  type="button"
                  className={useClasses.buttonRefuse}
                  onClick={() => handleRefuse(id)}
                  disabled={data && data.status !== "PENDING"}
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
