import React from 'react';

const NewRecipe = () => {
  return (
    <div>
      <h1>New Recipe</h1>
      <form>
        <label for="name">Recipe Name</label>
        <input id="name" type="text" />
        <label for="link">Link</label>
        <input id="link" type="text" />
        <label for="ingredients">Ingredients</label>
        <input id="ingredients" type="text" />
        <label for="steps">Steps</label>
        <input id="steps" type="text" />
        <button>Save</button>
      </form>
    </div>
  );
}

export default NewRecipe;