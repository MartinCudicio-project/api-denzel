const express = require('express');

const router = express.Router();
const imbd = require('../imdb')
const Movies = require('../models/modelMovies');
const DENZEL_IMDB_ID = 'nm0000243';


// -------------------------------------------------------------------
// get method 
// -------------------------------------------------------------------

//get back all the movies
router.get('/',async(req,res)=>{
    try{
        const post = await Movies.find()
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});

// fetch a film by id
router.get('/fetch/:id',async(req,res)=>{
    try{
        const post = await Movies.findOne({id: req.params.id})
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
});

// method to reset the collection movies and load a new one from imbd
router.get('/refreshDB',async(req,res)=>{
    try{
        // we start by delete all documents in the collection movies
        await Movies.deleteMany()
        
        // with imbd we scrap our list of movies with denzel
        const movies = await imbd(DENZEL_IMDB_ID);
        
        // after we insert our list of movies
        const post = await Movies.insertMany(movies);
        res.send(post);
    }catch(err){
        res.json({message:err});
    }
});

//get a must-watch movie
router.get('/must-watch',async(req,res)=>{
    try{
        const mustWatch = await Movies.find({metascore : {"$gt" : 70}})

        res.json(mustWatch[Math.floor(Math.random() * mustWatch.length)]);
    }catch(err){
        res.json({message:err});
    }
});


// -------------------------------------------------------------------
// post method 
// -------------------------------------------------------------------

// search a movie with filters {date, meta, rate, limit } default {5,0}
router.post('/search',async(req,res)=>{
    // console.log(req.body)

    try{
        let {date, meta,rate} = req.body
        let metascore = req.body.metascore
        // if not define req.body we set all params by default
        if(!meta){ 
            meta.from = 0
            meta.to = 100}
           
        if(!date){
            date.from=1960
            date.to=2030}

        if(!rate){
            rate.from=0
            rate.to=10}

        const movies = await Movies.find({
            "year" : {"$gt" : date.from-1, "$lt" : date.to+1},
            "metascore" : {"$gt" : meta.from-1, "$lt" : meta.to+1},
            "rating" : {"$gt" : rate.from-1, "$lt" : rate.to+1}
        })
        res.json(movies);
    }catch(err){
        res.json({message:err});
    }
});

// fetch a film by id
router.post('/review',async(req,res)=>{
    try{
        const movies = await Movies.findOneAndUpdate({
            "id" : req.body.id,
        },
        {
            "$push" : {
                review : {
                    pseudo : req.body.pseudo,
                    comment :req.body.text,
                    score : Number(req.body.score),
                    date : new Date()
                }
            }
        }
        )
        res.json(movies);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router