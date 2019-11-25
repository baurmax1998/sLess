const express = require('express')
const port = process.env.PORT
const posibilityRouter = require('./routers/possibility')
var cors = require("cors");
require('./db/db')

const app = express()

app.use(cors());
app.use(express.json())
app.use(posibilityRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})