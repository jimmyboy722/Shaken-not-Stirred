const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    drinks: [Drink]!
  }

  type Thought {
    _id: ID
    drinkName: String
    drinkDescription: String
    createdAt: String
  }
`;

module.exports = typeDefs;
