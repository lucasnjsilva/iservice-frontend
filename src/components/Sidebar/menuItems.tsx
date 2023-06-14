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
  HomeIcon,
  BookOpenIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { getUserId } from "@/services/isAuthenticated";

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
    label: "Administradores",
    href: null,
    icon: <UsersIcon width={20} height={20} />,
    items: [
      {
        label: "Listar",
        href: "/admin/admins",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar nova",
        href: "/admin/admins/new",
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
    label: "Voltar ao site",
    href: "/",
    icon: <ArrowUturnLeftIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/signout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];

export const provider = [
  {
    label: "Dashboard",
    href: "/panel/dashboard",
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
        href: "/panel/services",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar novo",
        href: "/panel/services/new",
        icon: <PlusIcon width={20} height={20} />,
      },
    ],
  },
  {
    label: "Histórico de Agendamentos",
    href: "/panel/scheduling_history",
    icon: <BookOpenIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Minha Conta",
    href: "/panel/my_account",
    icon: <UserIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Meu Perfil",
    href: `/provider/${getUserId()}`,
    icon: <ArrowUturnLeftIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Voltar ao site",
    href: "/",
    icon: <ArrowUturnLeftIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/signout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];

export const customer = [
  {
    label: "Dashboard",
    href: "/panel/dashboard",
    icon: <ChartBarIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Endereços",
    href: null,
    icon: <HomeIcon width={20} height={20} />,
    items: [
      {
        label: "Listar",
        href: "/panel/addresses",
        icon: <ListBulletIcon width={20} height={20} />,
      },
      {
        label: "Criar novo",
        href: "/panel/addresses/new",
        icon: <PlusIcon width={20} height={20} />,
      },
    ],
  },
  {
    label: "Minha Conta",
    href: "/panel/my_account",
    icon: <UserIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Voltar ao site",
    href: "/",
    icon: <ArrowUturnLeftIcon width={20} height={20} />,
    items: null,
  },
  {
    label: "Sair",
    href: "/signout",
    icon: <ArrowLeftOnRectangleIcon width={20} height={20} />,
    items: null,
  },
];
