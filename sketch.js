var PLAY = 1;
var END = 0;
var gameState = PLAY;

/*var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
*/

//THE ONLY VARIABLES
var trex2, trex_running2, trex_collided2;

var sunAnimation, sun;

var ground2, groundImage2,invisibleGround2;

var obstaclesGroup2, obstacles1, obstacles2, obstacles3, obstacles4;

var backgroundImg;

var jumpSound, collidedSound;

var cloudsGroup2, cloudsImage2;


var score=0;

var gameOver, gameOverImage, restart, restartImage;



function preload(){
  /*trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("Assets/ground2.png");
  
  cloudImage = loadImage("Assets/cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  */
   //Loads all of the animations and images
  trex_running2 = loadAnimation("Assets/trex_1.png", "Assets/trex_2.png", "Assets/trex_3.png")
   trex_collided2 = loadAnimation("Assets/trex_collided.png")
  
  
  obstacles1 = loadImage("Assets/obstacle1.png")
  obstacles2 = loadImage("Assets/obstacle2.png")
  obstacles3 = loadImage("Assets/obstacle3.png")
  obstacles4 = loadImage("Assets/obstacle4.png")
  
  backgroundImg = loadImage("Assets/backgroundImg.png")
  sunAnimation = loadImage("Assets/sun.png")
  
  groundImage2 = loadImage("Assets/ground.png")
  
  jumpSound = loadSound("Assets/jump.wav")
  collidedSound = loadSound("Assets/collided.wav")
  

  cloudsImage2 = loadImage("Assets/cloud.png")
  
   gameOverImage = loadImage("Assets/gameOver.png")
   restartImage = loadImage("Assets/restart.png")
}

function setup() {
  //sets the width and height of the game to the screen
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-50, 100, 10, 10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1;
  
  trex2 = createSprite(50,height-70,20,50);
  trex2.addAnimation("running", trex_running2);
  trex2.addAnimation("collided", trex_collided2);
    trex2.setCollider('circle',0,0,350)
//makes the trex smaller and creates the sprites, increases the speeds, makes the game infinite and adds the images
  trex2.scale = 0.1;
  
  ground2 = createSprite(width/2,height,width,2);
  ground2.addImage("ground",groundImage2);
  ground2.x = ground2.width /2;
  ground2.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround2 = createSprite(width/2,height-10, width,130);  invisibleGround2.shapeColor = "#f4cbaa";
  
  cloudsGroup2 = new Group();
  obstaclesGroup2 = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);

  fill("black");
    textSize(20);
  text("Score: "+ score, width-150,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground2.velocityX = -(6 + 3*score/100);
  
    if((touches.length > 0 || keyDown("space")) && trex2.y >= height-120)     {
      jumpSound.play();
      trex2.velocityY = -12;
      touches = [];
      console.log(touches)
    }
  
    trex2.velocityY = trex2.velocityY + 0.8
  
    if (ground2.x < 0){
      ground2.x = ground2.width/2;
    }
  
    trex2.collide(invisibleGround2);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup2.isTouching(trex2)){
      collidedSound.play();
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground2.velocityX = 0;
    trex2.velocityY = 0;
    obstaclesGroup2.setVelocityXEach(0);
    cloudsGroup2.setVelocityXEach(0);
    
    //change the trex animation
    trex2.changeAnimation("collided",trex_collided2);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup2.setLifetimeEach(-1);
    cloudsGroup2.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudsImage2);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex2.depth;
    trex2.depth = trex2.depth + 1;
    
    //add each cloud to the group
    cloudsGroup2.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-90,20,30);
    //obstacle.debug = true;
    obstacle.setCollider('circle',0,0,45)
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacles1);
              break;
      case 2: obstacle.addImage(obstacles2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3           ;
    obstacle.lifetime = 300;
    obstacle.depth = trex2.depth;
    trex2.depth +=1;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup2.destroyEach();
  cloudsGroup2.destroyEach();
  
  trex2.changeAnimation("running",trex_running2);
  
 
  
  score = 0;
  
}