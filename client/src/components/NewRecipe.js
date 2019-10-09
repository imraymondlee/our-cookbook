import React, {useState} from 'react';
import {addRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';

const NewRecipe = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [submitForm] = useMutation(addRecipeMutation);

  return (
    <form onSubmit={e => {
          e.preventDefault();
          submitForm({ variables: { name: name, link: link, ingredients: ingredients, steps: steps }, refetchQueries: [{query:getRecipesQuery}] });
          alert('Submitted!');
        }}>
      <label htmlFor="name">Recipe Name</label>
      <input id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <label htmlFor="link">Link</label>
      <input id="link" type="text" value={link} onChange={(e)=>setLink(e.target.value)} />
      <label htmlFor="ingredients">Ingredients</label>
      <input id="ingredients" type="text" value={ingredients} onChange={(e)=>setIngredients(e.target.value)} />
      <label htmlFor="steps">Steps</label>
      <input id="steps" type="text" value={steps} onChange={(e)=>setSteps(e.target.value)} />
      <button>Save</button>
    </form>
  )
}

export default NewRecipe;