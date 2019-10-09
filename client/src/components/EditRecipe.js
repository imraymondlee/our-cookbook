import React, {useState, useEffect} from 'react';
import {getRecipeQuery, editRecipeMutation} from '../queries/queries';
import {useQuery, useMutation} from '@apollo/react-hooks';

const EditRecipe = ({match}) => {
  const { data } = useQuery(getRecipeQuery, {variables: {id: match.params.id}});
  const [submitForm] = useMutation(editRecipeMutation);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    if(data && data.recipe) {
      setName(data.recipe.name);
      setLink(data.recipe.link);
      setIngredients(data.recipe.ingredients);
      setSteps(data.recipe.steps);
    }
  },[data]);

  const submit = (e) => {
    e.preventDefault();
    submitForm({ variables: {id: match.params.id, name: name, link: link, ingredients: ingredients, steps: steps }, refetchQueries: [{query:getRecipeQuery, variables:{id:match.params.id}}] });
    alert('Updated!');
  }

  return (
    <div>
      <h1>Edit Recipe {match.params.id}</h1>
      <form onSubmit={submit}>
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

    </div>
  );
}

export default EditRecipe;