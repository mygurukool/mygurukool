const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
var bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const coursesRoutes =require('./routes/courses')
const assignmentsRoutes =require('./routes/assignments')
const authRoutes =require('./routes/user')

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'))

//enable form data access
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes middleware
app.use('/api', coursesRoutes)
app.use('/api', assignmentsRoutes)
app.use('/api', authRoutes)


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
