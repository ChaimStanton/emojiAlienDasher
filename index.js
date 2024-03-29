let canvas;

// counter is made for frequency and timings of aliens here
let counter = 0;

//images declared here
let spikeImg;
let enemyImg;
let facePalmImg;

// spikes declared here
let mainSprite;
let enemySprite;
let facePalmSprite;

// variable for ground declared here
const groundY = 250;

//only allow jumping if the player is not already jumping
let jumping = false;

// main character sprite declared here
let spriteSpeedY = 0;

// This is to hold the value of the a recent sprite
let enemy;

// high score variables declared here
let highScore = 0;
let highScoreText;

// Boolean for gameplay
let gameIsBeingPlayed = true;

// Sprite groups made here
let mainSpriteGroup;
let alienGroup;
let facePalmSpriteGroup;


let supaPowaSoundTrack;
let enemyDiedSound;
let timeSinceLast = 0; // this is a variable to ensure that the aliens dont get bunched up


function preload() {
  spikeImg = loadImage("Smilee.png");
  enemyImg = loadImage("Alien.png");
  facePalmImg = loadImage("facePalm.png");

  supaPowaSoundTrack = new Audio("Ove Melaa-Supa Powa C.mp3");
  enemyDiedSound = new Audio("35.ogg");
}

function setup() {

  canvas = createCanvas(700, 300);
  background(0, 0, 255);
  canvas.parent('sketch-holder');

  // Main character smiley face created here
  mainSprite = createSprite(1, 1);
  mainSprite.scale = 0.2;
  mainSprite.addImage(spikeImg);
  mainSprite.position.x = 80;
  mainSprite.position.y = groundY - 20;
  mainSprite.setCollider("circle", 0, 0, mainSprite.width/1.5, mainSprite.width/1.5);

  alienGroup = new Group();

  mainSpriteGroup = new Group(); // a group for the main sprite this is necessary to the sprites can be drawn seperatly
  mainSpriteGroup.add(mainSprite);

  // facepalm sprite created here
  facePalmSprite = createSprite();
  facePalmSpriteGroup = new Group(); // this is necessary as:
  facePalmSprite.addImage(facePalmImg);
  // p5play only lets you draw individual sprites if they are part of a group
  facePalmSpriteGroup.add(facePalmSprite);
}

function draw() {
    supaPowaSoundTrack.play();
    background(0, 0, 255);
    if (gameIsBeingPlayed) {
      //ENVIRONMENT IS DRAWN HERE

      //draw the ground
      stroke(255);
      line(0, groundY, width, groundY);

      // ALIENS HERE
      makeAliens(); // makes aliens come in from the left of the screen

      // PLAYER MOVEMENT IS HERE
      userInput(); // to see if key is pressed

      //move the player
      mainSprite.position.y = mainSprite.position.y + spriteSpeedY;
      playerGroundHeightCollisionStopper();

      // Overlap code here
      mainSprite.overlap(alienGroup, collisionCode);
      for (let i = 1; i < alienGroup.length; i++) {
        enemy = alienGroup[i];
        mainSprite.overlap(enemy, collisionCode)
      }

      //HIGH SCORE DIALOGUE MADE HERE
      //high score text made here
      highScore = highScore + 1;
      highScoreText = "HS:" + highScore;

      //high score displayed here
      fill(255, 0, 0);
      textSize(30);
      strokeWeight(0);
      text(highScoreText, width - 150, 25);

      mainSpriteGroup.draw();
      alienGroup.draw();
      // drawSprites();
    } else {
      //put game ended code here
      background(255, 0, 0);
      textSize(50);
      text("GAME OVER", 20, 50);

      text("Your high score is " + highScore, 20, 100);

      text("To restart: \npress space \nor click or touch anywhere", 20, 151);

      // facepalm sprite created here
      facePalmSprite.position.x = 600;
      facePalmSprite.position.y = 100;
      facePalmSpriteGroup.draw();

      endGameUserInput();
    }
}

function collisionCode(mainSprite, enemySprite) {
  enemyDiedSound.play();
  enemySprite.remove(); // this removes the enemy sprite that was collided with
  gameIsBeingPlayed = false;
}

function playerGroundHeightCollisionStopper() {
  if (mainSprite.position.y >= groundY - mainSprite.width/2) {
    mainSprite.position.y = groundY - mainSprite.width/2 + 2;
    spriteSpeedY = 0;
    jumping=false;
  }
  else {
    spriteSpeedY++;
  }
}

function userInput() {
  if (!jumping && keyCode === 32) {
    //going up
    spriteSpeedY = -17;

    //disallow jumping while already jumping
    jumping = true;
  }

  keyCode = 0; // this is the code of what the user has input

}

function endGameUserInput() {
  if (keyCode === 32) { // space is pressed
    gameIsBeingPlayed = true;
    highScore = 0;
  }
}

function mousePressed() {
  if (!jumping && gameIsBeingPlayed) {
    //going up
    spriteSpeedY = -17;

    //disallow jumping while already jumping
    jumping = true;
  } else if (!gameIsBeingPlayed){
    gameIsBeingPlayed = true;
    highScore = 0;
  }


}

  function makeAliens() {
    // make the aliens
    // if (counter % 100 === 0) {
    if ((round(random(1,80))) === 5 && timeSinceLast >= 30) {
      // Enemy sprite (alien) created here
      enemySprite = createSprite(width + 20, groundY - 20);
      enemySprite.scale = 0.2;
      enemySprite.addImage(enemyImg);
      enemySprite.setSpeed(3.2, 180);
      alienGroup.add(enemySprite);

      timeSinceLast = 0; // this is a counter variable to make sure they don't get bunched up
    }
    counter++; // increment the counter
    timeSinceLast++; // increment the time since the last sprite to be generated
  }

  function ignore() {
    draw();
    setup();
    preload();
  }