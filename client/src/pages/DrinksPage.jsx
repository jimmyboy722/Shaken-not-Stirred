import { useState } from "react";

function AddDrink() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [DrinkName, setDrinkName] = useState("");
  const [DrinkDescription, setDrinkDescription] = useState("");
  const [Author, setAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    // Getting the name and value of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either DrinkName, Drink Desciprtion and Author
    if (inputType === "DrinkName") {
      setDrinkName(inputValue);
    } else if (inputType === "DrinkDescription") {
      setDrinkDescription(inputValue);
    } else {
      setAuthor(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // First we check to see if the DrinkName, DrinkDescription or Author is empty. If so we set an error message to be displayed on the page.
    if (!DrinkName || !DrinkDescription || !Author) {
      setErrorMessage("Please fill out fields!");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
    }
    // If everything goes according to plan, we want to clear out the input after successfully adding a drink
    setDrinkName("");
    setDrinkDescription("");
    setAuthor("");
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <form
            className="form text-white bg-purple-600 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col"
            onSubmit={handleFormSubmit}
          >
            Add a drink
            <input
              value={DrinkName}
              name="DrinkName"
              onChange={handleInputChange}
              type="text"
              placeholder="Drink Name"
              class="m-2 p-2 b-2 rounded-xl text-black"
            />
            <input
              value={DrinkDescription}
              name="DrinkDescription"
              onChange={handleInputChange}
              type="text"
              placeholder="Drink Description"
              class="m-2 p-2 b-2 rounded-xl text-black"
            />
            <input
              value={Author}
              name="Author"
              onChange={handleInputChange}
              type="text"
              placeholder="Author"
              class="m-2 p-2 b-2 rounded-xl text-black"
            />
            <button
              class="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2 "
              type="submit"
            >
              Add drink
            </button>
          </form>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
        </div>
        <div class=" text-white bg-purple-600 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col">
          Favorites
        </div>
      </div>
    </>
  );
}

export default AddDrink;
