import Header from "./components/Header.jsx";
import SignUpForm from "./components/SignupForm.jsx";
import AddDrink from "./components/AddDrink.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SearchDrink from "./components/SearchDrinks.jsx";
import SavedDrink from "./components/SavedDrinks.jsx";

import {Outlet} from "react-router-dom";
import '../src/app.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
      <Header/>
      <SignUpForm/>
      <LoginForm/>
      <AddDrink/>
      <SearchDrink/>
      <SavedDrink/>
      <Outlet/>
    </ApolloProvider>
  );
}

export default App;
