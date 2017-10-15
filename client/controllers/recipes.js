(function(){
   'use strict';

var myApp = angular.module('myApp');

myApp.controller('RecipesController',['$scope', '$http', '$location', '$routeParams','$mdDialog',function( $scope, $http, $location, $routeParams, $mdDialog){

//show dodmenu
$scope.showMeAdMenu=true;

$scope.showme=function(scope){
$scope.showMeAdMenu=!$scope.showMeAdMenu;
}

//
$scope.showConfirm = function(ev, nn) {

    var confirm = $mdDialog.confirm()
          .title('Czy na pewno chcesz usunąć ten przepis?')
          .textContent('tej czynności nie będzie można cofnąc!')
          .ariaLabel('costamy')
          .targetEvent(ev)
          .ok('Usuń')
          .cancel('Anuluj');
    $mdDialog.show(confirm).then(function() {
      $scope.removeRecipe(nn);
      window.location.href='#!/recipes';
   },function(){
      console.log('niet');
   });
 };



//get recipes
   $scope.getRecipes= function(){
      $http.get('/api/recipes').then(function(response){
         $scope.recipes =response.data;
      });
   }
//get one recipe
   $scope.getRecipe= function(){
      var id= $routeParams._id;
      $http.get('/api/recipes/'+id).then(function(response){
         $scope.recipe =response.data;
      });
   }

// search
   $scope.searchRecipe=function(){
      var query=$scope.searchQuery;
      $http.get('/api/search/?name='+query).then(function(response){
         $scope.showSearched=false;
         $scope.recipes=response.data;
         $scope.ile=$scope.recipes.length;
      });
   }

//adding buttons on click
   $scope.count = 0;

// update recipes

   var ingrPrototype = {
     name: null,
     quantity: null,
     unit:null
   };

//add new area in ingred / edit
   $scope.addNext=function(idx){
      var no=$scope.recipe.ingredients.length+1;
      if ($scope.recipe.ingredients.length > 1) {
            $scope.recipe.ingredients.splice(no, 0, angular.copy(ingrPrototype));
        } else {
            $scope.recipe.ingredients.push(ingrPrototype);
        }
   }

//update
   $scope.updateRecipe=function(){
      var ingrArr=$scope.recipe.ingredients;
      var aa=$scope.recipe.ingredients.length;
      var bb=$scope.count2+$scope.recipe.ingredients.length;

      var newRec=$scope.recipe;

      var REC = JSON.stringify(newRec);
      var id= $routeParams._id;
      $http.put('/api/recipes/'+id, REC ).then(function(response){});

      //redirect to recipe list
      window.location.href='#!/recipes/details/'+$scope.recipe._id;
   }

//remove recipe
   $scope.removeRecipe=function(id){
      $http.delete('/api/recipes/'+id,).then(function(response){
         window.location.href='#!/recipes';
      });
   }

//add recipe
   $scope.addRecipe= function(){

      var ingrArr=[];
      for(var i=0; i<=$scope.count; i++){
         ingrArr.push($scope.recipe.ingredients[i]);
      }
      var newRec={
         title:$scope.recipe.title,
         description:$scope.recipe.description,
         category:$scope.recipe.category,
         imgUrl:$scope.recipe.imgUrl,
         instruction:$scope.recipe.instruction,
         ingredients:ingrArr
      }

      var REC = JSON.stringify(newRec);
      $http.post('/api/recipes',REC ).then(function(response){
      });

      //reset form after send
      $scope.recipe={};
      $scope.myForm.$setPristine();

      //redirect to recipe list
      window.location.href='#!/recipes';
   }

   $scope.back = function () {
    window.history.back();
  }

}]);// ./myApp controller



})(); //self

   //Directive for adding buttons on click -- add
myApp.directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.count++;
			angular.element(document.getElementById('add-area'))
         .append($compile(
            //"<div class=\"myMargin\"  layout-xs=\"column\" ><label >skladnik "+(scope.count+1)+" </label><input flex-xs type=\"text\" placeholder=\"name\" ng-model=\"recipe.ingredients["+scope.count+"].name\"><input flex-xs type=\"number\" placeholder=\"quantity\" ng-model=\"recipe.ingredients["+scope.count+"].quantity\"><select flex-xs ng-model=\"recipe.ingredients["+scope.count+"].unit\"><option value=\"g\">g</option><option value=\"kg\">kg</option><option value=\"ml\">ml</option><option value=\"l\">l</option><option value=\"łyż\">łyż</option><option value=\"Łyż\">Łyż</option><option value=\"szkl\">szkl</option><option value=\"szt\">szt</option></select></div>")(scope));

            "<div layout=\"column\" layout-gt-xs=\"row\"><md-input-container class=\"md-block\" flex=\"64\" flex-gt-xs=\"60\"><label>Nazwa składnika "+(scope.count+1)+"</label><input type=\"text\" ng-model=\"recipe.ingredients["+scope.count+"].name\" required></md-input-container><md-input-container class=\"md-block\" flex=\"18\" flex-gt-xs=\"20\"><label>Ilość</label><input type=\"number\" ng-model=\"recipe.ingredients["+scope.count+"].quantity\" required></md-input-container><md-input-container class=\"md-block\" flex=\"18\" flex-gt-xs=\"20\"><label>Jednostka</label><md-select ng-model=\"recipe.ingredients["+scope.count+"].unit\" required><md-option value=\"g\">g</md-option><md-option value=\"kg\">kg</md-option><md-option value=\"ml\">ml</md-option><md-option value=\"l\">l</md-option><md-option value=\"łyż\">łyż</md-option><md-option value=\"Łyż\">Łyż</md-option><md-option value=\"szkl\">szkl</md-option><md-option value=\"szt\">szt</md-option><md-option value=\"opak\">opak</md-option></md-select></md-input-container></div>")(scope));

		});
	};
});
