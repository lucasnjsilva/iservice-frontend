import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { useRouter } from "next/navigation";

type UnauthenticatedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UnauthenticatedModal: React.FC<UnauthenticatedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const useClasses = useStyle(classes);
  const navigation = useRouter();

  const onSignin = () => navigation.push("/signin");
  const onSignup = () => navigation.push("/signup");

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
              <div className="flex ml-auto">
                <Dialog.Title as="h3" className={useClasses.dialogTitle}>
                  Oops...
                </Dialog.Title>

                <p className="text-sm cursor-pointer ml-auto" onClick={onClose}>
                  Fechar
                </p>
              </div>

              <div className="my-12">
                <p>Você precisa estar logado para executar esta ação.</p>
              </div>

              <div className={useClasses.buttonGroup}>
                <button
                  type="button"
                  className={useClasses.buttonSignIn}
                  onClick={onSignin}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  className={useClasses.buttonSignUp}
                  onClick={onSignup}
                >
                  Criar conta
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UnauthenticatedModal;
