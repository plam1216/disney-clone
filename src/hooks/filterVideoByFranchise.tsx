import { Video } from "../../graphql"

const filterVideoByFranchise = (videos: Video[], franchise: string): Video[] => {
    return videos.filter(video => video.tags.includes(franchise))
}

export default filterVideoByFranchise