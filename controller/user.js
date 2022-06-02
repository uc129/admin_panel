const express = require('express')
const User = require('../database/models/user')


const getAllUsersStatic = async (req, res) => {

    // const query = req.query
    
    User.find({},function (err, docs){
        if (err) res.send(err)
        res.send(JSON.parse(JSON.stringify(docs)))
      });

   
}


const getAllUsers = async (req, res) => {

    console.log(req.query)
    res.status(200).json({
        msg: 'User Route'
    })
}



module.exports = {
    getAllUsers,
    getAllUsersStatic
}



