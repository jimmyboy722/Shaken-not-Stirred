const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    drinks: [Drink]!
    favorites: [Drink!]!
  }

  type Drink {
    _id: ID
    drinkName: String
    drinkDescription: String
    ingredients: [Ingredient!]!
    photo: String
    drinkAuthor: String
    createdAt: String
  }

  type Ingredient {
    name: String!
    quantity: Float!
    unit: String!
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
    addDrink(drinkName: String!, drinkDescription: String!, ingredients: [IngredientInput!]!, photo: String ): Drink
    removeDrink(drinkId: ID!): Drink
    addToFavorites(drinkId: ID!): User
    removeFromFavorites(drinkId: ID!): User
  }
  input IngredientInput {
    name: String!
    quantity: Float!
    unit: String!
  }
`;

module.exports = typeDefs;
