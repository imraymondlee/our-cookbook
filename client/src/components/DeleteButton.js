import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {deleteRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';

const DeleteButton = (props) => {
  const [deleteRecipe] = useMutation(deleteRecipeMutation);
  const [toHome, setToHome] = useState(false);

  const clickDelete = () => {
    let del = window.confirm('Are you sure you want to delete?');
    if (del) {
      deleteRecipe({ variables: { id: props.id }, refetchQueries: [{query:getRecipesQuery}] });
      alert('Deleted');
      setToHome(true);
    } else {
        // Do nothing!
    }
  }

  return (
    <React.Fragment>
      {toHome ? <Redirect to="/" /> : null }
      <button onClick={clickDelete} className="button button--caution">Delete</button>
    </React.Fragment>
  );
}

export default DeleteButton;