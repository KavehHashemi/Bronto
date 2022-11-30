/* eslint-disable linebreak-style */
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://growling-mantra.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "BUnIz73pK3xh9qagIrfiExpWnuz07gFHxW9KJ70FARWxU1jXA4WGXW7aiOYWdtGb",
  },
  cache: new InMemoryCache(),
});

export default client;
