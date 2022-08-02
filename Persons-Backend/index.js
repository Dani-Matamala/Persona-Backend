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
    }).catch(error => {
      console.log(error)
      res.status(500).end()
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
  res.status(204).end()
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.telephone) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  const newPerson = new Person({
    name: body.name,
    telephone: body.telephone
  })

  newPerson.save()
    .then(savedNote => {
      res.json(savedNote)
    }
    ).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const person = req.body

  console.log(person)

  const newPersonInfo = {
    name: person.name,
    telephone: person.telephone
  }

  Person.findByIdAndUpdate(id, newPersonInfo, { new: true })
    .then((result) => {
      return res.json(result)
    })
    .catch(error => next(error))
})

// Middlewares Errors
app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
