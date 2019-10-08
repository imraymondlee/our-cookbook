import React from 'react';
import {getRecipesQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const RecipeList = () => {
  const { data, loading, error } = useQuery(getRecipesQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <ul>
        {
          data.recipes.map(recipe => {
            return(
              <li key={recipe.id}>{recipe.name}</li>
            );
          })
        }  
      </ul>
    </div>
  );
}

export default RecipeList;