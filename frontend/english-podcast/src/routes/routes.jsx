import React from 'react';
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/login/Login';
import Logout from '../pages/logout/Logout'
import HomePage from '../pages/home/HomePage';
import Channel from '../pages/channel/Channel';
import EpisodeTable from '../pages/episode/EpisodeTable'
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
