
let snowflakes = []; // array to hold snowflake objects

var canvas;

// function parallax() {
//   window.onscroll = function() {
//     var speed = 5.0;
//     document.body.style.backgroundPosition = (-window.pageXOffset/speed)+"px "+(-window.pageYOffset/speed)+"px";
//   }
// }

parallax();
function windowResized() {
resizeCanvas(windowWidth,windowHeight);
}

function setup() {
	canvas=createCanvas (windowWidth,windowHeight);
  // createCanvas(windowWidth, windowHeight);
  canvas.position (0,0);
  canvas.style ('z-index', '-1');
  fill(240);
  noStroke();
}

function draw() {
  background('#bae0d8');
  let t = frameCount / 300; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < random(1); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// function windowResized() {
// resizeCanvas();
// }

// }

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(1, 20);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.2);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

