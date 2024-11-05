// THIS FILE USED TO SET UP AN EXPRESS SERVER AND CONNECT IT TO THE GRAPHQL SERVER

// IMPORTS AND DECLARATIONS
const express = require("express");
const path = require("path");
// IMPORTING THE APOLLO SERVER CLASS FOR GRAPHQL
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4"); // INTEGRATING APOLLO WITH EXPRESS
const { authMdw } = require("./utils/auth"); // IMPORTING AUTHENTICATION MIDDLEWARE

// IMPORTING THE SCHEMA AND RESOLVERS
const { typeDefs, resolvers } = require("./schemas"); // GRAPHQL SCHEMAS
const db = require("./config/connection"); // DB CONNECTION

// SETTING UP THE SERVER PORT AND APOLLO SERVER INSTANCE
const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// SETTING UP THE EXPRESS APP
const app = express();

// APOLLO SERVER INTIALIZATION AND EXPRESS MIDDLEWARE SETUP
const runApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // SETTING UP GRAPHQL ENDPOINT
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMdw,
    })
  );
  // CHECKING IF NODE ENV IS PRODUCTION AND IF SO...
  //if (process.env.NODE_ENV === "production") {
    //SERVE STATIC FILES FROM CLIENT/DIST DIRECTORY ALLOWING FOR REACT ROUTING
   // app.use(express.static(path.join(__dirname, "../client/dist")));
    // FOR ALL OTHER ROUTES SEND INDEX.HTML IN THE CLIENT/DIST DIRECTORY
   // app.get("*", (req, res) => {
   //   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
   // });
  //}
  // DB CONNECTION AND SERVER LISTENING
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL found at http://localhost:${PORT}/graphql`);
    });
  });
};

// CALLING THE ASYNC FUNCTION TO START THE SERVER
runApolloServer();
