import React from 'react';
import LandingPage from '../components/home/LandingPage';
import Login from '../components/auth/Login';

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
    path: '/upload',
    
  }
];

export default routes;
