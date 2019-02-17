var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/angular-app/dist/angular-app' ));
mongoose.connect('mongodb://localhost/moviesDB');


var MovieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minlength: [3, "title has to be more than 3 chars"],
        required: [true, "title is required"]
       
    },
    reviews : [ {
                name: {type: String, minlength: [3, "name has to be more than 3 chars"], required: [true, "name is required"]},
                stars: { type: Number, min: [1, "rating must be between 1-5"], max: [5, "rating must be between 1-5"],required:[ true, "must enter a rating"]},
                review: {type: String,minlength: [4, "review must be more than 4 chars"],required: [true, "you must leave a review"] }
    }]
         
},{timestamps: true});
mongoose.model('Movie', MovieSchema); 
var Movie = mongoose.model('Movie')


// gets all the movies 
app.get('/movies', function(req, res){
    Movie.find({}, function(err, movies){
        if(err){} 
        else {
            res.json(movies)
        }
    })
})
// add a new movie and review
app.post('/new', function(req,res){
    const movie_inst = new Movie();
    movie_inst.title = req.body.title;
    movie_inst.reviews.push({ name: req.body.name, stars: req.body.stars, review: req.body.review })
    movie_inst.save(function(err, result){
        if(err){
            res.json({
                status: false,
                err: err
            })
        } else {
            console.log("$$$$$WE ADDED A MOVIE TO THE DB$$$$", movie_inst);
            res.json({
                status: true,
                result
            })
        }
    })
})

app.get('/movie/:id', function(req, res){
    Movie.findOne({_id: req.params.id}, function(err, results){
        if(err){
            res.json({
                status: false,
                err: err
            })
        } else {
            res.json({
                status: true,
                results
            })
        }
    })
})

app.delete('/movie/:id', function(req, res){
    Movie.remove({_id: req.params.id}, function(err, result){
        if(err){}
        else{
            console.log("@@@@ WE DELETED A MOVIE @@@", result);
            res.json(result)
        }
    })
})

app.put('/review/:id',function(req,res){
    
    Movie.findOne({_id: req.params.id}, function(err, data){
    data.reviews.push({ name: req.body.name, stars: req.body.stars, review: req.body.review })
    data.save(function(err, result){
        if(err){
            res.json({
                status: false,
                err: err
            })
        } else {
            console.log("$$$$$WE ADDED A MOVIE TO THE DB$$$$");
            res.json({
                status: true,
                result
            })
        }
    })
  
})
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})