import { Video } from "../../graphql"

const getUnseenVideos = (videos: Video[]): Video[] => {
    return videos.filter(video => video.seen !== true)
}

export default getUnseenVideos