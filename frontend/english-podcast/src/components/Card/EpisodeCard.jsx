import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const EpisodeCard = ({episodeId, episode, podcastId }) => {
  const navigate = useNavigate();
  const handleListen = () => {
    navigate(`/show/${podcastId}/play/${episodeId}`);
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <img
        src={episode.image}
        alt={episode.title}
        className="w-40 h-32 object-cover rounded-lg mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{episode.title}</h3>
        <p className="text-gray-600">{episode.description}</p>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md" onClick={handleListen}>
        Play
      </button>
    </div>

  )
};

export default EpisodeCard;
