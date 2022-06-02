const express = require('express')
const mongoose = require('mongoose')
const Song = require('../database/models/song')

const getAllSongs = async (req, res)=>{

  const query = req.query

  const {featured, artist, name, genre , sort, fields, numericFilters} = req.query
  const queryObject ={}
  // console.log(`\n featured = ${featured}`)
  if (featured) {
    queryObject.featured = featured === 'true' ? true :false
  }
  if (artist){
    queryObject.artist = {$regex:artist, $options :'i'}
    // {$regex:name, $options :'i'} is a query from MongoDB, with options t ignore the character case

  }
  if (name){
    queryObject.name = {$regex:name, $options :'i'}
    // {$regex:name, $options :'i'} is a query from MongoDB 
  }
  if (genre){
    queryObject.genre = genre
  }


  if (numericFilters){
    console.log(`this is ${numericFilters}`)

    const operatorMap ={
      ">":"$gt",
      ">=":"$gte",
      "=":"$eq",
      "<":"$lt",
      "<=":"$lte",
    }
    const regEx = /\b(>|>=|<|<=|=)\b/g

    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)


    const options =['position','length']
    filters = filters.split(',').forEach(element => {
          const [field, operator, value] = element.split('-')
          if( options.includes(field) ){
            queryObject[field] = {[operator]:Number(value)}
          }
    });
   
 console.log(queryObject)
  
  }

  // console.log(`queryObject = ${queryObject}`)
  let result = Song.find(queryObject)

  if (sort){
    const sortList = sort.split(',').join('')
    result = result.sort(sortList)
  }

  if (fields){
    const fieldsList = fields.split(',').join('')
    result = result.select(fieldsList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1) *limit
  result = result.skip(skip).limit(limit)
  const songs = await result
  res.status(200).json({songs, nbHits:songs.length})
};
const postSong =(req, res) =>{
  const new_song = req.body
  console.log(new_song)
}

module.exports = {getAllSongs, postSong}

