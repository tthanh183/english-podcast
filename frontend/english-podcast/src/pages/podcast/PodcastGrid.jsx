import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPodcastsByUser, deletePodcast } from "../../services/user/UserService.js";
import { Button } from "@material-tailwind/react";
import PodcastCreate from "./PodcastCreate.jsx";
import PodcastUpdate from "./PodcastUpdate.jsx";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Filter from "../../components/Filter/Filter.jsx";
import Paginator from "../../components/Paginator/Paginator.jsx";
import ManageCard from "../../components/Podcast/ManageCard.jsx";
import { IoCreateOutline } from "react-icons/io5";

const PodcastGrid = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizes, setPageSizes] = useState(6)
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
    const response = await getPodcastsByUser(page, pageSizes, searchQuery); 
    
    if (response.length === 0) {
      setPodcasts([]);
      setFilteredPodcasts([]);
      toast.info("No podcasts found for this user.");
    } else {
      setPodcasts(response.content);
      setFilteredPodcasts(response.content);
    }
    setTotalPages(response.totalPages);
    setIsLoading(false);
  };

  const handleViewClick = (id) => {
    console.log(id);
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
    <div className="flex flex-col items-center space-y-4 w-full p-4 md:px-8">
      <h2 className="text-center font-bold text-green-900 text-3xl">
        Manage Your Podcast Channel
      </h2>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Filter onSearch={handleSearch} />
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <Button
            className="flex items-center gap-3 bg-green-500"
            size="md"
            onClick={handleOpenCreateForm}
          >
             <IoCreateOutline strokeWidth={2} className="h-4 w-4" /> Create
          </Button>
        </div>
        <PodcastCreate open={openCreateForm} handleOpen={handleOpenCreateForm} />
        <PodcastUpdate open={openUpdateForm} handleOpen={handleOpenUpdateForm} podcast={currentPodcast} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (podcasts.length === 0 ? (
        <p className="text-green-500 text-center">No data</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPodcasts.map((podcast) => (
            <ManageCard
              key={podcast.id}
              podcast={podcast}
              onView={handleViewClick}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ))}
      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default PodcastGrid;
