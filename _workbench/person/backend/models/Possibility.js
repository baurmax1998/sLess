const mongoose = require('mongoose')
const validator = require('validator')

const possibilitySchema = mongoose.Schema({
  who: {
    type: String,
    required: true,
    trim: true
  },
  begin: {
    type: Date,
    required: true,
    trim: true
  },
  end: {
    type: Date,
    required: true,
    trim: true
  },
  what: {
    type: String,
    required: true,
    trim: true
  },
  fromGroup: {
    type: String,
    required: true,
    trim: true
  },
  fromModule: {
    type: String,
    required: true,
    trim: true
  }
})

const Possibility = mongoose.model('Possibility', possibilitySchema)

module.exports = Possibility