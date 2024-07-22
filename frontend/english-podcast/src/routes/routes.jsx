import React from 'react';
import Login from '../pages/login/Login';
import Logout from '../pages/logout/Logout'
import HomePage from '../pages/home/HomePage';
import Channel from '../pages/channel/Channel';
import EpisodeTable from '../pages/episode/EpisodeTable'
import Show from '../pages/show/Show'
import Sound from '../pages/sound/Sound';
const routes = [
  {
    path: '/',
    element: <HomePage/>,
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
    path: '/channel',
    element: <Channel/>,
    private:true,
  },
  {
    path: '/channel/podcast',
    element: <EpisodeTable/>,
    private:true,
  },
  {
    path: '/show/:podcastId',
    element: <Show/>
  },
  {
    path: '/show/:podcastId/play/:episodeId',
    element: <Sound/>
  }
];

export default routes;
