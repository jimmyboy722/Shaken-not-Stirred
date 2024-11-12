import { Link } from "react-router-dom";
import Auth from "../utils/auth";
// get logout button to work

//make signup, login, buttons go away

function HeaderAndNav() {
  return (
    <>
    <Link to="/">
      <header className="text-white bg-purple-600 text-center text-5xl m-4 p-4 border-r-3 font-bold rounded-xl">
        Shaken not Stirred
      </header>
    </Link>
      <nav className="text-white bg-purple-600 text-center m-4 p-4 border-r-3 font-bold rounded-xl">
        <ul className="grid grid-cols-3 justify-between">
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="#" onClick={() => Auth.logout()}>Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HeaderAndNav;
