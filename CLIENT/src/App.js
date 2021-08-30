import {
  BrowserRouter, Route, Link, Switch,
} from 'react-router-dom';

import Login from './Components/Login';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <Link to="/home" className="link">Home</Link>

        <Link to="/auth" className="link">Auth</Link>

      </nav>

      <Switch>
        <Route component={Login} path="/auth" />
        <Route component={Home} path="/home" />
        <Route component={Home} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
