import {
  ChartBarIcon,
  QueueListIcon,
  PlusIcon,
  ListBulletIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

export const admin = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
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
        href: "/admin/categories",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar nova",
        href: "/admin/categories/new",
        icon: <PlusIcon width={20} height={20} />,
      },
    ],
  },
  {
    label: "Clientes",
    href: "/admin/customers",
    icon: <UsersIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Prestadores",
    href: "/admin/providers",
    icon: <UserGroupIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Atendimentos",
    href: "/admin/attendances",
    icon: <PresentationChartLineIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Minha Conta",
    href: "/admin/my_account",
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
