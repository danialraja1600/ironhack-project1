// Get the canvas element and its context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Set the initial position and speed of the player
var player = {
  x: 200,
  y: 350,
  speed: 5
};

// Set the initial position and speed of the blueSquare
var blueSquare = {
  x: 100,
  y: 100,
  speed: 4
};

// Set the initial position and speed of the redSquare
var redSquare = {
  x: 300,
  y: 100,
  speed: 5
};

// Set the initial score to zero
var score = 5;
var life = 3; 
var lifeScore = 0;

// Draw the player on the canvas
function drawPlayer() {
  context.fillStyle = "black";
  context.fillRect(player.x, player.y, 50, 20);
}

// Draw the blueSquare on the canvas
function drawblueSquare() {
  context.fillStyle = "blue";
  context.fillRect(blueSquare.x, blueSquare.y, 20, 20);
}

// Draw the redSquare on the canvas
function drawredSquare() {
  context.fillStyle = "red";
  context.fillRect(redSquare.x, redSquare.y, 20, 20);
}

// Move the player based on user input
function movePlayer(event) {
  if (event.keyCode == 37) { // left arrow key
    player.x -= player.speed;
  } else if (event.keyCode == 39) { // right arrow key
    player.x += player.speed;
  } else if (event.keyCode == 32) { // spacebar key
    context.fillStyle = "green";
    context.fillRect(greenSquare.x, greenSquare.y, 20,20);
}






// Move the blueSquare
function moveblueSquare() {
  // Randomly change the blueSquare's direction
  var randomNum = Math.floor(Math.random() * 20);
  if (randomNum == 0) {
    blueSquare.x -= blueSquare.speed;
  } else {
    blueSquare.y += blueSquare.speed;
  }

  // If the blueSquare goes out of bounds, reset its position
  if (blueSquare.x < 0 || blueSquare.x > canvas.width - 20 || blueSquare.y < 0 || blueSquare.y > canvas.height - 20) {
    blueSquare.x = Math.floor(Math.random() * (canvas.width - 20));
    blueSquare.y = 4;
    score -= 1;
  }
}




// Move the redSquare
function moveredSquare() {
  // Randomly change the redSquare's direction
  var randomNum = Math.floor(Math.random() * 20);
  if (randomNum == 0) {
    redSquare.x -= redSquare.speed;
  } else {
    redSquare.y += redSquare.speed;
  }

  // If the redSquare goes out of bounds, reset its position
  if (redSquare.x < 0 || redSquare.x > canvas.width - 20 || redSquare.y < 0 || redSquare.y > canvas.height - 20) {
    redSquare.x = Math.floor(Math.random() * (canvas.width - 20));
    redSquare.y = 4;
  }

}

// Check if the player and blueSquare collide
function checkCollision() {
  if (player.x < blueSquare.x + 50 && player.x + 50 > blueSquare.x && player.y < blueSquare.y + 20 && player.y + 20 > blueSquare.y) {
    score += 1;
    lifeScore += 1;
    scoreSquare();
    if (lifeScore == 10) {
      lifeScore = 0;
      life += 1;
      gainLife();
    }
    blueSquare.x = Math.floor(Math.random() * (canvas.width - 20));
    blueSquare.y = 4;
  }
  if (score <= 0) {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML = "Score: " + score;
    // document.getElementById("canvas").style.display = "none";
    gameOver();
    exitCode();
  }
}
// Check if the player and redSquare collide
function checkCollision2() {
  if (player.x < redSquare.x + 50 && player.x + 50 > redSquare.x && player.y < redSquare.y + 20 && player.y + 20 > redSquare.y) {
    life -= 1;
    loseLife();
    redSquare.x = Math.floor(Math.random() * (canvas.width - 20));
    redSquare.y = 4;
  }
  if (life <= 0) {
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML = "Score: " + score;
    // document.getElementById("canvas").style.display = "none";
    gameOver();
    exitCode();
  }
}

// Draw the score on the canvas
function drawScore() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 30);
}

function drawLife() {
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Life: " + life, 320, 30);
}
function exitCode() {
  document.getElementById("canvas").remove();
  window.stop();
}


function gameOver() {
  var audio = document.getElementById("game-over");
  audio.play();
}

function scoreSquare() {
  var audio = document.getElementById("score-square");
  audio.play();
}

function loseLife() {
  var audio = document.getElementById("lose-life");
  audio.play();
}

function gainLife() {
  var audio = document.getElementById("gain-life");
  audio.play();
}





// Game loop
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Move the player
  window.addEventListener("keydown", movePlayer);

  //

  // Move the blueSquare
  moveblueSquare();
  moveredSquare();

  // Check for collisions
  checkCollision();
  checkCollision2();

  // Draw the player, blueSquare, redSquare, life and score
  drawPlayer();
  drawblueSquare();
  drawredSquare();
  drawScore();
  drawLife();

  // Call gameLoop again after 20 milliseconds
  setTimeout(gameLoop, 20);

}


// Start the game loop
gameLoop();
}