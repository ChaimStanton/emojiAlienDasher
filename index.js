// import {keyCode, keyIsDown} from "p5/global";
// import {createCanvas} from "p5/global";
// import {Element as sprite} from "p5/lib/addons/p5.dom";
// import {keyIsDown} from "p5/global";

var counter = 0;

//images declared here
var spikeImg;
var enemyImg;

// spikes declared here
var mainCharacter;
var enemySprite;

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
  spikeImg = loadImage("Smilee.png");
  enemyImg = loadImage("Alien.png");
}

function setup() {

  createCanvas(700, 300);
  background(0, 0, 255);

  // Main character smilie face created here
  mainCharacter = createSprite(1, 1);
  mainCharacter.scale = 0.2;
  mainCharacter.addImage(spikeImg);
  mainCharacter.position.x = 80;
  mainCharacter.position.y = groundY - 20;



}

function draw() {
  background(0, 0, 255);

  //draw the ground
  stroke(255);
  line(0, groundY, width, groundY);
  makeAliens();

  userInput(); // to see if key is pressed

  //move the player

  mainCharacter.position.y = mainCharacter.position.y + spriteSpeedY;
  playerY += playerSpeedY;
  playerGroundHeightCollisionStopper();

  // draw the player rectangle again
  rect(playerX, playerY, playerWidth, playerHeight); // this line is not necessary, but is included for logic reasons

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
    //gravity accelerates the movement speed towards the ground
    playerSpeedY++;
  }

  if (mainCharacter.position.y < groundY && !jumping) {
    spriteSpeedY = 0;
    mainCharacter.position.y = groundY  - mainCharacter.height/2 + 3;
    jumping = false;
  }

  if (jumping) {
    spriteSpeedY = spriteSpeedY + 1;

  }

}

function userInput() {

  if (!jumping && keyCode === 32) {
    //going up
    playerSpeedY = -15;
    spriteSpeedY = -15;

    //disallow jumping while already jumping
    jumping = true;
  }

  keyCode = 0;

}

function makeAliens() {
// make the aliens
  if (counter % 100 === 0) {
    // Enemy sprite (alien) created here
    enemySprite = createSprite(1, 1);
    enemySprite.scale = 0.2;
    enemySprite.addImage(enemyImg);
    enemySprite.position.x = width + 20;
    enemySprite.position.y = groundY - 20;
    enemySprite.setSpeed(3.2, 180);
  }
  counter++; // increment the counter
}
function ignore() {
  draw();
  setup();
  preload();
}