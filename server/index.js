const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const port = 8000
const MONGO_URI = 'mongodb://localhost:27017/mydatabase'

mongoose.connect(MONGO_URI)
        .then(() => console.log("connected to database"))
        .catch(err => console.error(err))

const bisectionSchema = new mongoose.Schema({
  equation: String,
  xl: String,
  xr: String,
  error: String
})

const bisectionModel = mongoose.model('bisection', bisectionSchema)

app.get('/bisection', async (req, res) => {
  const bisectionData = await bisectionModel.find()
  res.json(bisectionData)
})

app.listen(port, () => {
  console.log(`running at http://localhost:${port}/bisection`)
})