import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_DRINK, REMOVE_DRINK } from "../utils/mutations";
import { QUERY_DRINKS, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const AddDrink = () => {
  const [drinkName, setDrinkName] = useState("");
  const [drinkDescription, setDrinkDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [addDrink, { error }] = useMutation(ADD_DRINK, {
    refetchQueries: [{ query: QUERY_DRINKS }, { query: QUERY_ME }],
  });

  const [removeDrink] = useMutation(REMOVE_DRINK, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const { data } = useQuery(QUERY_ME);
  console.log(data);

  const drinks = data?.me?.drinks || [];

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
          photo: photoUrl,
        },
      });

      setDrinkName("");
      setDrinkDescription("");
      setIngredients([{ name: "", quantity: "", unit: "" }]);
      setPhotoUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "drinkName") setDrinkName(value);
    if (name === "drinkDescription") setDrinkDescription(value);
    if (name === "photoUrl") setPhotoUrl(value);
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][name] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleRemoveDrink = async (drinkId) => {
    try {
      await removeDrink({
        variables: { drinkId },
      });
    } catch (err) {
      console.error("Failed to remove drink:", err);
    }
  };
  return (
    <div className="grid grid-cols-2">
      {Auth.loggedIn() ? (
        <form
          className="form text-white bg-purple-950 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-center">Add Drink</h3>

          <div className="flex-wrap">
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
          </div>

          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div className="flex flex-row" key={index}>
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
            </div>
          ))}

          <div className="flex justify-evenly">
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={addIngredientField}
              className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
            >
              Add Ingredient
            </button>
            <button
              type="submit"
              className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
            >
              Add Drink
            </button>
          </div>
          {error && <div className="error-text">{error.message}</div>}
        </form>
      ) : (
        <p>
          You need to be logged in to add a drink. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}

      {/* Display user's drinks */}
      <div className="form text-white bg-purple-950 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col">
        <h3>Drinks</h3>
        {drinks.length > 0 ? (
          drinks.map((drink) => (
            <div class="mb-2 mt-2 max-w-big p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div key={drink._id}>
                <h4>{drink.drinkName}</h4>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {drink.photo ? (
                    <img
                      src={drink.photo}
                      alt={drink.drinkName}
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <p>{drink.drinkDescription}</p>
                <div className="ingredients">
                  <h5>Ingredients:</h5>
                  {drink.ingredients.length > 0 ? (
                    drink.ingredients.map((ingredient, idx) => (
                      <p key={idx}>
                        {ingredient.name}: {ingredient.quantity}{" "}
                        {ingredient.unit}
                      </p>
                    ))
                  ) : (
                    <p>No ingredients listed.</p>
                  )}
                </div>
                <p>created at: {drink.createdAt}</p>
                <button
                  onClick={() => handleRemoveDrink(drink._id)}
                  className="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2"
                >
                  Remove Drink
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite drinks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddDrink;
