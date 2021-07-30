var dog,sadDog,happyDog
var database;
var foodS,foodStock;
var addFood;
var foodObj, currentTime;
var gameState = "Hungry";
var BedRoomIMG, GardenIMG, WashRoomIMG;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
BedRoomIMG=loadImage("images/Bed Room.png");
GardenIMG=loadImage("images/Garden.png");
WashRoomIMG=loadImage("images/Wash Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
  
 
  //write code to display text lastFed time here

  fill(255,255,255)
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

  //read game State frome database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }

 
  drawSprites();
}
//function to update gameState in database
function update(state){
  database.ref('/').update({
    gameState:state
  });
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val * 0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
