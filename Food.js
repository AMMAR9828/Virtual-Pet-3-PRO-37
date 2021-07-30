class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage("images/Milk.png");
    this.image2=loadImage("images/Food Stock.png");
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    bedroom(){
      background(BedRoomIMG,550,500);
    }
    garden(){
      background(GardenIMG,550,500);
    }
    washroom(){
      background(WashRoomIMG,550,500);
    }

    display(){
      var x=80,y=40;
      
      imageMode(CENTER);
      image(this.image,730,220,80,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%6==0){
            x=80;
            y=y+80;
          }
          image(this.image2,x,y,80,80);
          x=x+70;
        }
      }
    }
}
