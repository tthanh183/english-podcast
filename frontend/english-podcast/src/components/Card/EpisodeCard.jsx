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
    <section className="flex flex-col md:flex-row w-full max-w-[48rem] bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="w-full md:w-2/5">
        <img
          src={episode.image}
          alt="episode-image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-full md:w-3/5 p-4 flex flex-col justify-between">
        <CardBody className="p-0">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {episode.title}
          </Typography>
          <Typography color="gray" className="mb-4 font-normal">
            {episode.description}
          </Typography>
        </CardBody>
        <div className="flex justify-end">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={() => handleListen(episode)}
            >
              Listen now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default EpisodeCard;
