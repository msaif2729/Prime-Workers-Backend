const mongoose = require('mongoose');
const {MONGO_URL} = require('./config/config');


const connectToMongoDb = ()=>{
    mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log("Connected To MongoDB");
    })
    .catch((err)=>{
        console.log(`Error Occcured : ${err.message}`);
    });
}

module.exports = connectToMongoDb;