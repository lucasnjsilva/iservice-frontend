"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: HomeLayoutProps) {
  const useClasses = useStyle(classes);

  return (
    <main className={useClasses.main}>
      <Navbar />

      {children}

      <Footer />
    </main>
  );
}
