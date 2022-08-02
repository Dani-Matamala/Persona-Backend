const { Schema, model } = require('mongoose')

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 4,
    require: true
  },
  telephone: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{4,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

const Person = model('Person', personSchema)

module.exports = Person
