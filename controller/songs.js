const express = require('express')
const mongoose = require('mongoose');
const song = require('../database/models/song');
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
    // console.log(`this is ${numericFilters}`)

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
   
//  console.log(queryObject)
  
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


const updateSong = async (req, res)=>{

  // console.log(req.query)
  // console.log(req.body)

  const {song_id,song_featured, song_artist, song_name, song_genre, song_album} = req.body
  const bodyObject ={}

  if (song_id){
    bodyObject.song_id = song_id
  }
  if (song_artist){
  bodyObject.song_artist = song_artist
  // console.log(bodyObject)
  }
  if (song_name){
    bodyObject.song_name= song_name
  }

  if( song_featured){
    bodyObject.song_featured = song_featured === 'true'? true: false
  }
  if (song_genre){
    bodyObject.song_genre = song_genre
  }

  if (song_album){
    bodyObject.song_album = song_album
  }

  // console.log(bodyObject)
  // console.log(Song.findById(song_id))
  const song = Song.findById(song_id)
  // song.name = song_name
  
  const jsonSong = JSON.stringify({song})

  // console.log(jsonSong)
  res.json(song)
}

module.exports = {getAllSongs, updateSong}

