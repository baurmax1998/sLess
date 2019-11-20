const express = require('express')
const Possibility = require('../models/Possibility')

const router = express.Router()

router.post('/possibilitys', async (req, res) => {
    // Create a new possibility
    try {
        const possibility = new Possibility(req.body)
        await possibility.save()
        const token = await possibility.generateAuthToken()
        res.status(201).send({ possibility, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/possibilitys/me', async(req, res) => {
    // View logged in possibility profile
    res.send(req.possibility)
})

module.exports = router