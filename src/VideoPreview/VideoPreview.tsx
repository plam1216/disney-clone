import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { gql, GraphQLClient } from 'graphql-request'
import { Video } from '../../graphql';


interface RouteParams {
  slug: string
}


const VideoPreview = () => {
  const [videoData, setVideoData] = useState<Video>({
    id: "",
    title: "",
    description: "",
    mp4: { url: "" },
    seen: false,
    slug: "",
    thumbnail: { url: "", title: "" },
    tags: []
  })

  const [watching, setWatching] = useState(false)

  // get search term from current page url
  // url generated from GraphCMS
  // http://localhost:3000/video/the-lion-king
  const { slug } = useParams<RouteParams>()

  const getVideoData = async () => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    // search for video
    const videoQuery = gql`
      query($slug: String!) {
        video(where: {
          slug: $slug
        }){
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

    const variables = {
      slug,
    }

    const data = await client.request(videoQuery, variables)
    setVideoData(data.video)
  }

  useEffect(() => {
    getVideoData()
  }, [])

  console.log("videoData", videoData)

  return (
    <>
      {/* not watching, shows title screen */}
      {!watching && <img className="video-image" src={videoData.thumbnail.url} alt={videoData.title} />}
      {!watching && <div className="info">
        <p>{videoData.tags.join(', ').toUpperCase()}</p>
        <p>{videoData.description}</p>

        <a href="/">Go Back</a>
        <button
          className={"video-overlay"}
          onClick={() => {
            watching ? setWatching(false) : setWatching(true)
          }}
        >PLAY</button>
      </div>
      }

      {/* watching === true; video plays */}
      {watching &&
        <video style={{ width: '100%' }} controls>
          <source src={videoData.mp4.url} />
        </video>
      }

      {/* clicking on info-footer goes back to title screen with description */}
      <div className="info-footer"
        onClick={() => watching ? setWatching(false) : null}
      >
      </div>
    </>
  )
}

export default VideoPreview