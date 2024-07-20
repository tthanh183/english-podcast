import React, {useState} from 'react'
import ChannelSideBar from './ChannelSideBar'
import Overview from "./Overview";
import Statistic from "./Statistic";
import PodcastTable from "../podcast/PodcastTable";

const Channel = () => {
  const [activeContent, setActiveContent] = useState("podcast");

  const renderContent = () => {
    switch (activeContent) {
      case "overview":
        return <Overview />;
      case "statistic":
        return <Statistic/>;
      case "podcast":
        return <PodcastTable/>;
      default:
        return <PodcastTable/>;
    }
  };

  return (
    <div className='flex h-screen'>
        <ChannelSideBar setActiveContent={setActiveContent}/>
        <div className="flex-1 p-4">
          {renderContent()}
        </div>
    </div>
  )
}

export default Channel