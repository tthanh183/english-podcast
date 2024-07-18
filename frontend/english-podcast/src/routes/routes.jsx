import React from 'react';
import LandingPage from '../components/home/LandingPage';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout'
import HomePage from '../components/home/HomePage';
import Channel from '../components/channel/Channel';
import EpisodeTable from '../components/channel/EpisodeTable'
const routes = [
  {
    path: '/',
    element: <LandingPage/>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/home',
    element: <HomePage/>
  },
  {
    path: '/channel',
    element: <Channel/>,
  },
  {
    path: '/channel/podcast',
    element: <EpisodeTable/>,
  }
];

export default routes;
