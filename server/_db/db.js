const mongoose = require('mongoose');
const colors = require('colors');
const mongoURI = process.env.MONGO_URI;
const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;


const connectDB = async () => {
    const options = {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    };
    const conn = await mongoose.connect(mongoURI, options);
    console.log(` MongoDB Connected to ${conn.connection.host} `.black.bgBrightGreen+` ... 🌿\n`);
}


module.exports = connectDB;


