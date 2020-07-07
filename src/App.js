import React, { Suspense } from 'react';
import Home from './components/Home';
import { Error } from './components/Error'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Navbar = React.lazy(() => import('./components/Navbar'))
const MovieDetail = React.lazy(() => import('./components/MovieDetail'))
const Footer = React.lazy(() => import('./components/Footer'))

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<h6></h6>}>
          <Navbar />
        </Suspense>
        <Switch>
          <Route path='/' exact component={Home} />
          <Suspense fallback={<h6 style={{ textAlign: 'center' }}>Loading..</h6>}>
            <Route path='/movie/:id' exact component={MovieDetail} />
          </Suspense>
          <Route component={Error} />
        </Switch>
        <Suspense fallback={<h6></h6>}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;