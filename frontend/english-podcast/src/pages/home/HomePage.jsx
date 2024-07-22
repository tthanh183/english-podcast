import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import HeaderBar from "./HeaderBar"; // Import the new HeaderBar component
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import PodcastCard from "../../components/Card/PodcastCard";
import { getNewReleasedPodcast } from "../../services/podcast/PodcastService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [newPodcasts, setNewPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const releasedList = await getNewReleasedPodcast();
    setNewPodcasts(releasedList);
    setIsLoading(false);
  };

  const handleClickCard = (id) => {
    navigate(`/show/${id}`)
  }



  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex-1 overflow-y-auto px-4">
        <Typography variant="h4" className="text-green-700">New Released</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-4"
        >
          {isLoading ? (
            <p className="text-green-500 text-center">Loading...</p>
          ) : (
            newPodcasts.map((podcast, index) => (
              <div onClick={() => handleClickCard(podcast.id)}>
                 <PodcastCard key={index} podcast={podcast} />
              </div>    
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
