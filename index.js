
// counter is made for frequency and timings of aliens here
var counter = 0;

//images declared here
var spikeImg;
var enemyImg;

// spikes declared here
var mainSprite;
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
  mainSprite = createSprite(1, 1);
  mainSprite.scale = 0.2;
  mainSprite.addImage(spikeImg);
  mainSprite.position.x = 80;
  mainSprite.position.y = groundY - 20;
  mainSprite.setCollider("circle", 0,0, mainSprite.width/1.5);
  alienGroup = new Group();

}

function draw() {

  //ENVIRONMENT IS DRAWN HERE
  background(0, 0, 255);

  //draw the ground
  stroke(255);
  line(0, groundY, width, groundY);

  // ALIENS HERE
  makeAliens(); // makes aliens come in from the left of the screen

  // PLAYER MOVEMENT IS HERE
  userInput(); // to see if key is pressed
  //move the player
  mainSprite.position.y = mainSprite.position.y + spriteSpeedY;
  playerY += playerSpeedY;
  playerGroundHeightCollisionStopper();

  // draw the player rectangle again
  rect(playerX, playerY, playerWidth, playerHeight); // this line is not necessary, but is included for logic reasons

  if (mainSprite.overlap(alienGroup)) {
    console.log("collision")
  }
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

  if (mainSprite.position.y < groundY && !jumping) {
    spriteSpeedY = 0;
    mainSprite.position.y = groundY  - mainSprite.height/2 + 3;
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
    alienGroup.add(enemySprite);
  }
  counter++; // increment the counter
}

function ignore() {
  draw();
  setup();
  preload();
}