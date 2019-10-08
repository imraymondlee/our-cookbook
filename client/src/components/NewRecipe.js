import React from 'react';
import {graphql} from 'react-apollo';
import {addRecipeMutation} from '../queries/queries';

// const NewRecipe = () => {
//   return (
//     <div>
//       <h1>New Recipe</h1>
//       <form>
//         <label for="name">Recipe Name</label>
//         <input id="name" type="text" />
//         <label for="link">Link</label>
//         <input id="link" type="text" />
//         <label for="ingredients">Ingredients</label>
//         <input id="ingredients" type="text" />
//         <label for="steps">Steps</label>
//         <input id="steps" type="text" />
//         <button>Save</button>
//       </form>
//     </div>
//   );
// }

class NewRecipe extends React.Component {
  state = {
    name: "",
    link: "",
    ingredients: "",
    steps: ""
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.addRecipeMutation({
      variables: {
        name: this.state.name,
        link: this.state.link,
        ingredients: this.state.ingredients,
        steps: this.state.steps
      }
    })
  }

  render(){
    return (
      <div>
        <h1>New Recipe</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Recipe Name</label>
          <input id="name" type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} />
          <label htmlFor="link">Link</label>
          <input id="link" type="text" value={this.state.link} onChange={(e)=>this.setState({link:e.target.value})} />
          <label htmlFor="ingredients">Ingredients</label>
          <input id="ingredients" type="text" value={this.state.ingredients} onChange={(e)=>this.setState({ingredients:e.target.value})} />
          <label htmlFor="steps">Steps</label>
          <input id="steps" type="text" value={this.state.steps} onChange={(e)=>this.setState({steps:e.target.value})} />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default graphql(addRecipeMutation, {name:'addRecipeMutation'})(NewRecipe);