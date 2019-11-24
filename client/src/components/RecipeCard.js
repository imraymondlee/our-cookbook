import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
  return (
    <Link to={`/recipe/${props.id}`} className="recipe-card">
      <img src={props.image} alt="" className="recipe-card__image" />
      <div className="recipe-card__name">{props.name}</div>
    </Link>
  );
}

export default RecipeCard;