import { ApolloClient, InMemoryCache } from "@apollo/client";

const getStaticProps = () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  return client;
};

const graphClient = getStaticProps();

export default graphClient;
