const { default: mongoose } = require('mongoose')


const songSchema = new mongoose.Schema({

    name:String,
    album:String,
    position:Number,
    artist:String,
    featured:Boolean,
    artwork:String,
    release_date:Date,

    genre: {
        type: String,
        enum : ['HipHop','Rap','RnB','Pop','Rock','Metal','Lofi','Electronic','Unknown'],
        default: 'Unknown',
    },
    date_created:{type:Date,default:Date.now()},
})

module.exports = mongoose.model('Song_Schema',songSchema)