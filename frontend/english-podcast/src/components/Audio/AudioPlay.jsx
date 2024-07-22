import React from 'react'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioPlay = ({episode}) => {
  return (
    <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/3">
              <img
                src={episode.image}
                alt="episode"
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                {episode.title}
              </h1>
              <p className="text-lg mb-6">{episode.description}</p>
              <AudioPlayer
                autoPlay
                src={episode.url}
                showSkipControls
                showJumpControls={false}
                className="bg-gray-700 rounded-md"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
  )
}

export default AudioPlay