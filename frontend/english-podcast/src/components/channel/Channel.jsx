import React, {useState} from 'react'
import ChannelSideBar from './ChannelSideBar'
import Overview from "./Overview";
import Statistic from "./Statistic";
import PodcastTable from "./PodcastTable";

const Channel = () => {
  const [activeContent, setActiveContent] = useState("overview");

  const renderContent = () => {
    switch (activeContent) {
      case "overview":
        return <Overview />;
      case "statistic":
        return <Statistic/>;
      case "podcast":
        return <PodcastTable/>;
      default:
        return <Overview />;
    }
  };

  return (
    <div className='flex'>
        <ChannelSideBar setActiveContent={setActiveContent}/>
        <div className="flex-1 p-4">
          {renderContent()}
      </div>
    </div>
  )
}

export default Channel