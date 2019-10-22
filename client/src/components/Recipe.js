import React from 'react';
import { Link } from 'react-router-dom';
import {getRecipeQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const Recipe = ({match}) => {
  const { data, loading, error } = useQuery(getRecipeQuery, {variables: {id: match.params.id}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div className="single-recipe">
      <div className="single-recipe__header">
        <h1 className="title">{data.recipe.name}</h1>
        <div><a href={data.recipe.link}>{data.recipe.link}</a></div>
      </div>

      <div className="single-recipe__ingredients">
        <h2>Ingredients</h2>
        <p>{data.recipe.ingredients}</p>
      </div>

      <div className="single-recipe__steps">
        <h2>Steps</h2>
        <p>{data.recipe.steps}</p>
      </div>

      <div className="single-recipe__options">
        <Link to={`/edit-recipe/${match.params.id}`} className="button button--secondary">Edit</Link>
      </div>
    </div>
  );
}

export default Recipe;