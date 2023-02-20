export interface Videos {
    title: string,
    description: string,
    mp4: string,
    seen: boolean,
    slug: string,
    thumbnail: string,
    tags: string[]
}

export interface Platform {
    title: string,
    slug: string,
    videos: Videos[]
}

export interface Account {
    username: string
    avatar: string
    platform: Platform
}