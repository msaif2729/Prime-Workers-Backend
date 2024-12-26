const express = require('express');
const cors = require('cors');
const dataRouter = require("../routes/dataRouter");
const eamilRouter = require('../routes/emailRouter');

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['https://primeworkers.in','http://localhost:3000', 'https://prime-workers.vercel.app'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies if needed
}));

app.options('*', cors()); // Handle preflight requests


app.get('/', (req, res) => {
    res.send('API is working!');
});

app.use('/api/data',dataRouter);
app.use('/api/sendemail',eamilRouter);

module.exports = app;