import React from 'react';
import RecipeCard from './RecipeCard';
import {getRecipesQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import { useStateValue } from '../state';

const RecipeList = (props) => {
  const [{ userId }, dispatch] = useStateValue();
  const { data, loading, error } = useQuery(getRecipesQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;

  const displayAll = () => {
    return data.recipes.map(recipe => {
      return(
        <div key={recipe.id} className="recipe-grid__item">
          <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} />
        </div>
      );
    });
  }

  const displayMine = () => {
    return data.recipes.map(recipe => {
      if(recipe.userId === userId) {
        return(
          <div key={recipe.id} className="recipe-grid__item">
            <RecipeCard id={recipe.id} name={recipe.name} image={recipe.image} />
          </div>
        );
      }
    });
  }

  return (
    <div className="recipe-grid">
      { props.display === 'mine' ? displayMine() : displayAll() }
    </div>
  );
}

export default RecipeList;