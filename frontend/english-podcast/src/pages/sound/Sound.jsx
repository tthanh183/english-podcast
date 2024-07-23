import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEpisodeById } from "../../services/episode/EpisodeService";
import Header from "../../components/Layout/Header";
import AudioPlay from "../../components/Audio/AudioPlay";
import { Button } from "@material-tailwind/react";
import { PiPlaylistLight } from "react-icons/pi";
import RatingBar from "../../components/Rating/RatingBar";
import Comment from "../../components/Comment/Comment";
import { useAuth } from "../../contexts/AuthProvider";

const Sound = () => {
  const location = useLocation();
  const { episodeId, podcastId } = useParams();
  const [episode, setEpisode] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (episodeId) {
      const fetchEpisode = async () => {
        const response = await getEpisodeById(episodeId);
        setEpisode(response);
      };
      fetchEpisode();
    }
  }, [episodeId]);

  const handleClick = () => {
    if (!isAuthenticated) {
      localStorage.setItem("previousUrl", location.pathname);
      navigate('/login');
    }
  };

  if (!episode) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div>
      <Header />
      <AudioPlay episode={episode} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <Button className="flex items-center gap-3" onClick={handleClick}>
              <PiPlaylistLight />
              Add to Playlist
            </Button>
          </div>
          <RatingBar episodeId={episodeId} />
        </div>
        <Comment />
      </div>
    </div>
  );
};

export default Sound;
