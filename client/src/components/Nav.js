import React from 'react';
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useStateValue } from '../state';

const Nav = () => {
  const [{ accountId }, dispatch] = useStateValue();

  const responseGoogle = (response) => {
    console.log(response);
    console.log("GoogleId:", response.googleId);

    dispatch({
      type: 'login',
      accountId: response.googleId
    });
  }

  const logout = () => {
    console.log('Logging Out');
    dispatch({
      type: 'login',
      accountId: ''
    });
  }

  return (
    <div className="nav">
      <Link to="/" className="nav__logo"><span role="img" aria-hidden="true">👨‍🍳</span> Our Cookbook</Link>
      <div className="nav__links">
        <Link to="/" className="nav__item">All Recipes</Link>
        <Link to="/new-recipe/" className="nav__item">New Recipe</Link>
        <Link to="/random-recipe/" className="nav__item">Random Recipe</Link>
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Logout"
              onLogoutSuccess={logout}
            >
        </GoogleLogout>

        <p>Google ID: {accountId}</p>

      </div>
    </div>
  );
}

export default Nav;