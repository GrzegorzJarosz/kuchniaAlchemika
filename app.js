const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

const config = require('./config/database');

const Recipe= require('./models/recipe');

//*******************************db connection****************************
//connect to db
mongoose.connect(config.database,
{useMongoClient: true}
);

//on connection
mongoose.connection.on('connected',()=>{
  console.log('connected to database '+config.database);
});

//on error
mongoose.connection.on('error',(err)=>{
  console.log('database erro '+err);
});
//************************************************************************

const app = express();

//port number
const port = 45454;

//cors
app.use(cors());

//body-parser
app.use(bodyParser.json());

//static
app.use(express.static(__dirname+'/client'));

//index route
app.get('/', (req,res)=>{
  res.send('invalid endpoint, use api/recipes');
});

//get recipes list
app.get('/api/recipes', (req,res)=>{
   Recipe.getRecipes((err,recipes)=>{
      if(err){
         throw err;
      }
      res.json(recipes);
   });
});

//get recipe by Id
app.get('/api/recipes/:_id', (req,res)=>{
   Recipe.getRecipeById(req.params._id, (err,recipe)=>{
      if(err){
         console.log('błąd');
         console.log(err);
         throw err;
      }
      res.json(recipe);
   });
});


//search recipes
app.get('/api/search', (req,res)=>{
   Recipe.searchRecipe(req.query.name, (err,recipes)=>{
      if(err){
         console.log('błąd');
         console.log(err);
         throw err;
      }
      res.json(recipes);
      console.log(req.query.name);
   });
});

//add recipe
app.post('/api/recipes',(req,res)=>{
   let recipe=req.body;
   Recipe.addRecipe(recipe, (err,recipe)=>{
      if(err){
         console.log('błąd przy zapisie');
         console.log(err);
         throw err;
      }
      res.json(recipe);
      console.log(recipe);
   });
});

//update recipe
   app.put('/api/recipes/:_id',function(req,res){
      let id=req.params._id;
      let recipe= req.body;
      Recipe.updateRecipe(id, recipe, {},function(err,recipe){
         if(err){
            throw err;
            console.log(err);
         }
         res.json(recipe);
      });
   });

   //delete recipe
   app.delete('/api/recipes/:_id', function(req,res){
      let id= req.params._id;
      Recipe.deleteRecipe(id,function(err,recipe){
         if(err){
            throw err;
         }
         res.json(recipe);
      });
   });

/*
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});
*/

//start server
app.listen(port, ()=>{
  console.log('server started on port '+port);
});
