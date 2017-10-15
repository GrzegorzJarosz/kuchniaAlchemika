var myApp = angular.module("myApp", ["ngRoute", "ngMaterial"]);

myApp.config(function($routeProvider/* , $locationProvider*/,$mdIconProvider) {
   //$locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    controller:'RecipesController',
    templateUrl : "views/main.html"
  })
  .when('/about', {
    controller:'RecipesController',
    templateUrl : "views/about.html"
  })
  .when('/recipes', {
    controller:'RecipesController',
    templateUrl : "views/recipes.html"
  })
  .when('/recipes/details/:_id', {
    controller:'RecipesController',
    templateUrl : "views/recipe_detail.html"
  })
  .when('/recipes/add', {
    controller:'RecipesController',
    templateUrl : "views/add_recipe.html"
  })
   .when('/recipes/edit/:_id', {
      controller:'RecipesController',
      templateUrl : "views/edit_recipe.html"
   })
   .otherwise({
      redirectTo:'/'
   })

   //icons provider
   $mdIconProvider
    .defaultIconSet('svg/mdi.svg')


});
