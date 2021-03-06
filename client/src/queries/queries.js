import {gql} from 'apollo-boost';

const getRecipesQuery = gql`
  {
    recipes {
      id
      name
      userId
      image
    }
  }
`

const getRecipeQuery = gql`
  query($id: ID) {
    recipe(id: $id) {
      id
      name
      userId
      link
      ingredients
      steps
      image
    }
  }
`

const addRecipeMutation = gql`
  mutation($name: String!, $userId: String!, $link: String!, $ingredients: [String]!, $steps: [String]!, $image: String) {
    addRecipe(name: $name, userId: $userId, link: $link, ingredients: $ingredients, steps: $steps, image: $image) {
      id
      name
    }
  }
`

const deleteRecipeMutation = gql`
  mutation($id: ID) {
    deleteRecipe(id: $id) {
      name
    }
  }
`

const editRecipeMutation = gql`
  mutation($id: ID, $name: String!, $link: String!, $ingredients: [String]!, $steps: [String]!, $image: String) {
    editRecipe(id: $id, name: $name, link: $link, ingredients: $ingredients, steps: $steps, image: $image) {
      id
      name
    }
  }
`
export {getRecipesQuery, getRecipeQuery, addRecipeMutation, deleteRecipeMutation, editRecipeMutation};