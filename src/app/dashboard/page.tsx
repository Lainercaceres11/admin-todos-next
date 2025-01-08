import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario desde S-SIde">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
      </WidgetItem>
    </div>
  );
}
