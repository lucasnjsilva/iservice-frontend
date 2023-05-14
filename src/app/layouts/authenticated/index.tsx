"use client";

import React, { ReactNode } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const useClasses = useStyle(classes);

  return (
    <>
      <Sidebar />
      <main className={useClasses.main}>
        <h1 className={useClasses.title}>{title}</h1>
        <hr className={useClasses.divisor} />

        {children}
      </main>
    </>
  );
}
