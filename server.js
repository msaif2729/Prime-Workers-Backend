const connectToMongoDb = require('./db')
const app = require('./config/app');
const {API_PORT} = require('./config/config');

connectToMongoDb();

app.listen(API_PORT,()=>{
    console.log(`App Listening On Port : ${API_PORT}`)
})