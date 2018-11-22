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
  playerGroundHeightCollisionStopper();

  // if (enemySprite.position.x < 400) {
  //   enemySprite.remove();
  //   console.log("Enemy sprite removed");
  // }

  // Overlap code here
  mainSprite.overlap(alienGroup, collisionCode);
  for (var i = 1; i < alienGroup.length; i++) {
    enemy = alienGroup[i];
    mainSprite.overlap(enemy, collisionCode)
  }

  // mainSpriteGroup.overlap(alienGroup, collisionCode);
  // if (mainSprite.touching(alienGroup)) {
  //   console.log("aaa")
  // }

  drawSprites();
}



function collisionCode(mainSprite, enemySprite) {
  

///other code goes here
  enemySprite.remove();


} //end collision code function



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
    enemySprite = createSprite(width + 20, groundY - 20);
    enemySprite.scale = 0.2;
    enemySprite.addImage(enemyImg);
    //enemySprite.position.x = width + 20;
    //enemySprite.position.y = groundY - 20;
    enemySprite.setSpeed(3.2, 180);
    // enemySprite.setCollider("circle", 0,0, enemySprite.width/2)
    alienGroup.add(enemySprite);
  }
  counter++; // increment the counter
}

function ignore() {
  draw();
  setup();
  preload();
}
