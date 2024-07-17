import React from 'react';
import LandingPage from '../components/home/LandingPage';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout'
import HomePage from '../components/home/HomePage';
import Channel from '../components/channel/Channel';
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
  // {
  //   path: '/channel/upload',
  //   element: <Upload/>,
  //   private: true
  // }
];

export default routes;
