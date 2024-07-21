import React from "react";
import { Link } from "react-router-dom";
import { GrChannel } from "react-icons/gr";
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

const HeaderBar = () => {
  return (
    <div className="fixed top-16 w-full  shadow-md z-10">
      <Card className="flex flex-row items-center justify-between p-1 shadow-none bg-transparent">
        <List className="flex flex-row space-x-4 p-1">
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/">Home page</Link>
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/search">Search</Link>
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/playlist">Play list</Link>
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <GrChannel className="h-5 w-5 cursor-pointer" />
            </ListItemPrefix>
            <Link to="/channel">Channel</Link>
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/logout">Log Out</Link>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default HeaderBar;
