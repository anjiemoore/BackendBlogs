// Including packages
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const expdbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

// Database connection
connectDB();

const app = express()

// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, truncate, stripTags, } = require('./helpers/hbhelpers')

// Handlebars extension name
app.engine(
    '.hbs', 
    expdbs({ 
    helpers: {formatDate, truncate, stripTags,}, 
    defaultLayout: 'main', 
    extname: '.hbs' 
    })
)
app.set('view engine', '.hbs')

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Linking routes file
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/entries', require('./routes/entries'))


const PORT = process.env.PORT || 3000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )