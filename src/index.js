const express = require('express');
const routes = require('./routes');
const cors = require('./middlewares/cors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);

app.listen(3001, () => console.log('🔥 Server started at: http://localhost:3001 '));