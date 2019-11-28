import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {deleteRecipeMutation, getRecipesQuery} from '../queries/queries';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const DeleteButton = (props) => {
  const [deleteRecipe] = useMutation(deleteRecipeMutation);
  const [toHome, setToHome] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);

  const clickDelete = () => {
    deleteRecipe({ variables: { id: props.id }, refetchQueries: [{query:getRecipesQuery}] });
    setToHome(true);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      {toHome ? <Redirect to="/" /> : null }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="react-modal-component__modal"
        overlayClassName="react-modal-component"
        contentLabel="Recipe Updated Modal"
      >
        <h1>Are you sure you want to delete?</h1>
        <button onClick={closeModal} className="button button--secondary" style={{marginRight: '0.5rem'}}>Cancel</button>
        <button onClick={clickDelete} className="button button--caution">Delete</button>
      </Modal>

      <button type="button" onClick={openModal} className="button button--caution">Delete</button>
    </React.Fragment>
  );
}

export default DeleteButton;