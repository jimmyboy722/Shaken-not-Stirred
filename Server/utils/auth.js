//  IMPORTS AND DECLARATIONS
const { GraphQLError } = require("graphql"); // TO CREATE A CUSTOM ERROR FOR UNAUTHENTICATED USERS
const jwt = require("jsonwebtoken");
const exp = 3600000; // SETS THE EXPIRATION TIME OF THE TOKEN IN MILLISECONDS

module.exports = {
  // ERROR HANDLING FOR AUTHENTICATION
  AuthenticationError: new GraphQLError("User Not Authenticated", {
    extensions: {
      code: "NOT AUTHENTICATED",
    },
  }),
  // AUTHENTICATION MIDDLEWARE
  authMdw: function ({ req }) {
    // SO TOKENS CAN BE SENT VIA REQ.BODY, REQ.QUERY, OR REQ.HEADERS
    let tkn = req.body.token || req.query.token || req.headers.authorization;
    // IF TOKEN IS IN THE HEADERS IT SPLITS IT UP AND REMOVES THE Bearer
    if (req.headers.authorization) {
      tkn = tkn.split(" ").pop().trim();
    }
    // IF THERE IS NO TOKEN RETURN THE REQUEST
    if (!tkn) {
      return req;
    }
    // IF TOKEN IS FOUND, VERIFICATION ATTEMPTED WITH JWT.VERIFY METHOD AGAINST THE SECRET KEY AND EXPIRATION
    try {
      const { data } = jwt.verify(tkn, process.env.AUTH_SECRET, { maxAge: exp });
      req.user = data; // IF VERIFICATION IS SUCCESSFUL, REQ.USER IS POPULATED WITH TOKEN'S DATA PAYLOAD
    } catch {
      // ERROR HANDLING IF VERIFICAITON FAILS
      console.log("Token not valid");
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const pLoad = { username, email, _id };
    // RETURN GENERATED JWT TOKEN WHEN USER LOGS IN OR REGISTERS
    return jwt.sign({ data: pLoad }, process.env.AUTH_SECRET, {
      expiresIn: exp,
    });
  },
};
