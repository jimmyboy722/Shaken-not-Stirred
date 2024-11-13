import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="w-screen flex justify-center">
      <container className="max-w-md border-2 rounded-xl my-10">
        <div className="text-white bg-purple-950 m-4 p-4">
          <div className="card-body text-white m-4 p-4 rounded-xl text-2xl text-bold text-center">
            Login
          </div>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form className="grid grid-cols-1" onSubmit={handleFormSubmit}>
              <input
                className="m-2 p-2 b-2 rounded-xl text-black"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="m-2 p-2 b-2 rounded-xl text-black"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="m-2 p-2 b-2 rounded-xl text-black"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn text-center text-white bg-purple-950 mx-auto mt-4"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          {error && <div>{error.message}</div>}
        </div>
      </container>
    </main>
  );
};

export default Login;
