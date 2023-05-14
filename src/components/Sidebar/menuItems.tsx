import {
  ChartBarIcon,
  QueueListIcon,
  PlusIcon,
  ListBulletIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const admin = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <ChartBarIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Categorias",
    href: null,
    icon: <QueueListIcon width={20} height={20} />,
    items: [
      {
        label: "Listar",
        href: "/categories",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar nova",
        href: "/categories/new",
        icon: <PlusIcon width={20} height={20} />,
      },
    ],
  },
  {
    label: "Minha Conta",
    href: "/my_account",
    icon: <UserIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/logout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];

export const provider = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <ChartBarIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Serviços",
    href: null,
    icon: <QueueListIcon width={20} height={20} />,
    items: [
      {
        label: "Listar",
        href: "/services",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar novo",
        href: "/services/new",
        icon: <PlusIcon width={20} height={20} />,
      },
    ],
  },
  {
    label: "Minha Conta",
    href: "/my_account",
    icon: <UserIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/logout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];

export const customer = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <ChartBarIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Minha Conta",
    href: "/my_account",
    icon: <UserIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/logout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];
