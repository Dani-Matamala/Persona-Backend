const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
  })

// process.on('uncaughtException', () => {
//   mongoose.connection.disconnect()
// })
