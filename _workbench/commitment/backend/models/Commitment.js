const mongoose = require('mongoose')

const commitmentSchema = mongoose.Schema({
  what: {
    type: String,
    required: true,
  },
  who: {
    type: String,
    required: true,
  },
  base: {
    type: String,
    required: false,
  },
  of: {
    type: String,
    required: false,
  },
  begin: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
})

const Commitment = mongoose.model('Commitment', commitmentSchema)

module.exports = Commitment