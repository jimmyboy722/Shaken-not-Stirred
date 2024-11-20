// IMPORTING MONGOOSE
const mongoose = require("mongoose");
// CONNECTING TO MONGODB
mongoose.connect(process.env.MONGODB_URI);

// EXPORTING THE CONNECTION
module.exports = mongoose.connection;
