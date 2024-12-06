const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT || 5002;
app.use(express.json())
app.use('/api', require('./products/router'))

mongoose.connect(process.env.MONGO_URI)
    .then((data) => app.listen(port,'0.0.0.0', () => console.log(`DB Connected Successfully , App listening on http://0.0.0.0:${port}`)))
    .catch((err) => console.log(err))




