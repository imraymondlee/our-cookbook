import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {getRecipeQuery, editRecipeMutation} from '../queries/queries';
import {useQuery, useMutation} from '@apollo/react-hooks';
import DeleteButton from './DeleteButton';

const EditRecipe = ({match}) => {
  const { data } = useQuery(getRecipeQuery, {variables: {id: match.params.id}});
  const [submitForm] = useMutation(editRecipeMutation);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  let fileInput = React.createRef();

  useEffect(() => {
    if(data && data.recipe) {
      setName(data.recipe.name);
      setLink(data.recipe.link);
      let formattedIngredients = '';
      data.recipe.ingredients.forEach((ingredient)=> {
        formattedIngredients += "*"+ingredient+"\n";
      });
      setIngredients(formattedIngredients);

      let formattedSteps = '';
      data.recipe.steps.forEach((step)=> {
        formattedSteps += "*"+step+"\n";
      });
      setSteps(formattedSteps);
    }
  },[data]);

  const submit = (e) => {
    e.preventDefault();
    // Ingredients
    let cleanIngredients = ingredients.replace(/\n/g, "");
    let ingredientsArray = cleanIngredients.split("*");
    ingredientsArray = ingredientsArray.slice(1,ingredientsArray.length);
    // Steps
    let cleanSteps = steps.replace(/\n/g, "");
    let stepsArray = cleanSteps.split("*");
    stepsArray = stepsArray.slice(1,stepsArray.length);

    // Image
    let fileName = null;
    if(fileInput.current.files[0]) {
      const formData = new FormData();
      formData.append('image', fileInput.current.files[0]);

      // Upload new image
      axios.post('/upload', formData, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
          // Returned image file name
          console.log(res);
          fileName = res.data;
        }).then(() => {
          // GraphQL Mutation for the post
          submitForm({ variables: {id: match.params.id, name: name, link: link, ingredients: ingredientsArray, steps: stepsArray, image: fileName }, refetchQueries: [{query:getRecipeQuery, variables:{id:match.params.id}}] });
          alert('Updated!');
        }).catch((err) => {
          console.log(err);
        });
    } else {
      fileName = data.recipe.image;
      // GraphQL Mutation for the post
      submitForm({ variables: {id: match.params.id, name: name, link: link, ingredients: ingredientsArray, steps: stepsArray, image: fileName }, refetchQueries: [{query:getRecipeQuery, variables:{id:match.params.id}}] });
      alert('Updated!');
    }
  }

  return (
    <div>
      <h1>Edit Recipe - {name}</h1>
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
          <label className="form__label" htmlFor="image">Image</label>
          {data && data.recipe ? <a href={data.recipe.image} target='_blank'>View Current Image</a> : ''}
          <input id="image" className="form__input" type="file" ref={fileInput} />
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
        <button className="button button--primary">Update</button>
        <div style={{float: 'right'}}>
          <DeleteButton id={match.params.id} />
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;