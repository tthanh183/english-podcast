import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPodcasts,
  deletePodcast,
} from "../../services/podcast/PodcastService.js";
import {
  DocumentMagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import PodcastCreate from "./PodcastCreate.jsx";
import PodcastUpdate from "./PodcastUpdate.jsx";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const PodcastTable = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const handleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm);
  };

  useEffect(() => {
    if (openCreateForm == false) {
      fetchData();
    }
  }, [openCreateForm]);

  const handleOpenUpdateForm = () => {
    setOpenUpdateForm(!openUpdateForm);
  };

  useEffect(() => {
    if (openUpdateForm == false) {
      fetchData();
    }
  }, [openUpdateForm]);

  const [currentPodcast, setCurrentPodcast] = useState(null);

  const [header] = useState([
    "Image",
    "Description",
    "Title",
    "Last update",
    "Star",
    "Genre",
    "",
  ]);
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getPodcasts();
    if (response.length == 0) setPodcasts(null);
    else setPodcasts(response);
    setIsLoading(false);
  };

  const handleViewClick = (id) => {
    navigate("/channel/podcast", {
      state: {
        id: id,
      },
    });
  };

  const handelEditClick = (podcast) => {
    setCurrentPodcast(podcast);
    setOpenUpdateForm(true);
  };

  const handelDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this podcast?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const data = await deletePodcast(id);
              toast.success(data.message || "Podcast deleted successfully");
              fetchData();
            } catch (error) {
              toast.error("An error occurred while deleting the podcast");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-center font-bold text-green-700 text-3xl">
        Manage Your Podcast Channel
      </h2>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Recent Transactions
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last transactions
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button
                className="flex items-center gap-3 bg-green-500"
                size="sm"
                onClick={handleOpenCreateForm}
              >
                <ArrowUpTrayIcon strokeWidth={2} className="h-4 w-4" /> Create
              </Button>
              <PodcastCreate
                open={openCreateForm}
                handleOpen={handleOpenCreateForm}
              />
              <PodcastUpdate
                open={openUpdateForm}
                handleOpen={handleOpenUpdateForm}
                podcast={currentPodcast}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          {podcasts.length === 0 ? (
            <p className="text-red-500 text-center">No data</p>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {header.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {podcasts.map((podcast, index) => {
                  const isLast = index === podcasts.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={podcast.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3 w-60">
                          <img
                            className="h-full w-full object-cover object-center"
                            src={podcast.image}
                            alt="nature image"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {podcast.title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3 max-w-48">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {podcast.description}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {podcast.updatedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {podcast.star}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col gap-2">
                          {podcast.genres.map((genre, index) => (
                            <Chip
                              key={index}
                              variant="ghost"
                              value={genre.name}
                              className="w-fit"
                            />
                          ))}
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="View Podcast">
                          <IconButton
                            variant="text"
                            onClick={() => handleViewClick(podcast.id)}
                          >
                            <DocumentMagnifyingGlassIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Podcast">
                          <IconButton
                            variant="text"
                            onClick={() => handelEditClick(podcast)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Delete Podcast">
                          <IconButton
                            variant="text"
                            onClick={() => handelDeleteClick(podcast.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PodcastTable;
