import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Cookies",
};

export default async function TabPage() {
  const cookieStore = await cookies();
  const cookieTab = cookieStore.get("seletedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-col-2 gap-4">
      <div className="flex flex-col">
        <span className="text-5xl">Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
