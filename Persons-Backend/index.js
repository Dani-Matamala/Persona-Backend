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

<<<<<<< HEAD
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]
=======
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
>>>>>>> 25558ed7ed2f1c6b9e4760a4a840dbaa8af90e90

// Routes
app.get('/api/persons', (req, res) => {
<<<<<<< HEAD
  res.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
=======
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
>>>>>>> 25558ed7ed2f1c6b9e4760a4a840dbaa8af90e90
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
<<<<<<< HEAD

  const exitsPerson = persons.find(person => person.name === body.name)
  if (exitsPerson) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  console.log(persons)
  res.json(person)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
=======
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
>>>>>>> 25558ed7ed2f1c6b9e4760a4a840dbaa8af90e90
})
