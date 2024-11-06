const { User, Drink } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        //Returns a list of all users
        users: async () => {
            return User.find().populate('drinks');
        },
        // Takes a username as an argument and returns a specific user based on that username
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('drinks');
        },
        //Returns a list of drinks optionally filtered by username
        drinks: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Drink.find(params).sort({ createdAt: -1 });
          },
        //Takes a drinkId as an argument and returns a specific thought.
        drink: async (parent, { drinkId }) => {
            return Drink.findOne({ _id: drinkId });
          },
        //Returns the currently authenticated user based on the context (used for profile)
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('drinks');
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        //Registers a new user returning an Auth object containing the token and user data.
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        //Logs in an existing user returning an Auth object with a token and user data.
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        //Allows an authenticated user to add a new drink andd returns the newly created Drink object
        addDrink: async (parent, { drinkName, drinkDescription }, context) => {
          if (context.user) {
            const drink = await Drink.create({
              drinkName,
              drinkDescription,
              drinkAuthor: context.user.username,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { drinks: drink._id } }
            );
    
            return drink;
          }
          throw AuthenticationError;
          ('You need to be logged in!');
        },
        //Deletes a drink identified by drinkId and returns the deleted Drink object
        removeDrink: async (parent, { drinkId }, context) => {
          if (context.user) {
            const drink = await Drink.findOneAndDelete({
              _id: drinkId,
              drinkAuthor: context.user.username,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { drinks: drink._id } }
            );
    
            return drink;
          }
          throw AuthenticationError;
        },
      },
    };
    
    module.exports = resolvers;
    