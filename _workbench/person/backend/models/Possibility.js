const mongoose = require('mongoose')

const possibilitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: false,
  },
  required: {
    type: Array,
    required: false,
  }
})

const Possibility = mongoose.model('Possibility', possibilitySchema)

module.exports = Possibility