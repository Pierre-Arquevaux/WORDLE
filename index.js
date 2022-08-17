
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 3000;
const router = require('./src/router');
const cors = require("cors");

const app = express();

app.use(cors())

app.use(express.static('./public'));

app.use(router);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

