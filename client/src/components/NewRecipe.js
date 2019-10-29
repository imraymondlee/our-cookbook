import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {addRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';

const NewRecipe = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [submitForm] = useMutation(addRecipeMutation);

  const submit = (e) => {
    e.preventDefault();
    let cleanIngredients = ingredients.replace(/\n/g, "");
    let ingredientsArray = cleanIngredients.split("*");
    ingredientsArray = ingredientsArray.slice(1,ingredientsArray.length);
    submitForm({ variables: { name: name, link: link, ingredients: ingredientsArray, steps: steps }, refetchQueries: [{query:getRecipesQuery}] });
    alert('Submitted!');
  }

  return (
    <div>
      <h1>New Recipe</h1>
      <form className="form" onSubmit={submit}>
        <div className="form__field">
          <label className="form__label" htmlFor="name">Recipe Name</label>
          <input id="name" className="form__input" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="link">Link</label>
          <input id="link" className="form__input" type="text" value={link} onChange={(e)=>setLink(e.target.value)} />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="ingredients">Ingredients</label>
          <textarea id="ingredients" className="form__input" rows="10" value={ingredients} onChange={(e)=>setIngredients(e.target.value)} />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="steps">Steps</label>
          <textarea id="steps" className="form__input" rows="10" value={steps} onChange={(e)=>setSteps(e.target.value)} />
        </div>
        <Link to="/" className="button button--secondary" style={{marginRight: '0.5rem'}}>Cancel</Link>
        <button className="button button--primary">Save</button>
      </form>
    </div>
  )
}

export default NewRecipe;