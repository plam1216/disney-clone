import React from 'react'
import { Link } from 'react-router-dom';

import { Video } from '../../../graphql';

import Section from '../../Components/Section/Section';

import filterVideoByFranchise from '../../hooks/filterVideoByFranchise';
import getRandomVideo from '../../hooks/getRandomVideo';


interface FranchiseProps {
  videos: Video[]
}


const Franchise = ({ videos }: FranchiseProps) => {
  const currentURL = window.location.href

  const splitURL = currentURL.split('/')
  const slug = splitURL[splitURL.length - 1]

  const filteredVideos = filterVideoByFranchise(videos, slug)
  const randomVideo = getRandomVideo(filteredVideos)

  return (
    <div>
      <div className="main-video">
        {randomVideo?.slug ?
          <Link to={`/video/${randomVideo.slug}`}>
            <div className="description">
              <h1 style={{ margin: 0 }}>{randomVideo?.title.toUpperCase()}</h1>

              <p>
                {randomVideo?.description}
              </p>
            </div>

            <div className="thumbnail">
              <img src={randomVideo.thumbnail.url} alt={randomVideo.title} />
            </div>
          </Link>
          :
          <></>
        }
      </div>

      <Section
        genre={slug}
        videos={filteredVideos}
      />
    </div>
  )
}

export default Franchise