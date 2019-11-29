const express = require('express')
const port = process.env.PORT
const commitmentRouter = require('./routers/commitment')
var cors = require("cors");
require('./db/db')

const app = express()

app.use(cors());
app.use(express.json())
app.use(commitmentRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})