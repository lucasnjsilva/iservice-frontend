"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { requestHeader } from "@/services/api";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
  serviceId?: string;
  providerId?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/services?user=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAddresses() {
  const res = await fetch(`${API_HOST}/customer_addresses`, {
    headers: requestHeader,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceId,
  providerId,
}) => {
  const useClasses = useStyle(classes);
  const [services, setServices] = useState<any>();
  const [selectedService, setSelectedService] = useState<string>();
  const [addresses, setAddresses] = useState<any>();
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (providerId) {
      getData(providerId).then(({ result }) => setServices(result));
    }

    if (serviceId) {
      setSelectedService(serviceId);
    }

    if (isOpen) {
      getAddresses().then(({ result }) => setAddresses(result));
    }
  }, [isOpen, providerId, serviceId]);

  const renderOptions = () => {
    if (services) {
      return services.map((item: any) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
    }
  };

  const renderAddressOptions = () => {
    if (addresses) {
      return addresses.map((address: any) => (
        <div key={address.id}>
          <input
            type="radio"
            id={`address-${address.id}`}
            className={useClasses.radioInput}
            value={address.id}
            onChange={(e) => setSelectedAddress(e.target.value)}
            checked={selectedAddress === address.id}
          />

          <label
            htmlFor={`address-${address.id}`}
            className={useClasses.radioLabel}
          >
            <div className="flex items-center gap-2">
              <svg
                className="hidden h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-gray-700">
                {address.address}, {address.number}. {address.complement} -
                Bairro {address.neighborhood}. (Referência: {address.reference})
              </p>
            </div>
          </label>
        </div>
      ));
    }
  };

  const handleConfirm = () => {
    if (selectedService && selectedAddress && date) {
      onConfirm(selectedService, selectedAddress, date);
      onClose();
    } else {
      setError(
        "Selecione um serviço, um endereço e uma data para fazer um agendamento."
      );
    }
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
                Para qual dia deseja agendar o serviço?
              </Dialog.Title>
              {error ? (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              ) : null}

              <div className="mt-12">
                <label htmlFor="service" className={useClasses.label}>
                  Selecione o serviço
                </label>

                <select
                  id="service"
                  className={useClasses.input}
                  value={serviceId ? selectedService : ""}
                  disabled={serviceId ? true : false}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="blank">Selecione o serviço</option>
                  {renderOptions()}
                </select>
              </div>

              <div className="mt-8">
                <label htmlFor="service" className={useClasses.label}>
                  Selecione o endereço
                </label>

                <fieldset className="space-y-4 -mt-4">
                  <legend className="sr-only">Endereços</legend>

                  {renderAddressOptions()}
                </fieldset>
              </div>

              <div className="my-8">
                <label htmlFor="date" className={useClasses.label}>
                  Selecione a melhor data para você
                </label>
                <input
                  name="date"
                  type="date"
                  className={useClasses.input}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonSchedule}
                  onClick={handleConfirm}
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
