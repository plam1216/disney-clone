import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

import { gql, GraphQLClient } from 'graphql-request'


const Video = () => {
  const [videoData, setVideoData] = useState(null)

  // get search term from current page url
  // url generated from GraphCMS
  // http://localhost:3000/video/the-lion-king
  const location = useLocation()
  const pageSlug = location.pathname.split('/').pop()

  const getVideoData = async () => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    // search for video where slug = pageSlug
    const query = gql`
      query($pageSlug: String!) {
        video(where: {
          slug: $pageSlug
        }){
          id
          createdAt
          title
          tags
          slug
          mp4 {
            url
          }
        }
      }
    `

    const variables = {
      pageSlug,
    }

    const data = await client.request(query, variables)
    setVideoData(data.video)
  }

  useEffect(() => {
    getVideoData()
  }, [])

  console.log(videoData)

  return (
    <div>Video</div>
  )
}

export default Video