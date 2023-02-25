export interface Video {
    id: string,
    title: string,
    description: string,
    mp4: { url: string },
    seen: boolean,
    slug: string,
    thumbnail: { url: string, title: string },
    tags: string[]
}

export interface Platform {
    id: string,
    title: string,
    slug: string,
    videos: Video[]
}

export interface Account {
    id: string,
    username: string
    avatar: { url: string }
}