import { Avatar, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { handlePostState, getPostState } from "../atoms/postAtom";
import { useSession } from "next-auth/react";

import TimeAgo from "timeago-react";

function Post({ post, modalPost }) {
  const { data: session } = useSession();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);

  // will truncate the string if string length grater than n
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;

  // handler for delete button, sends method delete with the post id to be deleted
  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setHandlePost(true); //sets handle post to true, so it will fetch all the posts in real time
    setModalOpen(false); //will set the modal to false, so closes the modal
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      {/* container */}
      <div className="flex items-center px-2.5 cursor-pointer">
        {/* Avatar for user logged in image */}
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        {/* container for user name, email, and time when post was created*/}
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {/* different icons depending if modal Post is true/false */}
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {/* If post input is true then show the container with the input of the post*/}
      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {/* if in modal post true, then show the post input as full text, or else show with max of 150 char */}
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {/* if there is post image and not in the modal post then display the image */}
      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true); //when image is click, it will set modal to true to display the modal
            setModalType("gifYouUp"); //will set the modal type it is
            setPostState(post); // will set the post so no need to reach to db, insead we cache in the state
          }}
        />
      )}

      {/* Container for extra icons */}
      <div
        className="flex justify-evenly items-center dark:border-t 
      border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75"
      >
        {/* If modal post is true then display a button for comments or else a button for likes */}
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {/* if the session user email is the same as the post email, */}
        {/* then display the delete button or else */}
        {/* display the share button */}
        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}
          >
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
