// Documentation
// https://www.npmjs.com/package/graphql-request

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { gql, GraphQLClient } from 'graphql-request'

import { Video, Account } from '../graphql'

import VideoPreview from './Pages/VideoPreview/VideoPreview';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Franchise from './Pages/Franchise/Franchise';

const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

const client = new GraphQLClient(url, {
  headers: {
    "Authorization": "Bearer " + token
  }
})

function App() {
  const [videos, setVideos] = useState<Video[]>([])
  const [account, setAccount] = useState<Account>({
    id: "",
    username: "",
    avatar: { url: "" },
  })

  const getAllVideosData = async () => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    const query = gql`
      query {
        videos (first: 200) {
          id,
          createdAt,
          title,
          description,
          seen,
          tags,
          slug,
          thumbnail {
            url
          },
          mp4 {
            url
          },
        }
      }
    `
    const data = await client.request(query)
    setVideos(data.videos)
  }

  const getAccountData = async () => {
    const accountQuery = gql`
      query {
        account(where: {id: "clec3arav45d40alg0qzkvj74"} ) {
          id
          username
          avatar {
            url
          }
        }
      }
    `

    const accountData = await client.request(accountQuery)
    setAccount(accountData.account)
  }


  useEffect(() => {
    getAccountData()
    getAllVideosData()
  }, [])

  return (
    <>
      <Switch>
        <Route
          exact path='/'
          render={(rp) =>
            <>
              <Navbar
                account={account}
              />
              <Home
                videos={videos}
              />
            </>
          }
        />

        <Route
          path='/video/:slug'
          render={(rp) =>
            <VideoPreview />
          }
        />

        <Route
          path='/:franchise'
          render={(rp) =>
            <>
              <Navbar
                account={account}
              />
              <Franchise
                videos={videos}
              />
            </>
          }
        />
      </Switch>
    </>
  );
}

export default App;
