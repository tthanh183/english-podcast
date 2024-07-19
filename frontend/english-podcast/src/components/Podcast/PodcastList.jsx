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
    setPodcasts(result)
  }

  
  return (
    <div className='flex flex-wrap justify-center'>
      {podcasts.map((podcast) => (
         <PodcastCard podcast={podcast}/>
      ))}
     
    </div>
  )
}

export default PodcastList