import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEpisodes, deleteEpisode } from "../../services/episode/EpisodeService.js";
import { DocumentMagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, IconButton, Tooltip } from "@material-tailwind/react";
import EpisodeCreate from "./EpisodeCreate.jsx";
import EpisodeUpdate from "./EpisodeUpdate.jsx";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Filter from "../../components/Filter/Filter.jsx";
import Paginator from "../../components/Paginator/Paginator.jsx"
import { getPodcastById, getPodcasts } from "../../services/podcast/PodcastService.js";
import { formatDuration } from "../../utils/formatDuration.js";

const EpisodeTable = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [header] = useState([
    "Image",
    "Title",
    "Description",
    "Audio",
    "Last update",
    "Duration",
    "",
  ]);
  
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation()
  const podcastId = location.state?.id

  useEffect(() => {
    if(podcastId) {
      fetchPodcast(podcastId)
    }
  },[podcastId])

  const fetchPodcast = async (podcastId) => {
    try {
      const response = await getPodcastById(podcastId);
      if (response) {
        setPodcast(response);
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
    }
  };

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
    const response = await getEpisodes(podcastId,page, searchQuery); 
    if (response.length === 0) {
      setEpisodes([]);
      setFilteredEpisodes([]);
    } else {
      setEpisodes(response.content);
      setFilteredEpisodes(response.content);
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

  const handleEditClick = (episode) => {
    setCurrentEpisode(episode);
    setOpenUpdateForm(true);
  };

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this episode?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const data = await deleteEpisode(podcastId,id);
              toast.success(data.message || "Episode deleted successfully");
              fetchData(currentPage);
            } catch (error) {
              toast.error("An error occurred while deleting the episode");
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
        {podcast ? podcast.title: isLoading}
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
              <EpisodeCreate
                open={openCreateForm}
                handleOpen={handleOpenCreateForm}
                podcastId={podcastId}
              />
              <EpisodeUpdate
                open={openUpdateForm}
                handleOpen={handleOpenUpdateForm}
                episode={currentEpisode}
                podcastId={podcastId}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          {(episodes && episodes.length === 0) || !episodes ? (
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
                {filteredEpisodes.map((episode, index) => {
                  const isLast = index === filteredEpisodes.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={episode.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3 w-60">
                          <img
                            className="h-full w-full object-cover object-center"
                            src={episode.image}
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
                            {episode.title}
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
                            {episode.description}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >    
                        <audio controls className="mt-2">
                    <source src={episode.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>     
                          
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                           {episode.updatedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                           {formatDuration(episode.duration)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-2">
                          <Tooltip content="Edit">
                            <IconButton
                              variant="text"
                              color="blue"
                              onClick={() => handleEditClick(episode)}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() => handleDeleteClick(episode.id)}
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

export default EpisodeTable;