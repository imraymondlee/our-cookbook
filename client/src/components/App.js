import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from './Nav';
import Home from './Home';
import NewRecipe from './NewRecipe';
import Recipe from './Recipe';
import EditRecipe from './EditRecipe';

const App = () => {
  return (
    <Router>
      <Nav />
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/new-recipe" component={NewRecipe} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/edit-recipe/:id" component={EditRecipe} />
      </main>
    </Router>
  );
}

export default App;