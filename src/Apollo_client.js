import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://eminent-treefrog-39.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "oGzx4jqbIbRAIVGfB5W1FgkXmWkwWJrWwuQx1qeFQTQH13uGkTCNxDEpXHydS3pk",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://eminent-treefrog-39.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "oGzx4jqbIbRAIVGfB5W1FgkXmWkwWJrWwuQx1qeFQTQH13uGkTCNxDEpXHydS3pk",
      },
    },
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client