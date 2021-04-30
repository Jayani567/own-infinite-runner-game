var PLAY=1;
var END=0;
var gameState=PLAY;

var santa,santa_running,santa_collided;
var ground,invisibleGround,GroundImage;

var snowGroup,snowImage;
var giftsGroup,gift1,gift2,gift3,gift4,gift5,gift6;

var score;
var gameOverImage,restartImage;
var jumpSound,checkpointSound,dieSound;
var back;

function preload(){
 santa_running = loadAnimation("Idle (1).png","Run (3).png","Idle (2).png");

  santa_collided = loadAnimation("Dead (9).png");
  
  
  groundImage=loadImage("ground2.png");
  
  snowImage=loadImage("snow cloud.png");
  
  gift1=loadImage("gift1.png");
  gift2=loadImage("gift2.png");
  gift3=loadImage("gift3.png");
  gift4=loadImage("gift4.png");
  gift5=loadImage("gift5.png");
  gift6=loadImage("gift6.png");
  
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameover.png");
  
  jumpSound=loadSound("jump.mp3");
  checkpointSound=loadSound("score.mp3");
  dieSound=loadSound("done.mp3");
  back=loadImage("back.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  var goood="this is good"
  console.log(goood);
  
  santa= createSprite(50,height-70,20,50);
  santa.addAnimation("running",santa_running);
  santa.addAnimation("collided",santa_collided);
  santa.scale=0.1;
  
  ground= createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x=width/2;
  ground.visible=false;
  
  
gameOver = createSprite(200,200);
gameOver.addImage(gameOverImage);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.2;
  restart.scale = 0.2;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
   giftsGroup = createGroup();
  snowGroup = createGroup();
  
    santa.setCollider("rectangle",0,0,santa.width,santa.height);
  santa.debug = true;
  
  score = 0;
  
  
}

function draw() {
  background("pink");
 text("Score: "+ score, 500,50); 
  
  
   if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
  
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkpointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
 
    if(touches.length>0 || keyDown("space")&& santa.y >= height-120) {
        santa.velocityY = -12;
        jumpSound.play();
      touches=[];
    }
    
    
    santa.velocityY = santa.velocityY + 0.8
  
    spawnSnow();
  
 
    spawnGifts();
    
    if(giftsGroup.isTouching(santa)){
       
        jumpSound.play();
        gameState = END;
        dieSound.play()
     
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    
      santa.changeAnimation("collided", santa_collided);
    
     
     
      ground.velocityX = 0;
      santa.velocityY = 0
      

    giftsGroup.setLifetimeEach(-1);
    snowGroup.setLifetimeEach(-1);
     
    giftsGroup.setVelocityXEach(0);
     snowGroup.setVelocityXEach(0); 
     
       if(touches.length>0 || keyDown("SPACE")) {
      reset(); 
       touches=[];
       }

   }
  
 
  
  santa.collide(invisibleGround);
  
  

  drawSprites();
}

function reset(){
 gameState=PLAY; 
  restart.visible=false;
  gameOver.visible=false;
giftsGroup.destroyEach();
snowGroup.destroyEach();
  score=0;
  santa.changeAnimation("santarunning",santa_running);
  background("white")
}


function spawnGifts(){
 if (frameCount % 60 === 0){
   var gift = createSprite(600,height-95,10,40);
   gift.velocityX = -(6 + score/100);
   
  
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: gift.addImage(gift1);
              break;
      case 2: gift.addImage(gift2);
              break;
      case 3: gift.addImage(gift3);
              break;
      case 4: gift.addImage(gift4);
              break;
      case 5: gift.addImage(gift5);
              break;
      case 6: gift.addImage(gift6);
              break;
      default: break;
    }
             
    gift.scale = 0.2;
    gift.lifetime = 300;
   
   
   
   
    giftsGroup.add(gift);
   
 }
}

function spawnSnow() {
 
  if (frameCount % 60 === 0) {
    var snow = createSprite(width+20,height-300,40,10);
    snow.y = Math.round(random(80,120));
    snow.addImage(snowImage);
    snow.scale = 0.1;
    snow.velocityX = -3;
    
    
    snow.lifetime = 200;
    

    snow.depth = snow.depth;
    snow.depth = snow.depth + 1;
    
  
    snowGroup.add(snow);
   
  }
}


  
  
  
  
  
  
  
