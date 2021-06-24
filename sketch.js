let mario_x_velocity = 0,
  mario_y_velocity = 0;
let mario_x = 100,
  mario_y = 300;
let coin_x = 200,
  coin_y = 100;
let mario_x_step = 5,
  mario_y_step = 5;
let img;
let img2;

// Background
let bg;
let bgLeft = 0;
let moveSpeed = 5;

function preload() {
  bg = loadImage("assets/level_1.jpeg");
  coin_img = loadImage("assets/coinbronze.png");
  mario_img = loadImage("assets/mario.png");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  image(bg, bgLeft, 0);

  image(coin_img, coin_x, coin_y, 30, 30);
  image(mario_img, mario_x, mario_y, 30, 50);

  let is_collision = check_collisions(coin_x, coin_y, mario_x, mario_y);
  let is_border = check_border();

  if (keyIsDown(LEFT_ARROW)) mario_x_velocity = -mario_x_step;
  if (keyIsDown(RIGHT_ARROW)) mario_x_velocity = mario_x_step;
  if (keyIsDown(UP_ARROW)) mario_y_velocity = -mario_y_step;
  if (keyIsDown(DOWN_ARROW)) mario_y_velocity = mario_y_step;

  if (!is_collision && !is_border) {
    mario_x += mario_x_velocity;
    mario_y += mario_y_velocity;
  } else {
    if (is_collision) {
      coin_x += mario_x_velocity;
      coin_y += mario_y_velocity;
    }
    if (is_border) {
      if (mario_x_velocity < 0) moveBackgroundRight();
      if (mario_x_velocity > 0) moveBackgroundLeft();
    }
  }

  mario_x_velocity = 0;
  mario_y_velocity = 0;
}

function moveBackgroundLeft() {
  let minBgLeft = -bg.width + width;

  if (bgLeft - moveSpeed > minBgLeft) {
    bgLeft -= moveSpeed;
  }
}

function moveBackgroundRight() {
  if (bgLeft + moveSpeed < 0) {
    bgLeft += moveSpeed;
  }
}

function check_collisions(x0, y0, x1, y1) {
  let d = dist(x0, y0, x1, y1);
  text("Distance: " + d, 10, 10, 200, 30);
  text(
    "Vectors: mario_x_velocity=" +
      mario_x_velocity +
      "; mario_y_velocity=" +
      mario_y_velocity,
    10,
    30,
    400,
    30
  );

  if (d < 40) {
    return true;
  }
}

function check_border() {
  if (mario_x + mario_x_velocity <= 50 || mario_x + mario_x_velocity > 600) {
    return true;
  }
  return false;
}
