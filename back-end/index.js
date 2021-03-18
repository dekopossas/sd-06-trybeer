const express = require('express');
const cors = require('cors');

const LoginController = require('./src/controller/LoginControler');
const UsersController = require('./src/controller/UsersController');
const ProfileController = require('./src/controller/ProfileController');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use('/login', LoginController);

app.use('/register', UsersController);

app.use('/profile', ProfileController);

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json(err.message);
});

app.listen(PORT, console.log(`Experando Requisições na porta ${PORT}`));
