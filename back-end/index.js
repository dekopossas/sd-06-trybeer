const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Running at ${port}`));