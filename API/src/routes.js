/* eslint-disable*/

const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('express-myconnection');
const key = require('../key');

// muestra los usuarios (para probar)
router.get('/users', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT username,pass,role FROM users', (err, rows) => {
      if (err) return res.status(500).send(err);

      res.json(rows);
    });
  });
});

// crear un usuario
router.post('/users', async (req, res) => {
  const { username } = req.body;
  const { pass } = req.body;
  const { role } = req.body;

  const hashedPassword = await bcrypt.hash(pass, 8);
  req.getConnection((err, connection) => {
    if (err) res.send(err);

    connection.query('INSERT INTO users SET ?', { username, pass: hashedPassword, role }, async (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send('usuario agregado');
      }
    });
  });
});

// authentication
router.post('/auth' ,async (req, res) => {
  const { username } = req.body;
  const { pass } = req.body;
  const hashedPassword = await bcrypt.hash(pass, 10);

  if (username && pass) {
    req.getConnection((err, connection) => {
      if (err) res.status(501).send(err);

      connection.query('SELECT username,pass,role FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.lenth === 0 || !(await bcrypt.compare(pass, results[0].pass))) {
          res.status(401).send('usuario o password incorrectos');
        } else {
          // res.send('login correcto');
          const token = jwt.sign({ username }, key.secret, { expiresIn: '1d' });
          res.status(201).json({ msg: 'AUTENTICACION EXITOSA', token });
          
        }
      });
    });
  } else {
    res.status(401).send('los campos no pueden estar vacios');
  }
});



// ---------------
router.post('/favs', verifyToken, (req, res) => {
  jwt.verify(req.token, key.secret, (err, authData) => {
    if(err){
      res.sendStatus(403);
    } else{
      res.json({
        msg: 'agregado a favoritos....',
        authData
      });
    }
  })
  
});

// ---endpoint admin----
router.put('/movies/:id', (req, res) => {
  const {
    title, description, year, URL_image,
  } = req.body;
  if (!(title && description && year && URL_image)) {
    return res.status(400).send('fields cannot be empty');
  }
  req.getConnection((err, connection) => {
    if (err) return res.send(err);
    connection.query('UPDATE movies_list set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('data updated');
    });
  });
});

router.post('/movies', (req, res) => {
  const {
    title, description, year, URL_image,
  } = req.body;
  if (!(title && description && year && URL_image)) {
    return res.status(400).send('fields cannot be empty');
  }
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);
    connection.query('INSERT INTO movies_list set ?', [req.body], (err, rows) => {
      if (err) return res.status(500).send(err);

      res.send('movie added to the list');
    });
  });
});

// format of token
// authorization: Bearer <access_token>

// verify token
function verifyToken  (req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization']; 
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

// ---------------
router.get('/movies', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT id,title,description,year,URL_image FROM movies_list', (err, rows) => {
      if (err) return res.status(500).send(err);

      res.json(rows);
    });
  });
});

module.exports = router;
