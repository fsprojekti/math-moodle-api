const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const circuitRoutes = require('./api/routes/circuit');
app.use('/circuit', circuitRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));






