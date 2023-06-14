"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { requestHeader } from "@/services/api";

type EvaluationModalProps = {
  isOpen: boolean;
  id: string;
  onClose: () => void;
  onConfirm: any;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  try {
    const res = await fetch(`${API_HOST}/evaluations/search/${id}`, {
      headers: requestHeader,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    return;
  }
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  id,
  onClose,
  onConfirm,
}) => {
  const useClasses = useStyle(classes);
  const [vote, setVote] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean | string>();

  useEffect(() => {
    if (id) {
      getData(id).then((data) => (data ? setError(true) : setError(false)));
    }
  }, [id]);

  const handleConfirm = () => {
    if (vote && comment) {
      onConfirm({ vote, comment, attendanceId: id });
      onClose();
    } else {
      setError(
        "Para fazer uma avaliação, escolha quantas estrelas o atendimento merece e faça um comentário sobre o atendimento."
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
                Avaliar atendimento
              </Dialog.Title>
              {error ? (
                <p className="text-sm text-red-500 mt-2">
                  {typeof error === "boolean"
                    ? "Você já fez uma avaliação deste atendimento."
                    : error}
                </p>
              ) : null}

              <div className="mt-12">
                <label htmlFor="vote" className={useClasses.label}>
                  Quantas estrelas o atendimento merece?
                </label>

                <select
                  id="vote"
                  className={useClasses.input}
                  value={vote}
                  onChange={(e) => setVote(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="my-8">
                <label htmlFor="comment" className={useClasses.label}>
                  Seu comentário sobre o atendimento
                </label>
                <textarea
                  id="comment"
                  className={useClasses.input}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonEvaluate}
                  onClick={handleConfirm}
                  disabled={typeof error === "boolean" && error}
                >
                  Avaliar
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

export default EvaluationModal;
