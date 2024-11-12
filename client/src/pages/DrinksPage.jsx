import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_DRINK } from '../utils/mutations';
import { QUERY_DRINKS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const AddDrink = () => {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [drinkName, setDrinkName] = useState('');
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [photoUrl, setPhotoUrl] = useState(''); // New state for photo URL
  const [addDrink, { error }] = useMutation(ADD_DRINK, {
    refetchQueries: [
      { query: QUERY_DRINKS },
      { query: QUERY_ME }
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!Auth.loggedIn()) {
      return;
    }

    try {
      const { data } = await addDrink({
        variables: {
          drinkName,
          drinkDescription,
          ingredients,
          photo: photoUrl // Include photo URL in mutation variables
        },
      });

      // Reset form fields after successful submission
      setDrinkName('');
      setDrinkDescription('');
      setIngredients([{ name: '', quantity: '', unit: '' }]);
      setPhotoUrl(''); // Reset photo URL field
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'drinkName') setDrinkName(value);
    if (name === 'drinkDescription') setDrinkDescription(value);
    if (name === 'photoUrl') setPhotoUrl(value); // Update photo URL state
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][name] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        {Auth.loggedIn() ? (
          <form 
            className="form text-white bg-purple-600 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label>Drink Name:</label>
              <input
                type="text"
                name="drinkName"
                value={drinkName}
                onChange={handleInputChange}
                placeholder="Drink Name"
                className="m-2 p-2 b-2 rounded-xl text-black"
                required
              />
            </div>
            <div>
              <label>Drink Description:</label>
              <textarea
                name="drinkDescription"
                value={drinkDescription}
                onChange={handleInputChange}
                placeholder="Drink Description"
                className="m-2 p-2 b-2 rounded-xl text-black"
                required
              ></textarea>
            </div>
            <div>
              <label>Photo URL:</label>
              <input
                type="text"
                name="photoUrl"
                value={photoUrl}
                onChange={handleInputChange}
                placeholder="Enter a URL for the drink photo"
                className="m-2 p-2 b-2 rounded-xl text-black"
              />
            </div>
            <div>
              <label>Ingredients:</label>
              {ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    className="m-2 p-2 b-2 rounded-xl text-black"
                    required
                  />
                  <input
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, e)}
                    className="m-2 p-2 b-2 rounded-xl text-black"
                    required
                  />
                  <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, e)}
                    className="m-2 p-2 b-2 rounded-xl text-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredientField}
                className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
              >
                Add Ingredient
              </button>
            </div>
            <button
              type="submit"
              className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
            >
              Add Drink
            </button>
            {error && <div className="error-text">{error.message}</div>}
          </form>
        ) : (
          <p>
            You need to be logged in to add a drink. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
          </p>
        )}
      </div>
        <div class=" text-white bg-purple-600 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col">
        Favorites
        </div>
    </div>
  );
};

export default AddDrink;
