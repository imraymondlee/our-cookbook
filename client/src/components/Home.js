import React from 'react';
import RecipeList from './RecipeList';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/new-recipe/">New</Link>
      <RecipeList />
    </div>
  );
}

export default Home;