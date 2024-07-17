import React from 'react';
import HomePage from '../components/home/HomePage';
import Login from '../components/auth/Login';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  }
];

export default routes;
