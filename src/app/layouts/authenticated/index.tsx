"use client";

import React, { ReactNode } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const useClasses = useStyle(classes);

  return (
    <>
      <Sidebar />
      <main className={useClasses.main}>{children}</main>
    </>
  );
}
