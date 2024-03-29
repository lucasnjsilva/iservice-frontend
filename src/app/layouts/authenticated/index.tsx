"use client";

import React, { ReactNode } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Sidebar from "@/components/Sidebar";
import AdminSidebar from "@/components/Sidebar/admin";

interface LayoutProps {
  children: ReactNode;
  title: string;
  admin?: boolean;
}

export default function Layout(props: LayoutProps) {
  const { children, title, admin = false } = props;
  const useClasses = useStyle(classes);

  const renderItems = () => {
    return (
      <>
        {admin ? <AdminSidebar /> : <Sidebar />}
        <main className={useClasses.main}>
          <h1 className={useClasses.title}>{title}</h1>
          <hr className={useClasses.divisor} />

          {children}
        </main>
      </>
    );
  };

  return children ? renderItems() : null;
}
