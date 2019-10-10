import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/" className="nav__logo">👨‍🍳 Our Cookbook</Link>
      <div className="nav__links">
        <Link to="/" className="nav__item">All Recipes</Link>
        <Link to="/new-recipe/" className="nav__item">New Recipe</Link>
      </div>
    </div>
  );
}

export default Nav;