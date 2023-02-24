import React from 'react'

import { Video } from '../../../graphql'
import Card from '../Card/Card'


interface SectionProps {
    genre: string
    videos: Video[]
}

const Section = ({ genre, videos }: SectionProps) => {
    return (
        <div className="section">
            <h3>{genre.toUpperCase()}</h3>
            <div>
                {videos.map((video) => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card
                            thumbnail={video.thumbnail}
                            title={video.title}
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Section