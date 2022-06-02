const express = require('express')
const router = express.Router()
const {getAllUsers, getAllUsersStatic} = require('../controller/user')

router.route('/').get(getAllUsers)

router.route('/static').get(getAllUsersStatic)


module.exports = router;
