const express =require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./api/router');
//require('dotenv').config();

// getting PORT
console.log(process.env);
const port = process.env.PORT || 2306;

// set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

// Get index app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// setup Router
app.use('/api', router);
app.listen(port, () => console.log(`App running on port ${port}`));