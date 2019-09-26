import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import NewRecipe from './NewRecipe';
import Recipe from './Recipe';

const App = () => {
  return (
    <Router>
      <Link to="/"><h1>Our Cookbook</h1></Link>
      <Route path="/" exact component={Home} />
      <Route path="/new-recipe" component={NewRecipe} />
      <Route path="/recipe" component={Recipe} />
    </Router>
  );
}

export default App;