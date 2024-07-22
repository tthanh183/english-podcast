import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpisodes, getPodcastById } from "../../services/podcast/PodcastService.js";
import EpisodeCard from "../../components/Card/EpisodeCard";
import Header from "../../components/Layout/Header";
import Subscribe from "../../components/Subscribe/Subscribe.jsx";
import Star from "../../components/Star/Star.jsx";
import { isSubscribed, toggleSubscription } from "../../services/subscribe/SubscribeService.js";
import { useAuth } from "../../contexts/AuthProvider.jsx";
import { toast } from "react-toastify";

const Show = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [isSub, setIsSub] = useState(false);
  const { isAuthenticated } = useAuth();

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

  useEffect(() => {
    const checkSubscribe = async () => {
      const response = await isSubscribed(podcastId);
      setIsSub(response);
    };
    if (isAuthenticated) {
      checkSubscribe();
    }
  }, [isAuthenticated, podcastId]);

  const handleSubscribe = async () => {
    if (isAuthenticated) {
      try {
        const response = await toggleSubscription(podcastId);
        setIsSub(!isSub);
        toast.success(response);
      } catch (error) {
        toast.error("Error toggling subscription");
      }
    } else {
      toast.info("You must log in to subscribe");
    }
  };

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{podcast.title}</h1>
          <p className="text-lg mb-4">{podcast.description}</p>
          <div className="flex justify-center gap-4">
            <Subscribe isSub={isSub} handleSubscribe={handleSubscribe} />
            <Star />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Episodes</h2>
          {loadingEpisodes ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1-9-9 9.01 9.01 0 0 1-9 9z"
                />
                <path
                  fill="currentColor"
                  d="M12 4a8.968 8.968 0 0 0-6.327 2.705L7.05 7.707A6.976 6.976 0 0 1 12 6a7 7 0 1 1-7 7h-2a9 9 0 1 0 9-9z"
                />
              </svg>
              <p className="ml-2 text-center text-gray-500">Loading episodes...</p>
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
