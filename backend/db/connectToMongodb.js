const mongoose = require('mongoose');

const mongodbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Connected to mongodb');
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

module.exports = mongodbConnect;