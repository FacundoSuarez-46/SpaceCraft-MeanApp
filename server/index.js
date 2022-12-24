const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const { default: mongoose } = require('./db.js');
var spacecraftController = require('./controllers/spacecraftController.js');
var typeController = require('./controllers/typeController.js');
var gasController = require('./controllers/gasController.js');


const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(port, () => console.log(`SpaceCraft app listening on port ${port}!`));

app.use('/spacecraft', spacecraftController);
app.use('/type', typeController);
app.use('/gas', gasController);

