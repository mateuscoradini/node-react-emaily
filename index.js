const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
/* Routes */
require("./routes/authRoutes")(app);
/* Models */
require("./models/User");
/* Services */
require("./services/passport");

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(keys.mongoURI, option).then(function(){
    console.log('success');
}, function(err) {
    console.log(err);
});




const PORT = process.env.PORT || 5000;
app.listen(PORT);
