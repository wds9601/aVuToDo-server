// Require needed packages
require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt') //enables accessing user data in token through user.body (like Passport did in sequelize)
let morgan = require('morgan') //logs route that was accessed in browser in console
let rowdyLogger = require('rowdy-logger') //creates table of methods and routes in console

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev')) //middel-ware bc continuously tracks route calls
app.use(cors())
app.use(express.urlencoded({ extended: false})) //Accept form data
app.use(express.json()) //Accept data from fetch (or any AJAX call)

// Routes
app.use('/auth', expressJwt({ 
  secret: process.env.JWT_SECRET
}).unless({  // w/o 'unless' function, the expressJWT would prevent public access to all routes in controller
  path: [
    {url: '/auth/login', methods: ['POST'] },
    {url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'))


app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
