import React, { useState, createContext, ReactNode } from "react";

type SidebarContextType = [boolean, (value: boolean) => void];

export const SidebarContext = createContext<SidebarContextType>([
  false,
  () => {},
]);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false);

  return (
    <SidebarContext.Provider value={[state, setState]}>
      {children}
    </SidebarContext.Provider>
  );
};
