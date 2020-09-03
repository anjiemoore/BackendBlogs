// Including packages
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const expdbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

// Database connection
connectDB();

const app = express()

// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars extension name
app.engine('.hbs', expdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Linking routes file
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )