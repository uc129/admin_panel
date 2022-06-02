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

    const {name, numericFilters, location,isMember,company} = req.query
    const queryObject={}
    console.log(req.query)
    // console.log(users)

    if (isMember){
        queryObject.isMember = isMember === 'true'? true :false
    }

    if (name){
        queryObject.name = {$regex:name, $options :'i'}
    }
    if (location){
        queryObject.location = {$regex:location, $options:'i'}
    }
    if (company){
        queryObject.company = {$regex:company, $options:'i'}
    }

    if(numericFilters){
        const options =['age', 'dob', ]

        const operatorMap ={
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
          }

          const regEx = /\b(>|>=|<|<=|=)\b/g

          let filter = numericFilters.replace(regEx,(match)=>
                `-${operatorMap[match]}-`  
          )

          filter = filter.split(',').forEach(element => {
              const[field, operator, value]=element.split('-');
              if (options.includes(field)){

                queryObject[field]={[operator]:Number(value)}

              }
          });

        //   console.log(filter)

        console.log(queryObject)

          



    }




    
    




    const users = await User.find(queryObject)
    res.status(200).json({users, nbHits:users.length})
    // res.send(operatorMap)



}



module.exports = {
    getAllUsers,
    getAllUsersStatic
}



