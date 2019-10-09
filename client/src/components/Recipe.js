import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import {getRecipeQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const Recipe = ({match}) => {
  const { data, loading, error } = useQuery(getRecipeQuery, {variables: {id: match.params.id}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <h1>Recipe - {data.recipe.name}</h1>

      <h2>Link</h2>
      <p><a href={data.recipe.link}>{data.recipe.link}</a></p>

      <h2>Ingredients</h2>
      <p>{data.recipe.ingredients}</p>

      <h2>Steps</h2>
      <p>{data.recipe.steps}</p>
      <Link to={`/edit-recipe/${match.params.id}`}>Edit</Link>
      <DeleteButton id={match.params.id}/>
    </div>
  );
}

export default Recipe;