const express = require('express')
const router = express.Router()
const {getAllSongs, postSong} = require('../controller/songs')

// const postSong = require()

router.route('/').get(getAllSongs)

router.route('/').post(postSong)

module.exports = router