import React from 'react'

import { Video } from '../../../../graphql'

import Section from '../../Section/Section'

import getUnseenVideos from '../../../hooks/getUnseenVideos'
import filterVideoByGenre from '../../../hooks/filterVideoByGenre'
import getRandomVideo from '../../../hooks/getRandomVideo'

interface HomeProps {
    videos: Video[]
}

const Home = ({ videos }: HomeProps) => {
    const randomVideo = getRandomVideo(videos)
    
    return (
        <div className="app">
            <div className="main-video">
                {randomVideo?.thumbnail !== undefined
                    ?
                    <img src={randomVideo.thumbnail.url} alt={randomVideo.title} />
                    :
                    <></>
                }
            </div>

            <div className="video-feed">
                <Section genre={"recommended"} videos={getUnseenVideos(videos)} />
                <Section genre={"classic"} videos={filterVideoByGenre(videos, "classic")} />
                <Section genre={"family"} videos={filterVideoByGenre(videos, "family")} />
                <Section genre={"action"} videos={filterVideoByGenre(videos, "action")} />
                <Section genre={"drama"} videos={filterVideoByGenre(videos, "drama")} />
            </div>
        </div>
    )
}

export default Home