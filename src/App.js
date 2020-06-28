import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar'
import MovieDetail from './components/MovieDetail';
import { Error } from './components/Error'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/MovieSearch/' exact component={Home} />
          <Route path='/MovieSearch/:id' exact component={MovieDetail} />
          <Route path='/movie/:id' exact component={MovieDetail} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;