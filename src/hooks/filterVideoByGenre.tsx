import { Video } from "../../graphql"

const filterVideoByGenre = (videos: Video[], genre: string): Video[] => {
    return videos.filter(video => video.tags.includes(genre))
}

export default filterVideoByGenre