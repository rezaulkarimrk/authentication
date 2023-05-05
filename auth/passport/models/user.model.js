const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true,
    },
});

const User = mongoose.model('User1', userSchema);

module.exports = User;