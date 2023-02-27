import React from 'react'
import { Link } from 'react-router-dom'

import { Video } from '../../../graphql'

import Section from '../../Components/Section/Section'

import getUnseenVideos from '../../hooks/getUnseenVideos'
import filterVideoByGenre from '../../hooks/filterVideoByGenre'
import getRandomVideo from '../../hooks/getRandomVideo'

import disneyLogo from '../../assets/disney-button.png'
import pixarLogo from '../../assets/pixar.png'
import marvelLogo from '../../assets/marvel-button.png'
import starWarsLogo from '../../assets/star-wars-button.png'

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

            {/* <div className="video-feed">
                <div className="franchise">
                    <Link to="/disney">
                        <img src={disneyLogo} alt="disney"/>
                    </Link>
                </div>

                <div className="franchise">
                    <Link to="/pixar">
                        <img src={pixarLogo} alt="pixar"/>
                    </Link>
                </div>
                <div className="franchise">
                    <Link to="/marvel">
                        <img src={marvelLogo} alt="marvel"/>
                    </Link>
                </div>

                <div className="franchise">
                    <Link to="/star-wars">
                        <img src={starWarsLogo} alt="star-wars"/>
                    </Link>
                </div>
            </div> */}

            <Section genre={"recommended"} videos={getUnseenVideos(videos)} />
            <Section genre={"classic"} videos={filterVideoByGenre(videos, "classic")} />
            <Section genre={"family"} videos={filterVideoByGenre(videos, "family")} />
            <Section genre={"action"} videos={filterVideoByGenre(videos, "action")} />
            <Section genre={"drama"} videos={filterVideoByGenre(videos, "drama")} />
        </div>
    )
}

export default Home