const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes');

// DB Setup
mongoose.connect('mongodb://localhost/cards')

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
authRoutes(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);