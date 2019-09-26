import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getRecipesQuery} from '../queries/queries';

class RecipeList extends Component {
  displayRecipes() {
    var data = this.props.data;
    if(data.loading) {
      return (<div>Loading recipes...</div>);
    } else {
      return data.recipes.map(recipe => {
        return (
          <li key={recipe.id}>{recipe.name}</li>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.displayRecipes()}       
        </ul>
      </div>
    );
  }
}

export default graphql(getRecipesQuery)(RecipeList);