const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'The email is required']
  },
  password: {
    type: String,
    required: [true, 'the password is required'],
    minlength: [3, 'The password is to short'],
  },
  username: {
    type: String,
    required: [true, 'The username is required'],
    minlength: [3, 'The username is to short']
  },
  firstName: {
    type: String,
    required: [true, 'The first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'The last name is required'],
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://i.pinimg.com/originals/28/27/14/28271469c61ef49046f85e299bb5de9e.jpg'
  },
  role: {
    type: String,
    enum: ['ADMIN', 'BROKER', 'USER'],
    default: 'USER'
  }
})
userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})
userSchema.methods.signToken = function () {
  const { _id, email, username, role } = this
  const payload = { _id, email, role, username }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}
userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

module.exports = model("User", userSchema)