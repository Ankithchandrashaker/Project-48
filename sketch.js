var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImage;
var heart1,heart2,heart3;
var heart1Image,heart2Image,heart3Image;
var zombieGroup;
var bulletGroup;
var bullet;
var bullets=70;
var life=3;
var score=0;
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImage = loadImage("assets/zombie.png")

  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")

  //bulletImage = loadImage("assets/bullet-removebg-preview.png")
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   heart1=createSprite(displayWidth-150,40,20,20)
   heart1.visible=false
   heart1.addImage("heart1",heart1Image)
   heart1.scale=0.4

   heart2=createSprite(displayWidth-150,40,20,20)
   heart2.visible=false
   heart2.addImage("heart2",heart2Image)
   heart2.scale=0.4

   heart3=createSprite(displayWidth-150,40,20,20)
   heart3.visible=false
   heart3.addImage("heart3",heart3Image)
   heart3.scale=0.4



  zombieGroup=createGroup()
  bulletGroup=createGroup()
   
}

function draw() {
  background(0); 

  if (gameState==="fight"){

  

  if (life===3){
    heart3.visible=true
    heart2.visible=false
    heart1.visible=false
  }

  if (life===2){
    heart2.visible=true
    heart3.visible=false
    heart1.visible=false


  }

  if (life===1){
    heart1.visible=true
    heart2.visible=false
    heart3.visible=false

  }

  if (life===0){
    gameState="lost"

  }

  if (score===100){
    gameState="won"
    

  }

  if (bullet===0){
    gameState="bullet"
    
  }

  

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullet=createSprite(displayWidth-1150,player.y-30,40,10);
  //bullet.addImage(bulletImage)
  bullet.shapeColor="gold"
  bullet.velocityX=10
  bulletGroup.add(bullet)
  player.depth=bullet.depth
  player.depht=player.depth=2
  bullets=bullets-1

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){ 
    if(zombieGroup[i].isTouching(player)){ 
    zombieGroup[i].destroy() 
    life=life-1 } 
  }
}

if (zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score=score+2
    }
  }
}

zombies();
  }
drawSprites();
textSize(25)
fill("Green")
text("bullets="+bullets,displayWidth-210,displayHeight/2-250)
text("score="+score,displayWidth-200,displayHeight/2-220)
text("life="+life,displayWidth-200,displayHeight/2-280)

if (gameState=="lost"){
  textSize(100)
  fill("red")
  text("you lost",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if (gameState=="won"){
  textSize(100)
  fill("green")
  text("you won",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}

else if (gameState=="bullet"){
  textSize(100)
  fill("green")
  text("you ran out of bullets",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
}

function zombies(){
  if (frameCount%100==0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImage)
    zombie.scale=0.2
    zombie.debug=false
    zombie.lifetime=700
    zombie.velocityX=-3
    zombie.setCollider("rectangle",0,0,300,300)
    zombieGroup.add(zombie)
  }

  
}
