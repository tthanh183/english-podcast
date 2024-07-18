import React, { useState } from "react";
import PodcastList from "../podcast/PodcastList";
import { IoMdCreate } from "react-icons/io";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

const PodcastManager = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPodcast = () => {
    // Xử lý khi click vào nút tạo podcast
    console.log("Create new podcast");
    // Điều hướng đến trang tạo podcast
  };

  const handleRemovePodcast = () => {
    // Xử lý khi click vào nút xóa podcast
    console.log("Remove podcast");
  };

  const handleEditPodcast = () => {
    // Xử lý khi click vào nút sửa podcast
    console.log("Edit podcast");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-center font-bold text-green-700 text-3xl">
        Your Podcast Channel
      </h2>
      <PodcastList />
      <div className="absolute bottom-4 right-4">
        <div className="relative h-80 w-full">
          <div className="absolute bottom-0 right-0">
            <SpeedDial>
              <SpeedDialHandler>
                <IconButton
                  size="lg"
                  className="rounded-full"
                  onClick={handleOpen}
                >
                  <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </IconButton>
              </SpeedDialHandler>
              <SpeedDialContent open={open} onBlur={handleClose}>
                <SpeedDialAction onClick={handleAddPodcast}>
                  <IoMdCreate className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Create
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction onClick={handleRemovePodcast}>
                  <CiCircleRemove className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Remove
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction onClick={handleEditPodcast}>
                  <CiEdit className="h-5 w-5" />
                  <Typography color="blue-gray" className="text-xs font-normal">
                    Edit
                  </Typography>
                </SpeedDialAction>
              </SpeedDialContent>
            </SpeedDial>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastManager;
