
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        trim: true
      },
      confirmedPassword: {
        type: String,
        required: true,
        trim: true,
      },
});
const userModel = mongoose.model("User",userSchema)
module.exports = userModel