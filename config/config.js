require('dotenv').config();

const API_PORT = process.env.API_PORT;
const MONGO_URL = process.env.MONGO_URL;

module.exports={
    API_PORT,
    MONGO_URL
}