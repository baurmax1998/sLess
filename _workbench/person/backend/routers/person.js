const express = require('express')
const Person = require('../models/Person')

const router = express.Router()

router.post('/persons', async (req, res) => {
  // Create a new person
  try {
    const person = new Person(req.body)
    await person.save()
    res.status(201).send(person)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/persons', async (req, res) => {
  Person.find({}, function (err, persons) {
    res.send(persons);
  });
})

module.exports = router