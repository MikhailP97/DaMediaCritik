require("dotenv").config()
const express = require("express")
const app = express()
require('./config/dbConfig')
const userRoutes = require('./src/controllers/userController')

const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => console.log("Serveur ouvert sur le port 3131"))
