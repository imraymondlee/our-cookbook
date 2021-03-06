import React from 'react';
import { Link } from 'react-router-dom';
import {getRecipeQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import { useStateValue } from '../state';
import Loading from './Loading';

const Recipe = ({match}) => {
  const [{ userId }] = useStateValue();
  const { data, loading, error } = useQuery(getRecipeQuery, {variables: {id: match.params.id}});
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;

  const ingredientsList = data.recipe.ingredients.map(ingredient => {
    return (
      <li key={ingredient} className="single-recipe__list-item">{ingredient}</li>
    );
  });

  const stepsList = data.recipe.steps.map(step => {
    return (
      <li key={step} className="single-recipe__list-item">{step}</li>
    );
  });

  return (
    <div className="single-recipe">
      <div className="single-recipe__header">
        <h1 className="title">{data.recipe.name}</h1>
        <div><a href={data.recipe.link}>{data.recipe.link}</a></div>
      </div>

      <img src={data.recipe.image} className="single-recipe__image" alt="" />

      <div className="single-recipe__ingredients">
        <h2>Ingredients</h2>
        <ul className="single-recipe__list">
          {ingredientsList}
        </ul>
      </div>

      <div className="single-recipe__steps">
        <h2>Steps</h2>
        <ol className="single-recipe__list">
          {stepsList}
        </ol>
      </div>

      {  userId === data.recipe.userId && 
          <div className="single-recipe__options">
            <Link to={`/edit-recipe/${match.params.id}`} className="button button--secondary">Edit</Link>
          </div>
      }

    </div>
  );
}

export default Recipe;