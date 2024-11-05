const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    drinks: [Drink]!
  }

  type Drink {
    _id: ID
    drinkName: String
    drinkDescription: String
    thoughtAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    drinks(username: String): [Drink]
    drink(drinkId: ID!): Drink
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDrink(drinkName: String!, drinkDescription: String!): Drink
    removeDrink(drinkId: ID!): Drink
  }
`;

module.exports = typeDefs;
