const express = require('express')
const Commitment = require('../models/Commitment')

const router = express.Router()

router.post('/commitments', async (req, res) => {
  // Create a new possibility
  try {
    const commitment = new Commitment(req.body)
    await commitment.save()
    res.status(201).send(commitment)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/commitments', async (req, res) => {
  Commitment.find({}, function (err, commitments) {
    res.send(commitments);
  });
})

module.exports = router