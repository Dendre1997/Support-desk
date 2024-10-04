const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config() //For using evironment variables
const errorHandler = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to database

connectDb()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the support desk api"})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


// Serve Frontend
// Check if we in production
if (process.env.NODE_ENV === 'production') {
    // set build folder as static /static path 
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    // This route handler catches all GET requests and sends the index.html file from the build directory.
// It is typically used in a single-page application (SPA) to ensure that all routes are handled by the frontend.
// __dirname refers to the directory of the current module, and the path is constructed to point to the index.html file.
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    res.status(200).json({message: "Welcome to the support desk api"})
}
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server started on port  ${PORT}`)
})