const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');

// DB Setup
mongoose.connect('mongodb://localhost/cards')

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

authRoutes(app);
cardRoutes(app);

app.use((err, req, res, next) => {
	res.status(422).send({ error: err._message });
});

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);