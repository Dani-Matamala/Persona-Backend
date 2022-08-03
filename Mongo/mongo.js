const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://91Daniel-dev:${password}@cluster0.52e2spk.mongodb.net/?retryWrites=true&w=majority`


const personSchema = new mongoose.Schema({
  name: String,
  telephone: String
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const name = process.argv[3]
const telephone = process.argv[4]

const person = new Person({
  name: name,
  telephone: telephone
})


// console.log(person)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
  })
  .catch((err) => console.log(err))

  if(person.name){
    person.save()
    .then(
      console.log(`added ${person.name} number ${person.telephone} to phonebook`)
      )
    }

  Person.find({})
  .then(notes => {
    console.log(notes.map(person => {
      return JSON.stringify(person)
    }).join('\n'))
    mongoose.connection.close()
  })