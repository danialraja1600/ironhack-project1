// Get the canvas element and its context
var canvas = document.getElementById("canvas");     //canvas element
var context = canvas.getContext("2d");  //set canvas element to 2D


// Set the initial position and speed of the player
// initial position of player on x-axis
// initial position of player on y-axis
// initial speed of the player

var player = {
  x: 200, 
  y: 350, 
  speed: 5 
};

// Set the initial position and speed of the blueSquare
// initial position of Blue Square on x-axis
// initial position of Blue Square on y-axis
// initial speed of the Blue Square

var blueSquare = {
  x: 100,
  y: 100,
  speed: 4
};

// Set the initial position and speed of the redSquare
// initial position of Red Square on x-axis
// initial position of Red Square on y-axis
// initial speed of the Red Square

var redSquare = {
  x: 300,
  y: 100,
  speed: 5
};

// Set the initial position and speed of the fire
// initial position of fire on x-axis
// initial position of fire on y-axis
// initial speed of the fire
// set isFired value to false (it is set to true to user press space key)

var fire = {
  x: 0,
  y: 0,
  speed: 10,
  isFired: false
};

var score = 5; // Set the initial score to zero
var life = 3; // Set the initial life to three

// Set the initial lifeScore to zero (everytime time player scores 10, it gets one extra life and lifeScore value is set to zero again)
var lifeScore = 0; 


// Draw the player on the canvas with black color
function drawPlayer() {
  context.fillStyle = "black";
  context.fillRect(player.x, player.y, 50, 20);  // 50 is the player's width and 20 is the player's height
}

// Draw the blueSquare on the canvas with blue color
function drawblueSquare() {
  context.fillStyle = "blue";
  context.fillRect(blueSquare.x, blueSquare.y, 20, 20); // 20 is the blueSquare's width and 20 is the blueSquare's height
}

// Draw the redSquare on the canvas with red color
function drawredSquare() {
  context.fillStyle = "red";
  context.fillRect(redSquare.x, redSquare.y, 20, 20); // 20 is the redSquare's width and 20 is the redSquare's height
}

// Draw the fire on the canvas with green color (this function only works when isFired value is set to true)
function drawFire() {
  if (fire.isFired) {
    context.fillStyle = "green";
    context.fillRect(fire.x, fire.y, 10, 10); // 10 is the fire's width and 10 is the fire's height
  }
}

// Move the player based on user input
function movePlayer(event) {
  if (event.keyCode == 37) { // left arrow key
    player.x -= player.speed;
  } else if (event.keyCode == 39) { // right arrow key
    player.x += player.speed;
  } else if (event.keyCode == 32) { // spacebar key (when space key is pressed, the isFired value is set to true)
    fire.isFired = true;
    fire.x = player.x + 20; // initial position of fire on x-axis (with respect to player)
    fire.y = player.y - 10; // initial position of fire on t-axis (with respect to player)
  }
}

// Move the fire in y-axis (upward)
function moveFire() {
  fire.y -= fire.speed; // fire speed value is decrement from y-axis value of fire, and the result is stored in y-axis value of fire (that is how fire is moved upward)
}

// Move the blueSquare in y-axis (downwards)
function moveblueSquare() {
  // Randomly change the blueSquare's direction
  // this select a random number between 0-19, we can replace 20 to any other number (5, 4, 12)
  var randomNum = Math.floor(Math.random() * 20);
  if (randomNum == 0) {
    blueSquare.x -= blueSquare.speed; // if random number is 0 then blue square speed value is decrement from x-axis value of blue square, and the result is stored in x-axis value of blue square (that is how blue square is moved in left direction only a little, because random number 0 is generated very few times)
  } else {
    blueSquare.y += blueSquare.speed; // if random number is not 0 then blue square speed value is incremented from y-axis value of blue square, and the result is stored in y-axis value of blue square (that is how blue square is moved in bottom direction
  }
  
  // If the blueSquare goes out of bounds, reset its position and minus 1 from the score variable
  if (blueSquare.x < 0 || blueSquare.x > canvas.width - 20 || blueSquare.y < 0 || blueSquare.y > canvas.height - 20) {
    blueSquare.x = Math.floor(Math.random() * (canvas.width - 20)); // new value of red square in x-axis
    blueSquare.y = 4; // new value of red square in y-axis
    score -= 1;
  }
}


// Move the redSquare in y-axis (downwards)
function moveredSquare() {
  // Randomly change the redSquare's direction
  // this select a random number between 0-19, we can replace 20 to any other number (5, 4, 12)
  var randomNum = Math.floor(Math.random() * 20);
  if (randomNum == 0) {
    redSquare.x -= redSquare.speed; // if random number is 0 then red square speed value is decrement from x-axis value of red square, and the result is stored in x-axis value of red square (that is how red square is moved in left direction only a little, because random number 0 is generated very few times)
  } else {
    redSquare.y += redSquare.speed; // if random number is not 0 then red square speed value is incremented from y-axis value of red square, and the result is stored in y-axis value of red square (that is how red square is moved in bottom direction
  }
  
  // If the redSquare goes out of bounds, reset its position
  if (redSquare.x < 0 || redSquare.x > canvas.width - 20 || redSquare.y < 0 || redSquare.y > canvas.height - 20) {
    redSquare.x = Math.floor(Math.random() * (canvas.width - 20)); // new value of red square in x-axis
    redSquare.y = 4; // new value of red square in y-axis
  }

}

// Check if the player and blueSquare collide, if they collide then
// plus 1 to score variable
// plus 1 to lifeScore variable
// if lifeScore variable value is 10 then sets lifeScore value to 0 and add 1 to life variable
function checkCollision() {

  // all x values of player and blueSquare is compared here
  // all y values of player and blueSquare compared here
  // 50 is used because player's widht is 50
  // 20 is used because player's height is 20
  if (player.x < blueSquare.x + 50 && player.x + 50 > blueSquare.x && player.y < blueSquare.y + 20 && player.y + 20 > blueSquare.y) {
    score += 1;
    lifeScore += 1;
    scoreSquare();
    if(lifeScore == 10)
    {
      lifeScore = 0;
      life += 1;
      gainLife();
    }
    blueSquare.x = Math.floor(Math.random() * (canvas.width - 20)); // new value of blueSquare on x-axis
    blueSquare.y = 4; // new value of blueSquare on y-axis
  }
  // if score value is 0 then show game over and calls exitCode function
  if(score <= 0)
  {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML = "Score: " + score;
    gameOver();
    exitCode();
  }
}

// Check if the player and redSquare collide, if they collide then
// minus 1 to life variable
function checkCollision2() {

  // all x values of player and redSquare is compared here
  // all y values of player and redSquare compared here
  // 50 is used because player's widht is 50
  // 20 is used because player's height is 20
  if (player.x < redSquare.x + 50 && player.x + 50 > redSquare.x && player.y < redSquare.y + 20 && player.y + 20 > redSquare.y) {
    life -= 1;
    loseLife();
    redSquare.x = Math.floor(Math.random() * (canvas.width - 20)); // new value of redSquare on x-axis
    redSquare.y = 4; // new value of redSquare on x-axis
  }
  // if life value is 0 then show game over and calls exitCode function
  if(life <= 0)
  {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML = "Score: " + score;
    gameOver();
    exitCode();
  }
}

// Check if the fire and redSquare collide, if they collide then sends redSquare to out of canvas (hides it)
function fireCollision() {

  // all x values of fire and redSquare is compared here
  // all y values of fire and redSquare compared here
  // 20 is used because redSquare's widht is 20
  // 20 is used because redSquare's height is 20
  if (redSquare.x < fire.x + 20 && redSquare.x + 20 > fire.x && redSquare.y < fire.y + 20 && redSquare.y + 20 > fire.y) 
  {
    redSquare.x = 400; // it send the redsquare out of canvas element, it means it disappeared.
    bomb();
    return;
  }
}


// Draw the score on the canvas
function drawScore() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 30); // position of score, 10 is the x-axis value, 30 is the y-axis value
}

// Draw the life on the canvas
function drawLife() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Life: " + life, 320, 30); // position of life, 320 is the x-axis value, 30 is the y-axis value
}

// Exit code
function exitCode() {
  document.getElementById("canvas").remove();
  window.stop();
}

// Play game over sound
function gameOver() {
  var audio = document.getElementById("game-over");
  audio.play();
}

// Play when player scores a point
function scoreSquare() {
  var audio = document.getElementById("score-square");
  audio.play();
}

// Play when player loses a life
function loseLife() {
  var audio = document.getElementById("lose-life");
  audio.play();
}


// Play when player gains a life
function gainLife() {
  var audio = document.getElementById("gain-life");
  audio.play();
}

// Play when redsquare is destroyed
function bomb() {
  var audio = document.getElementById("bomb");
  audio.play();
}



// Game loop
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Move the player
  window.addEventListener("keydown", movePlayer);

  moveblueSquare(); // Move the blueSquare
  moveredSquare(); // Move the redSquare
  moveFire(); // Move the fire

  // Check for collisions
  checkCollision();
  checkCollision2();
  fireCollision();

  // Draw the player, blueSquare, redSquare, fire, life and score
  drawPlayer();
  drawblueSquare();
  drawredSquare();
  drawFire();
  drawScore();
  drawLife();

  // Call gameLoop again after 20 milliseconds
  setTimeout(gameLoop, 20);
}

// Start the game loop
gameLoop();