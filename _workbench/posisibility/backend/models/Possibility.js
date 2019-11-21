const mongoose = require('mongoose')
const validator = require('validator')

const possibilitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  rules: {
    type: Object,
    required: false
  }
})

const Possibility = mongoose.model('Possibility', possibilitySchema)

module.exports = Possibility