/*eslint-disable*/
import {
  BrowserRouter, Route, Link, Switch,
} from 'react-router-dom';

import Login from './Components/Login';
import Home from './Components/Home';
import './App.css';
import MoviesListUser from './Components/MoviesListUser';

function App() {

  const isLogged = false;

  return (
    <BrowserRouter>

      <nav className="navbar">

        <Link to="/home" className="link">Home</Link>

        {
          isLogged ? <p>¡Bienvenido!</p> : <Link to="/auth" className="link">Auth</Link>
        }

      </nav>

      <Switch>
        <Route component={Login} path="/auth" />
        <Route component={Home} path="/home" />
        <Route component={Home} path="/" exact />
        <Route component={MoviesListUser} path="user" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
