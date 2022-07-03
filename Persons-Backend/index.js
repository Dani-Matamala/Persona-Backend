require('dotenv').config()
require('./mongo')
const cors = require('cors')
const express = require('express')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()
const morgan = require('morgan')
const Person = require('./models/Person')

// Middleware

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.get('/api/persons', (req, res) => {
  console.log('entro')
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.telephone) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  Person.findOne({
    name: body.name,
    telephone: body.telephone
  }).then(exist => {
    console.log(exist)
    if (exist) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    console.log(body)

    const person = new Person({
      name: req.body.name,
      telephone: req.body.telephone
    })
    console.log(person)
    person.save()
      .then(savedPerson => {
        res.json(savedPerson)
        // mongoose.connection.close()
      }).catch(error => {
        console.log(error)
        res.status(500).json({ error: error.message })
      })
  })
})

// Middlewares Errors
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
