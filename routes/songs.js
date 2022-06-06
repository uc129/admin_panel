const express = require('express')
const router = express.Router()
const {getAllSongs, updateSong} = require('../controller/songs')

// const postSong = require()

router.route('/').get(getAllSongs)

router.route('/').post(updateSong)

module.exports = router