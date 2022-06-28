require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/Person')

// Middleware
app.use(morgan('dev'))
app.use(express.json())


app.get('/api/persons', (req, res) => {
  
  res.json(persons)
})

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const exitsPerson = persons.find((person) => person.name === body.name);
  if (exitsPerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
