require('dotenv').config()
const { default: mongoose } = require('mongoose')
// const { system } = require('nodemon/lib/config')




const connectDB = require('./database/connectDB')
const Users = require('./database/models/user')
const Songs = require('./database/models/song')

const jsonUsers = require('./database/users.json')
const jsonSongs = require('./database/songs.json')
// console.log(process.env.MONGO_URI)s

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
      
        await Users.deleteMany()
        await Users.create(jsonUsers)

        await Songs.deleteMany()
        await Songs.create(jsonSongs)
       

        console.log('Data Populated')
        process.exit(0)
        
    
    } catch (err) {
        console.log(err)
        process.exit(0)


    }
}

start()