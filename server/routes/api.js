const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const api = require('api')

app.use('api', api)

module.exports = router