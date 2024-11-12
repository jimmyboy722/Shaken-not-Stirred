import { gql} from "@apollo/client";

export const QUERY_ME = gql`
query me {
  me {
    _id
    username
    email
    drinks {
      _id
      drinkName
      drinkAuthor
      createdAt
      drinkDescription
      ingredients {
        name
        quantity
        unit
      }
      photo
    }
    favorites {
      _id
      createdAt
      drinkAuthor
      drinkDescription
      drinkName
      ingredients {
        name
        quantity
        unit
      }
      photo
    }
  }
}
`;
export const QUERY_DRINKS = gql`
query Drinks {
    drinks {
      drinkName
      drinkDescription
      drinkAuthor
      createdAt
      _id
      ingredients {
        name
        quantity
        unit
      }
      photo
    }
  }
  `;


export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    drinks {
      _id
      createdAt
      drinkAuthor
      drinkDescription
      drinkName
      ingredients {
        name
        quantity
        unit
      }
    }
    email
    favorites {
      _id
      createdAt
      drinkAuthor
      drinkDescription
      drinkName
      ingredients {
        name
        quantity
        unit
      }
    }
    username
  }
}
`;