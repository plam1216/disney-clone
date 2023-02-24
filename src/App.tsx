// Documentation
// https://www.npmjs.com/package/graphql-request

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { gql, GraphQLClient } from 'graphql-request'

import { Video } from '../graphql'

import VideoPreview from './VideoPreview/VideoPreview';
import Home from './Components/Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';


function App() {
  const [videos, setVideos] = useState<Video[]>([])

  const getAllVideosData = async () => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    const query = gql`
      query {
        videos {
          id,
          createdAt,
          title,
          description,
          seen,
          tags,
          slug,
          thumbnail {
            url
          },
          mp4 {
            url
          },
        }
      }
    `
    const data = await client.request(query)
    setVideos(data.videos)
  }

  const getRandomVideo = (): Video => {
    const randomIndex = Math.floor(Math.random() * videos.length)
    return videos[randomIndex]
  }

  const filterVideoByGenre = (genre: string): Video[] => {
    return videos.filter(video => video.tags.includes(genre))
  }

  const getUnseenVideos = (): Video[] => {
    return videos.filter(video => video.seen !== true)
  }

  const randomVideo: Video = getRandomVideo()


  useEffect(() => {
    getAllVideosData()
  }, [])

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact path='/'
          render={(rp) =>
            <Home
              randomVideo={randomVideo}
              getUnseenVideos={getUnseenVideos}
              filterVideoByGenre={filterVideoByGenre}
            />
          }
        />

        <Route
          path='/video/:slug'
          render={(rp) =>
            <VideoPreview
              filterVideoByGenre={filterVideoByGenre}
            />
          }
        />

      </Switch>
    </>
  );
}

export default App;
