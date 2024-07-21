import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { getEpisodeById } from '../../services/episode/EpisodeService';
const AudioPlay = () => {
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
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-4">{episode.title}</h1>
            <p className="text-lg mb-4">{episode.description}</p>
            <ReactAudioPlayer
                src={episode.url}
                controls
                className="w-full"
            />
        </div>
    );
};

export default AudioPlay;