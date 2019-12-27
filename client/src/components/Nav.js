import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useStateValue } from '../state';

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [{ userId }, dispatch] = useStateValue();

  const responseGoogle = (response) => {
    console.log(userId);
    console.log(response);
    console.log("GoogleId:", response.googleId);

    dispatch({
      type: 'login',
      userId: response.googleId
    });
  }

  const logout = () => {
    console.log('Logging Out');
    dispatch({
      type: 'login',
      userId: undefined
    });
  }

  const toggleNav = () => {
    console.log('clicked');
    if(!navOpen) {
      setNavOpen(true);
    } else {
      setNavOpen(false);
    }
  }

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <Link to="/" className="nav__logo"><span role="img" aria-hidden="true">👨‍🍳</span> Our Cookbook</Link>
        <button className="nav__hamburger" onClick={toggleNav}>Menu</button>
      </div>
      <div className={"nav__links " + (navOpen ? "nav__links--isOpen" : "")}>
        <Link to="/" className="nav__item">All Recipes</Link>
        <Link to="/random-recipe/" className="nav__item">Random Recipe</Link>
        {userId === undefined ? (
          <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
        ) : (
          <React.Fragment>
            <Link to="/my-recipes/" className="nav__item">My Recipes</Link>
            <Link to="/new-recipe/" className="nav__item">New Recipe</Link>
            <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                >
            </GoogleLogout>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}

export default Nav;