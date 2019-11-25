const mongoose = require('mongoose')

const possibilitySchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  home: {
    type: String,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  }
})

const Person = mongoose.model('Person', possibilitySchema)

module.exports = Person