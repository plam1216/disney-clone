import React from 'react'

import { Video } from '../../../../graphql'

import Section from '../../Section/Section'


interface HomeProps {
    randomVideo: Video
    getUnseenVideos: () => Video[]
    filterVideoByGenre: (genre: string) => Video[]
}

const Home = ({ randomVideo, getUnseenVideos, filterVideoByGenre }: HomeProps) => {
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
                <Section genre={"recommended"} videos={getUnseenVideos()} />
                <Section genre={"classic"} videos={filterVideoByGenre("classic")} />
                <Section genre={"family"} videos={filterVideoByGenre("family")} />
                <Section genre={"action"} videos={filterVideoByGenre("action")} />
                <Section genre={"drama"} videos={filterVideoByGenre("drama")} />
            </div>
        </div>
    )
}

export default Home