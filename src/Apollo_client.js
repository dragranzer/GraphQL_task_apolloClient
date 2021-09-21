import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://eminent-treefrog-39.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
      'x-hasura-admin-secret' : 'oGzx4jqbIbRAIVGfB5W1FgkXmWkwWJrWwuQx1qeFQTQH13uGkTCNxDEpXHydS3pk'
  }
});

export default client