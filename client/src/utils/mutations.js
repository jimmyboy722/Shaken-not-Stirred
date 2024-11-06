import { gql } from "@apollo/client";

// LOGIN MUTATION TO LOGIN A USER BY TAKING THEIR EMAIL AND PASSWORD AS INPUT
// AND RETURNING AN AUTH OBJECT CONTAINING A TOKEN AND USER DATA
// TOKEN CAN BE STORED ON THE CLIENT SIDE TO MAINTAIN THE USER'S SESSION
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO REGISTER A NEW USER BY TAKING THEIR USERNAME, EMAIL AND PASSWORD AS INPUT
// UPON SUCCESSFUL REGISTRATION, RETURN A JWT TOKEN AND USER DATA
// CLIENT CAN USE THE TOKEN TO AUTOMATICALLY LOG IN THE USER AFTER REGISTRATION
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO SAVE A DRINK TO THE USER'S PROFILE
// TAKES IN A DRINKDATA OBJECT AS INPUT, WHICH CONTAINS THE DRINK'S DETAILS
// WHEN SUCCESSFUL, RETURNS THE UPDATED USER DATA
export const SAVE_DRINK = gql`
  mutation saveDrink($drinkData: DrinkInput!) {
    saveDrink(drinkData: $drinkData) {
      _id
      username
      email
      savedDrinks {
        drinkId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

// MUTATION TO REMOVE A DRINK FROM THE USER'S SAVED COLLECTION
// TAKES IN A DRINKID AS INPUT TO IDENTIFY THE DRINK TO BE REMOVED
// WHEN SUCCESSFUL, RETURNS THE UPDATED USER DATA ALONG WITH AN UPDATED SAVEDDRINKS ARRAY
// ALLOWS THE FRONTEND TO UPDATE THE USER'S SAVED DRINKS IMMEDIATELY UPON REMOVAL
export const REMOVE_DRINK = gql`
  mutation removeDrink($drinkId: ID!) {
    removeDrink(drinkId: $drinkId) {
      _id
      username
      email
      savedDrinks {
        drinkId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
