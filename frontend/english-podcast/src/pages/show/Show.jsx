import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getEpisodes, getPodcastById } from "../../services/podcast/PodcastService.js";
import EpisodeCard from "../../components/Card/EpisodeCard";
import Header from "../../components/Layout/Header";

const Show = () => {
  const location = useLocation();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const {podcastId} = useParams();

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const podcastResponse = await getPodcastById(podcastId);
        setPodcast(podcastResponse);
        const episodeResponse = await getEpisodes(podcastId, 1, 20, "");
        setEpisodes(episodeResponse.content);
        setLoadingEpisodes(false);
      } catch (error) {
        console.error("Error fetching podcast or episodes:", error);
        setLoadingEpisodes(false);
      }
    };

    fetchPodcast();
  }, [podcastId]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{podcast.title}</h1>
          <p className="text-lg">{podcast.description}</p>
        </div>
        <div className="space-y-4">
          {loadingEpisodes ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
              >
                {/* Your spinner SVG path here */}
              </svg>
              <p className="ml-2 text-center text-gray-500">
                Loading episodes...
              </p>
            </div>
          ) : episodes.length > 0 ? (
            episodes.map((episode, index) => (
              <EpisodeCard
                key={index}
                episodeId={episode.id}
                episode={episode}
                podcastId={podcastId}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No episodes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
