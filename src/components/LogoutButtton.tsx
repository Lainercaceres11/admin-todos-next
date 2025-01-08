"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoEnterSharp } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";

export const LogoutButtton = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <VscLoading />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoEnterSharp />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    );
  }
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};
