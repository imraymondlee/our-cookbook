import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from './Nav';
import Home from './Home';
import NewRecipe from './NewRecipe';
import Recipe from './Recipe';
import EditRecipe from './EditRecipe';
import RandomRecipe from './RandomRecipe';
import MyRecipes from './MyRecipes';

const App = () => {
  return (
    <Router>
      <Nav />
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/new-recipe" component={NewRecipe} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/edit-recipe/:id" component={EditRecipe} />
        <Route path="/random-recipe" component={RandomRecipe} />
        <Route path="/my-recipes" component={MyRecipes} />
      </main>
    </Router>
  );
}

export default App;