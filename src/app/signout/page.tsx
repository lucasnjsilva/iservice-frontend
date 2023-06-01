"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "@/interfaces/IUser";
import useLocalStorage from "@/utils/useLocalStorage";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function Signout() {
  const navigate = useRouter();

  useEffect(() => {
    const handleSignout = async () => {
      const UserData: UserType | null = useLocalStorage.get("user");

      if (UserData && UserData.token) {
        const fetcher = await fetch(`${API_HOST}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${UserData.token}`,
          },
        });

        const response = await fetcher.json();

        if (response && response.status === "OK") {
          useLocalStorage.remove("user");
          navigate.push("/");
        }
      }
    };

    handleSignout().catch(() => console.log("error"));
  });

  return;
}

export default Signout;
