import { useState } from "react";

// Here we import a helper function that will check if the email is valid
import { checkPassword, validateEmail } from './utils/helpers';

function Form() {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "userName") {
      setUserName(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email) || !userName) {
      setErrorMessage("Email or username is invalid");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
      // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      return;
    }
    alert(`Hello ${userName}`);

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setUserName("");
    setPassword("");
    setEmail("");
  };

  return (
      <div>
        <form
          className="form text-white bg-purple-600 m-4 p-4 border-2 rounded-xl text-bold text-center flex flex-col"
          onSubmit={handleFormSubmit}
        >
          Signup
          <input
            value={userName}
            name="userName"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            class="m-2 p-2 b-2 rounded-xl text-black"
          />
          <input
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
            class="m-2 p-2 b-2 rounded-xl text-black"
          />
          <input
            value={password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            class="m-2 p-2 b-2 rounded-xl text-black"
          />
          <button
            class="border-2 rounded-xl text-center w-24 flex justify-center m-2 p-2 b-2 "
            type="submit"
          >
            Signup
          </button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
  );
}

export default Form;
