import React from "react";
import { Link } from "react-router-dom";
import { GrChannel } from "react-icons/gr";
import { Avatar } from "@material-tailwind/react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PowerIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";

const Channel = () => {
  return (
    <div>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" className="w-40 h-40" />
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home page
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </ListItemPrefix>
            Search
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5" />
            </ListItemPrefix>
            Play list
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <GrChannel className="h-5 w-5 cursor-pointer" />
            </ListItemPrefix>
            <Link to={'/channel'}>Channel</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Channel;
