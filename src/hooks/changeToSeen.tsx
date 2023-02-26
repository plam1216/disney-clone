import React from 'react'
import { GraphQLClient } from 'graphql-request'

// clicking Play button changes seen to true
const changeToSeen = async (slug: string) => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    // mutate seen to be true
    await client.request(
        `
        mutation($slug: String!) {
          updateVideo(where: 
            { slug: $slug}, 
            data: { seen: true}
          ) {
            id,
            title,
            seen
          }
        }
        `,
        { slug: slug }
    )

    // must publish the changes
    await client.request(
        `mutation publishVideo($slug: String) {
            publishVideo(where: { slug: $slug}, to: PUBLISHED) {
                slug
            }
        }`,
        { slug: slug }
    )

    // res.status(201).json({ slug: slug })
}

export default changeToSeen