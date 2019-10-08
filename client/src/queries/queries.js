import {gql} from 'apollo-boost';

const getRecipesQuery = gql`
  {
    recipes {
      id
      name
    }
  }
`

const getRecipeQuery = gql`
  query($id: ID) {
    recipe(id: $id) {
      id
      name
      link
      ingredients
      steps
    }
  }
`


const addRecipeMutation = gql`
  mutation($name: String!, $link: String!, $ingredients: String!, $steps: String!) {
    addRecipe(name: $name, link: $link, ingredients: $ingredients, steps: $steps) {
      id
      name
    }
  }
`

export {getRecipesQuery, getRecipeQuery, addRecipeMutation};