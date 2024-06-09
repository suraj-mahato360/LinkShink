const mongoose = require('mongoose')

const connectDB = async (url) => {
        const conn = await mongoose.connect(url);
}

module.exports = connectDB;
