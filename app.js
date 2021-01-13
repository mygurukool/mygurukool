const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const coursesRoutes =require('./routes/courses')
const assignmentsRoutes =require('./routes/assignments')

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'))


//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes middleware
app.use('/api', coursesRoutes)
app.use('/api', assignmentsRoutes)


const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
