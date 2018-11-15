// import {keyCode, keyIsDown} from "p5/global";
// import {createCanvas} from "p5/global";
// import {Element as sprite} from "p5/lib/addons/p5.dom";
// import {keyIsDown} from "p5/global";


//images declared here
var spikeImg;

// spikes declared here
var mainCharacter;

// variables for brick declared here
var groundY = 250;
var playerX = 140;
var playerY = 100;
var playerWidth = 20;
var playerHeight = 50;
var playerSpeedY = 0;

//only allow jumping if the player is not already jumping
var jumping = false;

// main character sprite declared here
var spriteSpeedY = 0;

function preload() {
  spikeImg = loadImage("Smilee.png")
}

function setup() {

  createCanvas(300, 300);
  background(0, 0, 255);

  mainCharacter = createSprite(1, 1);
  mainCharacter.scale = 0.2;
  mainCharacter.addImage(spikeImg);
  mainCharacter.position.x = 80;
  mainCharacter.position.y = groundY - 20;


}

function draw() {
  // spriteSpeedY = 0;
  userInput(); // to see if key is pressed

  background(0, 0, 255);

  //draw the ground
  stroke(255);
  line(0, groundY, width, groundY);

  //move the player
  playerY += playerSpeedY;
  playerGroundHeightCollisionStopper();


  mainCharacter.position.y = mainCharacter.position.y + spriteSpeedY;

  //draw the player rectangle
  rect(playerX, playerY, playerWidth, playerHeight);


  drawSprites();
}

function playerGroundHeightCollisionStopper() {
  // is the player colliding with the ground?
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
    playerSpeedY++;
  }

  if (mainCharacter.position.y < groundY && !jumping) {
    mainCharacter.position.y = groundY - mainCharacter.height/2 + 3;
    spriteSpeedY = 0;
    jumping = false;
  }

  if (jumping) {
    spriteSpeedY = spriteSpeedY + 1;
    console.log()
  }

}

function userInput() {
  // This is called in the draw function and makes it smoothly move left and right
  // if (keyIsDown(39)) {
  //   if ((playerX + playerWidth) < width) {
  //     playerX += 4;
  //     sprite.position.x += 4;
  //   }
  // }
  // else if (keyIsDown(37)) {
  //   if (playerX > 1) {
  //     playerX -= 4;
  //     sprite.position.x -= 4
  //   }
  // }

  if (!jumping && keyCode === 32) {
    //going up
    playerSpeedY = -15;
    spriteSpeedY = -15;

    //disallow jumping while already jumping
    jumping = true;
  }

  keyCode = 0;

}

function ignore() {
  draw();
  setup();
  preload();
}