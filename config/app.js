const express = require('express');
const cors = require('cors');
const dataRouter = require("../routes/dataRouter");
const eamilRouter = require('../routes/emailRouter');

const app = express();

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000','https://prime-workers.vercel.app'],
    method : ['GET','POST','PUT','DELETE']
}));

app.options('*', cors());

app.get('/', (req, res) => {
    res.send('API is working!');
});

app.use('/api/data',dataRouter);
app.use('/api/sendemail',eamilRouter);

module.exports = app;