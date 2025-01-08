import Image from "next/image";
import Link from "next/link";

import { SidebarItems } from "./SidebarItems";

import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorking,
  IoListCircleOutline,
  IoPerson,
  IoSettings,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButtton } from "./LogoutButtton";

const menuItems = [
  {
    icon: <IoCalendarOutline size={40} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline size={40} />,
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListCircleOutline size={40} />,
    title: "Server actions",
    path: "/dashboard/server-actions",
  },
  {
    icon: <IoCodeWorking size={40} />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoSettings size={40} />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPerson size={40} />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-scroll">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image
              height={100}
              width={100}
              src="/assets/images/logo.webp"
              className="w-32"
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            width={150}
            height={150}
            src={
              session?.user?.image
                ? session.user.image
                : "/assets/images/logo.webp"
            }
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        {menuItems.map((item) => (
          <SidebarItems key={item.path} {...item} />
        ))}
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButtton />
      </div>
    </aside>
  );
};
