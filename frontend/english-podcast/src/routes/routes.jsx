import React from 'react';
import LandingPage from '../pages/Landing/LandingPage';
import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout'
import HomePage from '../pages/Home/HomePage';
import Channel from '../pages/Channel/Channel';
import EpisodeTable from '../pages/Episode/EpisodeTable'
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
