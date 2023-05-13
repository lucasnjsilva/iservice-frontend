"use client";

import React, { ReactNode, useContext, useEffect } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Sidebar from "@/components/Sidebar";
import { SidebarContext, SidebarProvider } from "@/contexts/SidebarContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const useClasses = useStyle(classes);

  return (
    <SidebarProvider>
      <Sidebar />
      <main className={useClasses.main}>{children}</main>
    </SidebarProvider>
  );
}
