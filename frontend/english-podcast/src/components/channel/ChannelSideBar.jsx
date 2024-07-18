import React from "react";
import { Link } from "react-router-dom";
import { GrChannel } from "react-icons/gr";
import { Avatar } from "@material-tailwind/react";
import { GrOverview } from "react-icons/gr";
import { FcStatistics } from "react-icons/fc";
import { BiPodcast } from "react-icons/bi";
import { IoReturnDownBack } from "react-icons/io5";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

const ChannelSideBar = ({setActiveContent}) => {
  return (
    <div>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="w-40 h-40" />
        </div>
        <List>
          <ListItem onClick={() => setActiveContent('overview')}>
            <ListItemPrefix>
              <GrOverview className="h-5 w-5" />
            </ListItemPrefix>
            Overview
          </ListItem>
          <ListItem onClick={() => setActiveContent('statistic')}>
            <ListItemPrefix>
              <FcStatistics className="h-5 w-5" />
            </ListItemPrefix>
            Statistic
          </ListItem>
          <ListItem onClick={() => setActiveContent('podcast')}>
            <ListItemPrefix>
              <BiPodcast className="h-5 w-5" />
            </ListItemPrefix>
            Podcast Management
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <IoReturnDownBack className="h-5 w-5 cursor-pointer" />
            </ListItemPrefix>
            <Link to={'/home'}>Channel</Link>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default ChannelSideBar;
