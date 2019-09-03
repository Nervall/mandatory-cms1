import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/Home.js';
import Article from './components/Article.js';
import Author from './components/Author.js';

function App() {
  return (
    <Router>
      <Route exact path='/' component={ Home } />
      <Route path='/article/:id' component={ Article } />
      <Route path='/author/:id' component={ Author } />
    </Router>
  );
}

export default App;
