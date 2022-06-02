require('dotenv').config()
const express = require("express");
const app = express();
require ('express-async-errors')


// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//
const userRouter = require('./routes/user')
const songRouter = require('./routes/songs')

//import connectDB
const connectDB = require('./database/connectDB')


//Homepage
//app router
app.use('/users', userRouter)
app.use('/songs', songRouter)
app.get('/', (req, res) => {
    res.send('<h1>Admin Panel</h1> ')
})


// app.use
app.use(express.json())
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



// ENV Variables
const port = process.env.PORT || 3000

//Start Server
const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        //server start
        app.listen(port)
        console.log(`App listening on port ${port}\n http://localhost:${port} `)
    } catch (err) {
        console.log(err)
    }
}

//
start().then(r => {
    console.log('App has started')
})



