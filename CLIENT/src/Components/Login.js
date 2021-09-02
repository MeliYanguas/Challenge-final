/* eslint-disable */
import React, { useState, useEffect  } from 'react';
import './styleSimple.css';

import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const location = useHistory();
  
  

  // let { username, password } = datos;

  const login = async (e) => {
    e.preventDefault();
    // console.log(username,pass)
    location.push('/')

    const dataUser = { username, pass };

    // // validacion de los datos
    if (username === '' || pass === '') {
      // eslint-disable-next-line no-alert
      alert('Revise los campos');
    } else {
      try {
        const requestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(dataUser),
          mode: 'cors',
        };
        const result = await fetch('http://localhost:4000/auth', requestInit);
        // https://webhook.site
        // result = await result.json()
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ width: '500px' }} className="route">
      <h1>LOGIN</h1>
      <form onSubmit={login}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          value={username}
          placeholder="USERNAME"
        />
        <br />
        <input
          type="pass"
          onChange={(e) => setPass(e.target.value)}
          name="pass"
          placeholder="PASSWORD"
          value={pass}
        />
        <br />
        <input
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};
export default Login;
