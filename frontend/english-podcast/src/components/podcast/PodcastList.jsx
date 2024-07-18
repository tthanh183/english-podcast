import React, { useEffect, useState } from 'react'
import { getPodcasts } from '../../service/podcast/PodcastService'

import PodcastCard from './PodcastCard'
const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([])
  useEffect(() => {
    fetchData();
  })

  const fetchData = async () => {
    const result = await getPodcasts()
    console.log("success");
    setPodcasts(result)
  }

  
  return (
    <div className='flex flex-wrap justify-center'>
      <PodcastCard/>
     
    </div>
  )
}

export default PodcastList