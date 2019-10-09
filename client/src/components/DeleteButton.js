import React from 'react';
import {deleteRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';

const DeleteButton = (props) => {
  const [deleteRecipe] = useMutation(deleteRecipeMutation);

  const clickDelete = () => {
    let del = window.confirm('Are you sure you want to delete?');
    if (del) {
      deleteRecipe({ variables: { id: props.id }, refetchQueries: [{query:getRecipesQuery}] });
      alert('Deleted');
    } else {
        // Do nothing!
    }
  }

  return (
    <button onClick={clickDelete}>Delete {props.id}</button>
  );
}

export default DeleteButton;