// IMPORTING MONGOOSE
const mongoose = require("mongoose");
// CONNECTING TO MONGODB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/");

// EXPORTING THE CONNECTION
module.exports = mongoose.connection;
