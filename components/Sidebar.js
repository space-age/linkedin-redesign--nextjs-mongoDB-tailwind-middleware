import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="space-y-2 min-w-max max-w-lg">
      {/* Top */}
      <div
        className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden
       relative flex flex-col items-center text-center
        border border-gray-300 dark:border-none"
      >
        {/* background image for the avatar */}
        <div className="relative w-full h-14">
          <Image src="https://rb.gy/i26zak" layout="fill" priority />
        </div>

        {/* Avatar logo */}
        <Avatar
          onClick={signOut}
          src={session?.user?.image}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />

        {/* Container for user name and email */}
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            {session?.user?.name}
            {/* chris casillas */}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {session?.user?.email}
            {/* casillaschristopher@yahoo.com */}
          </p>
        </div>

        {/* Dummy data: Container for extra info */}
        <div className="hidden md:inline text-left dark:text-white/75 text-sm">
          {/* Dummy data: Container for who view profile and amount of views */}
          <div className="font-medium sidebarButton space-y-0.5">
            <div className="flex justify-between space-x-2">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>

          {/* Dummy data: Container for acessing exclusive tools and option to try premium */}
          <div className="sidebarButton">
            <h4 className="leading-4 text-xs">
              Access exclusive tools & insights
            </h4>
            <h4 className="dark:text-white font-medium">
              <span
                className="w-3 h-3 bg-gradient-to-tr from-yellow-700
               to-yellow-200 inline-block rounded-sm mr-1"
              />{" "}
              Try Premium for free
            </h4>
          </div>

          {/* Dummy data: container for icon for my items bookmarked */}
          <div className="sidebarButton flex items-center space-x-1.5">
            <BookmarkOutlinedIcon className="!-ml-1" />
            <h4 className="dark:text-white font-medium">My items</h4>
          </div>
        </div>
      </div>

      {/* Bottom : container for the bottom options. Dummy options that do nothing*/}
      <div
        className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg 
      overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none"
      >
        {/* Dummy Options */}

        {/* Option 1: Groups */}
        <p className="sidebarLink">Groups</p>

        {/* Option 2: Events */}
        <div className="flex items-center justify-between">
          <p className="sidebarLink">Events</p>
          <AddRoundedIcon className="!h-5" />
        </div>

        {/* Option 3: Followed Hashtags */}
        <p className="sidebarLink">Followed Hashtags</p>

        {/* Option 4: Discover More */}
        <div className="sidebarButton text-center">
          <h4 className="dark:text-white font-medium text-sm">Discover More</h4>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
