const express = require('express')
const Possibility = require('../models/Possibility')

const router = express.Router()

router.post('/possibilitys', async (req, res) => {
  // Create a new possibility
  try {
    const possibility = new Possibility(req.body)
    await possibility.save()
    res.status(201).send(possibility)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/possibilitys', async (req, res) => {
  Possibility.find({}, function (err, possibilitys) {
    res.send(possibilitys);
  });
})

module.exports = router