import React from 'react';
import Loading from './Loading';
import { Redirect } from 'react-router-dom';
import {getRecipesQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';

const RandomRecipe = () => {
  const { data, loading, error } = useQuery(getRecipesQuery);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error}</p>;

  let {recipes} = data;  
  let randomItem = recipes[Math.floor(Math.random() * recipes.length)];
  let url = "/recipe/"+randomItem.id;

  return (
    <Redirect to={url} />
  );
}

export default RandomRecipe;