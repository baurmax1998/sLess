const express = require('express')
const port = process.env.PORT
const posibilityRouter = require('./routers/possibility')
require('./db/db')

const app = express()

app.use(express.json())
app.use(posibilityRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})