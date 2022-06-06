require('dotenv').config()
const express = require("express");
const app = express();
require ('express-async-errors')
const jsonHome = require("./database/home.json")


// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//
const userRouter = require('./routes/user')
const songRouter = require('./routes/songs')

//import connectDB
const connectDB = require('./database/connectDB')



//app router
app.use('/api/users', userRouter)
app.use('/api/songs', songRouter)

//Homepage
app.get('/', (req, res) => {
    res.status(200).json(jsonHome)
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



