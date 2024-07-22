import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getEpisodeById } from "../../services/episode/EpisodeService";
import Header from "../../components/Layout/Header";
import AudioPlay from "../../components/Audio/AudioPlay";
import { Button } from "@material-tailwind/react";
import { PiPlaylistLight } from "react-icons/pi";
import RatingBar from "../../components/Rating/RatingBar";
import Comment from "../../components/Comment/Comment";

const Sound = () => {
  const location = useLocation();
  const episodeId = location.state?.episodeId;
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    if (episodeId) {
      const fetchEpisode = async () => {
        const response = await getEpisodeById(episodeId);
        setEpisode(response);
      };
      fetchEpisode();
    }
  }, [episodeId]);

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
            <Button variant="outlined">Subscribe</Button>
            <Button className="flex items-center gap-3">
              <PiPlaylistLight />
              Add to Playlist
            </Button>
          </div>
          <RatingBar />
        </div>
        <Comment />
      </div>
    </div>
  );
};

export default Sound;
