import React from 'react'

interface CardProps {
    thumbnail: { url: string },
    title: string
}

const Card = ({ thumbnail, title }: CardProps) => {
    return (
        <img className="card" src={thumbnail.url} alt={title} />
    )
}

export default Card