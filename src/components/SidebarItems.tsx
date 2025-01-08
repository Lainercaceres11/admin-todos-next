"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}

export const SidebarItems = ({ icon, path, title }: Props) => {
  const pathName = usePathname();
  return (
    <ul>
      <li>
        <Link
          href={path}
          className={` ${
            path === pathName
              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              : ""
          } px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group`}
        >
          {icon}
          <span className="group-hover:text-white-700">{title}</span>
        </Link>
      </li>
    </ul>
  );
};
