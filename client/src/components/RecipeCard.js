import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
  return (
    <Link to={`/recipe/${props.id}`} className="recipe-card">
      <div className="recipe-card__name">{props.name}</div>
    </Link>
  );
}

export default RecipeCard;