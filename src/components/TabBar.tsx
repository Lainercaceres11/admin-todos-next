"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  tabOptions?: number[];
  currentTab?: number;
}
export const TabBar = ({
  tabOptions = [1, 2, 3, 4],
  currentTab = 1,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const router = useRouter();

  const onSelectedTab = (tab: number) => {
    setSelectedTab(tab);
    setCookie("seletedTab", tab.toString());
    router.refresh();
  };

  return (
    <div className="grid w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            onChange={() => setSelectedTab(tab)}
            checked={tab === selectedTab}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onSelectedTab(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
