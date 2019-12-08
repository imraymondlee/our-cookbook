import React, {useState} from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {addRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { useStateValue } from '../state';

Modal.setAppElement(document.getElementById('root'));

const NewRecipe = () => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [submitForm] = useMutation(addRecipeMutation, {
    onCompleted: () => {
      setIsSubmitting(false);
    }
  });
  const [toHome, setToHome] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [{ userId }, dispatch] = useStateValue();

  let fileInput = React.createRef();

  const submit = (e) => {
    e.preventDefault();
    openModal();

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
    const data = new FormData();
    data.append('image', fileInput.current.files[0]);

    // Upload image
    axios.post(process.env.REACT_APP_API_ENDPOINT+'/upload', data, {
          'Content-Type': 'multipart/form-data'
      }).then((res) => {
        // Returned image file name
        console.log(res);
        fileName = res.data;
      }).then(() => {
        // GraphQL Mutation for the post
        submitForm({ variables: { name: name, userId: userId, link: link, ingredients: ingredientsArray, steps: stepsArray, image: fileName}, refetchQueries: [{query:getRecipesQuery}] });
      }).catch((err) => {
        console.log(err.response);
      });
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    setIsSubmitting(true); 
  }

  const closeModal = () => {
    setIsOpen(false);
    setToHome(true);
  }

  return (
    <div>
      {toHome ? <Redirect to="/" /> : null }

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="react-modal-component__modal"
        overlayClassName="react-modal-component"
        contentLabel="Recipe Updated Modal"
      >
        {isSubmitting ? (
          <h1>Saving</h1>
        ) : (
          <React.Fragment>
            <h1>Recipe Saved</h1>
            <button onClick={closeModal} className="button button--primary">Return Home</button>
          </React.Fragment>
        )}
      </Modal>
      
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
          <label className="form__label" htmlFor="image">Image</label>
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
        <button className="button button--primary">Save</button>
      </form>
    </div>
  )
}

export default NewRecipe;