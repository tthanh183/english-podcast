import React from "react";
import SideBar from "./SideBar";
import Header from "../../components/Layout/Header"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import PodcastCard from "../../components/Card/PodcastCard";


const HomePage = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="container p-4 flex-col">
        <Header/>
        <div> 
          <PodcastCard/>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
