const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed");
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;