import React from "react";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";

import { Avatar } from "@mui/material";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArticleIcon from "@mui/icons-material/Article";

import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";

function Input() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div
      className="bg-white dark:bg-[#1D2226] rounded-lg p-3 
    space-y-3 border border-gray-300 dark:border-none"
    >
      {/* Container for Avatar and Button */}
      <div className="flex items-center space-x-2">
        {/* Avatar with the session user image that is logged in */}
        <Avatar
          src={session?.user?.image}
          className="!h-10 !w-10 cursor-pointer"
        />
        {/* Motion use for the button, modifications for while hover and tap */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 
          opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
        >
          Start a post
        </motion.button>
      </div>

      {/* Dummy data: Container for dummy options */}
      <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-10">
        {/* dummy button 1 */}
        <button className="inputButton group">
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        {/* dummy button 2 */}
        <button className="inputButton group">
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        {/* dummy button 3 */}
        <button className="inputButton group">
          <BusinessCenterIcon className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        {/* dummy button 4 */}
        <button className="inputButton group">
          <ArticleIcon className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
            Write Article
          </h4>
        </button>
      </div>
    </div>
  );
}

export default Input;
