import React from 'react';
import RecipeCard from './RecipeCard';
import {getRecipesQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const RecipeList = () => {
  const { data, loading, error } = useQuery(getRecipesQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;

  return (
    <div className="recipe-grid">
      {
        data.recipes.map(recipe => {
          return(
            <div key={recipe.id} className="recipe-grid__item">
              <RecipeCard id={recipe.id} name={recipe.name} />
            </div>
          );
        })
      }  
    </div>
  );
}

export default RecipeList;