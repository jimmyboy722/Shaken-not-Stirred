import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const tkn = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: tkn ? `Bearer ${tkn}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
