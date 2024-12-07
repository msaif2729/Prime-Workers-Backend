const express = require('express');
const cors = require('cors');
const dataRouter = require("../routes/dataRouter");

const app = express();

app.use(express.json());
app.use(cors({
//     origin:['http://localhost:3000'],
//     method : ['GET','POST','PUT','DELETE']
}));

app.use('/api/data',dataRouter);


module.exports = app;