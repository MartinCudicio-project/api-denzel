const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    link : {
        type : String,
        required : false
    },
    id: {
        type : String,
        required : false
    },
    metascore: {
        type : Number,
        required : false
    },
    poster: {
        type : String,
        required : true,
        default : "https://www.iom.int/sites/default/files/gmff/logo_simple.png"
    },
    rating: {
        type : Number,
        required : false
    },
    synopsis: {
        type : String,
        required : false,
    },
    title: {
        type : String,
        required : false,
    },
    votes: {
        type : Number,
        required : false,
    },
    year: {
        type : Number,
        required : false,
    },
    review : [{
        pseudo : {
            type: String,
            required :false
        },
        comment :{
            type: String,
            required: false
        },
        score :{
            type:Number,
            required:false
        },
        date :{
            type:Date,
            required:false
        }
    }]
})



const Movies = mongoose.model('movies',PostSchema);
module.exports = Movies;