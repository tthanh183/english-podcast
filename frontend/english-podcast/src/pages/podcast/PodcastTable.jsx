import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPodcasts, deletePodcast } from "../../services/podcast/PodcastService.js";
import { DocumentMagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, IconButton, Tooltip } from "@material-tailwind/react";
import PodcastCreate from "./PodcastCreate.jsx";
import PodcastUpdate from "./PodcastUpdate.jsx";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Filter from "../../components/Filter/Filter.jsx";
import Paginator from "../../components/Paginator/Paginator.jsx"

const PodcastTable = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [header] = useState([
    "Image",
    "Title",
    "Description",
    "Last update",
    "Star",
    "Genre",
    "",
  ]);
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (!openCreateForm || !openUpdateForm) {
      fetchData(currentPage);
    }
  }, [openCreateForm, openUpdateForm]);

  const fetchData = async (page, searchQuery = "") => {
    setIsLoading(true);
    const response = await getPodcasts(page, searchQuery); 
    if (response.length === 0) {
      setPodcasts([]);
      setFilteredPodcasts([]);
    } else {
      setPodcasts(response.content);
      setFilteredPodcasts(response.content);
    }
    setTotalPages(response.totalPages);
    setIsLoading(false);
  };

  const handleViewClick = (id) => {
    navigate("/channel/podcast", {
      state: {
        id: id,
      },
    });
  };

  const handleOpenCreateForm = () => {
    setOpenCreateForm(!openCreateForm);
  };

  const handleOpenUpdateForm = () => {
    setOpenUpdateForm(!openUpdateForm);
  };

  const handleEditClick = (podcast) => {
    setCurrentPodcast(podcast);
    setOpenUpdateForm(true);
  };

  const handleDeleteClick = (id) => {
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
              fetchData(currentPage);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    fetchData(currentPage, query);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-center font-bold text-green-900 text-3xl">
        Manage Your Podcast Channel
      </h2>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <Filter onSearch={handleSearch} />
            <div className="flex w-full shrink-0 gap-2 md:w-max">
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
          {(podcasts && podcasts.length === 0) || !podcasts ? (
            <p className="text-green-500 text-center">No data</p>
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
                {filteredPodcasts.map((podcast, index) => {
                  const isLast = index === filteredPodcasts.length - 1;
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
                              className="w-max"
                            />
                          ))}
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-2">
                          <Tooltip content="View">
                            <IconButton
                              variant="text"
                              color="green"
                              onClick={() => handleViewClick(podcast.id)}
                            >
                              <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Edit">
                            <IconButton
                              variant="text"
                              color="blue"
                              onClick={() => handleEditClick(podcast)}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() => handleDeleteClick(podcast.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PodcastTable;