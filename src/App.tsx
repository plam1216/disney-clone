// Documentation
// https://www.npmjs.com/package/graphql-request

import React, { useState, useEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request'

import { Videos } from '../graphql'

import Video from './Video/Video';

function App() {
  const [videos, setVideos] = useState<Videos[] | null>(null)

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
          title,
          createdAt,
        }
      }
    `
    const data = await client.request(query)
    setVideos(data.videos)
  }

  useEffect(() => {
    getAllVideosData()
  }, [])
  
  console.log(videos)

  return (
    <div>
      Hello World
      <Video/>
    </div>
  );
}

export default App;
