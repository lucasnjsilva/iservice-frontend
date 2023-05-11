"use client";

import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import classes from "./style";
import useStyle from "@/utils/cssHandler";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const useClasses = useStyle(classes);

  return (
    <main className={useClasses.main}>
      <Navbar />

      {children}

      <Footer />
    </main>
  );
}
