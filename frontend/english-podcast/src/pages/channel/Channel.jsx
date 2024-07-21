import React, { useState } from 'react';
import ChannelSideBar from './ChannelSideBar';
import Overview from "./Overview";
import Statistic from "./Statistic";
import PodcastGrid from '../podcast/PodcastGrid';

const Channel = () => {
  const [activeContent, setActiveContent] = useState("podcast");

  const renderContent = () => {
    switch (activeContent) {
      case "overview":
        return <Overview />;
      case "statistic":
        return <Statistic />;
      case "podcast":
        return <PodcastGrid />;
      default:
        return <PodcastGrid />;
    }
  };

  return (
    <div className='flex flex-col md:flex-row md:h-screen'>
      <div className="md:w-2/12">
        <ChannelSideBar setActiveContent={setActiveContent} />
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Channel;
