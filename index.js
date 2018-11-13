//images declared here
var spikeImg;

// spikes declared here
var mainCharacter

var groundY = 250;
var playerX = 140;
var playerY = 100;
var playerWidth = 20;
var playerHeight = 50;
var playerSpeedY = 0;

//only allow jumping if the player is not already jumping
var jumping = false;

function preload(){
  spikeImg = loadImage("Smilee.png")
}

function setup() {
   
  createCanvas(300, 300);
  background(0, 0, 255);        
  
  mainCharacter = createSprite(1, 1)
  mainCharacter.scale = 0.2;
  mainCharacter.addImage(spikeImg);

  mainCharacter.position.x = 50;
  mainCharacter.position.y = groundY - 20;
  console.log(mainCharacter.width)

 }

function draw() {
  mainCharacterBottomPosition = mainCharacter.position.y - 20 

  userInput() // to see if key is pressed
  userInputSprite(mainCharacter)

  background(0, 0, 255); 
  
  //draw the ground
  stroke(255);
  line(0, groundY, width, groundY);

  //move the player
  playerY += playerSpeedY;
  playerGroundHightCollisionStopper(); 

  //draw the player rectangle
  rect(playerX, playerY, playerWidth, playerHeight);

  drawSprites();   
}

function playerGroundHightCollisionStopper(){
    //is the player colliding with the ground?
  if (playerY + playerHeight >= groundY) {
  //snap the player's bottom to the ground's position
    playerY = groundY - playerHeight;

  //stop the player falling
    playerSpeedY = 0;

    //allow jumping again
    jumping = false;
  }
  // //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    playerSpeedY ++;
  } 
}

function userInput(){ // This is called in the draw funciton and makes it smoothly move left and right
  if (keyIsDown(39)){
    if ((playerX + playerWidth) < width){
      playerX += 4
      }
    }
  else if(keyIsDown(37)){
    if (playerX > 1){
      playerX -= 4
    }
  }

  if (!jumping && keyCode === 32) {
    //going up
    playerSpeedY = -15;
    
    //disallow jumping while already jumping
    jumping = true;
  }
  keyCode = 0; 
}

function userInputSprite(sprite){ // This is called in the draw funciton and makes it smoothly move left and right z
  if (keyIsDown(39)){
    if ((sprite.position.x + sprite.width) < width){
      sprite.position.x += 4
      }
    }
  else if(keyIsDown(37)){
    if (sprite.position.x > 1){
      sprite.position.x -= 4
    }
  }

  if (!jumping && keyCode === 32) {
    //going up
    playerSpeedY = -15;
    
    //disallow jumping while already jumping
    jumping = true;
  }
  keyCode = 0; 
}
