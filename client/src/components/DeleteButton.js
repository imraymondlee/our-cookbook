import React from 'react';
import {deleteRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from "react-router-dom";

const DeleteButton = (props) => {
  const [deleteRecipe, { loading, error }] = useMutation(deleteRecipeMutation);

  const clickDelete = () => {
    deleteRecipe({ variables: { id: props.id }, refetchQueries: [{query:getRecipesQuery}] });
  }

  return (
    <button onClick={clickDelete}>Delete {props.id}</button>
  );
}

export default DeleteButton;