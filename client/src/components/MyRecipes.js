import React from 'react';
import RecipeList from './RecipeList';

const MyRecipes = () => {
  return (
    <div>
      <h1>My Recipes</h1>
      <RecipeList display="mine" />
    </div>
  );
}

export default MyRecipes;