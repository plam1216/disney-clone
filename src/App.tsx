// Documentation
// https://www.npmjs.com/package/graphql-request

import React from 'react';
import { gql, GraphQLClient } from 'graphql-request'


function App() {
  const getData = async () => {
    const url: string = process.env.REACT_APP_GRAPH_CMS_ENDPOINT!
    const token: string = process.env.REACT_APP_GRAPH_CMS_TOKEN!

    const client = new GraphQLClient(url, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })

    const query = gql`
      query {
        videos {
          id,
          title,
          createdAt,
        }
      }
    `
    const data = await client.request(query)
    const { videos } = data

    console.log(videos)

    return
  }

  getData()


  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
