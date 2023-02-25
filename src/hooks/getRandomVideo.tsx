import { Video } from "../../graphql"

const getRandomVideo = (videos: Video[]): Video => {
  const randomIndex = Math.floor(Math.random() * videos.length)
  return videos[randomIndex]
}

export default getRandomVideo