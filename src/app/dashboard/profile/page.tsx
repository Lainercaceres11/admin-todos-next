"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data } = useSession();
  return (
    <article className="flex flex-col gap-4">
      <span>{data?.user?.name}</span>
      <span>{data?.user?.image}</span>
      <span>{data?.user?.email}</span>

      {JSON.stringify(data)}
    </article>
  );
}
