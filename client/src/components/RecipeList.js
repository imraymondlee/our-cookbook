import React from 'react';
import { Link } from 'react-router-dom';
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
              <li key={recipe.id}><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></li>
            );
          })
        }  
      </ul>
    </div>
  );
}

export default RecipeList;