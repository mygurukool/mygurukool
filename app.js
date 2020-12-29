const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
//import routes
const courseRoutes =require('./routes/course')

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'))


//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//routes middleware
app.use('/api', courseRoutes)

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
