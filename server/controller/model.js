const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.SECRETKEYJWT

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token:{
    type: String,
    required: true
  },
  pin:{
    type: String
  },
  verify:{
    type:Boolean,
    default:false
  }
});

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = bcrypt.hash(this.password, 12);

//   }
//   console.log("This is inside!")
//   next();
// });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
})

// We are generatig token

generateAuthToken = async function() {
  try {
    let newtoken = jwt.sign({ _id: this._id }, secret_key);
    this.token = newtoken;
    await this.save();
    return newtoken;
  } catch (err) {
    console.log(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;