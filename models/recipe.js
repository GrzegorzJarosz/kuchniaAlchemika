const mongoose = require('mongoose');

//Event Schema
const RecipeSchema = mongoose.Schema({
   title:String,
   description:String,
   category:String,
   imgUrl:String,
   ingredients:[{name:String,quantity:Number,unit:String}],
   instruction:String
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

//get RecipeSchema
module.exports.getRecipes= function(callback,limit){
  Recipe.find(callback).limit(limit);
}

//get recipe by id
module.exports.getRecipeById= function(id, callback){
  Recipe.findById(id, callback);
}

//add recipe
module.exports.addRecipe= function(recipe, callback){
  Recipe.create(recipe, callback);
}
//search recipes
module.exports.searchRecipe=function(name,callback){
   //Recipe.find({'title':name},callback);
   //Recipe.find({'title': { $regex: /name/, $options:'i'} },callback);
   Recipe.find({'title': new RegExp(name,"i") },callback);

}

module.exports.updateRecipe= function(id,recipe,options,callback){
   let query={_id:id};
   let update={
      title:recipe.title,
      description:recipe.description,
      category:recipe.category,
      imgUrl:recipe.imgUrl,
      ingredients:recipe.ingredients,
      instruction:recipe.instruction
   }
   Recipe.findOneAndUpdate(query,update,options,callback);
}
module.exports.deleteRecipe=function(id,callback){
   let query={_id:id};
   Recipe.remove(query,callback);
}
