// counter is made for frequency and timings of aliens here
let counter = 0;

//images declared here
let spikeImg;
let enemyImg;

// spikes declared here
let mainSprite;
let enemySprite;

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

let gameIsBeingPlayed = true;

function preload() {
  spikeImg = loadImage("Smilee.png");
  enemyImg = loadImage("Alien.png");
}

function setup() {

  createCanvas(700, 300);
  background(0, 0, 255);

  // Main character smiley face created here
  mainSprite = createSprite(1, 1);
  mainSprite.scale = 0.2;
  mainSprite.addImage(spikeImg);
  mainSprite.position.x = 80;
  mainSprite.position.y = groundY - 20;
  mainSprite.setCollider("circle", 0, 0, mainSprite.width/1.5, mainSprite.width/1.5);

  alienGroup = new Group();
}

  function draw() {
    background(0, 0, 255);
    if (gameIsBeingPlayed) {
      //ENVIRONMENT IS DRAWN HERE

      //draw the ground
      stroke(255);
      line(0, groundY, width, groundY);

      // ALIENS HERE
      makeAliens(); // makes aliens come in from the left of the screen

      // PLAYER MOVEMENT IS HERE
      gamePlayUserInput(); // to see if key is pressed

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
      text(highScoreText, width - 150, 25);


      drawSprites();
    } else {
      //put game ended code here
      background(255, 0, 0);
      textSize(50);
      text("GAME OVER", 20, 50);

      //high score displayed here
     fill(255,0,0);
     textSize(30);
     strokeWeight(0);
     text(highScoreText, width-150, 25);

      text("Press space to restart", 20, 150);

      // gamePlayUserInput();
      endGameUserInput();
    }
}

function collisionCode(mainSprite, enemySprite) {
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

function gamePlayUserInput() {
  if (!jumping && keyCode === 32) {
    //going up
    spriteSpeedY = -15;

    //disallow jumping while already jumping
    jumping = true;
  }


  keyCode = 0; // this is the code of what the user has input

}

function endGameUserInput() {
  if (keyCode === 32){ // space is pressed
    gameIsBeingPlayed = true;
    highScore = 0;
  }
}

function mousePressed() {
  if (!jumping) {
    //going up
    spriteSpeedY = -15;

    //disallow jumping while already jumping
    jumping = true;
  }
}

function makeAliens() {
  // make the aliens
  if (counter % 100 === 0) {
    // Enemy sprite (alien) created here
    enemySprite = createSprite(width + 20, groundY - 20);
    enemySprite.scale = 0.2;
    enemySprite.addImage(enemyImg);
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
