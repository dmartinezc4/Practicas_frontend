const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 20;
const PLAYER_MAX_SPEED = 600.0;
const LASER_MAX_SPEED = 300.0;
const LASER_COOLDOWN = 0.1;

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;
const ENEMY_COOLDOWN = 10.0;



const GAME_STATE = { //Game Loop
    lastTime: Date.now(),
    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
    score: 0,
    lives: 3,
    playerX: 0,
    playerY: 0,
    playerCooldown: 0,
    lasers: [],
    enemies: [],
    enemyLasers: [],
    gameOver: false
};

// Collision function
function rectsIntersect(r1, r2) {
    return !(
        r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top
    );
}

// Add position to any element
function setPosition(elem, x, y) {
    elem.style.transform = `translate(${x}px, ${y}px)`;
}

// Player stays within borders
function clamp(v, min, max) {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    } else {
        return v;
    }
}

// Random time
function rand(min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = 1;
    return min + Math.random() * (max - min);
}

/*Player */

// Create player
function createPlayer($container) {
  GAME_STATE.playerX = GAME_WIDTH / 2;
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  const $player = document.createElement("img");
  $player.src = "img/player.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

// Kill player
function destroyPlayer($container, player) {
    $container.removeChild(player);
    GAME_STATE.gameOver = true;
}

//Update player and keys
function updatePlayer(dt, $container) {

  if (GAME_STATE.leftPressed) { // left
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
  }
  if (GAME_STATE.rightPressed) { //right
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
  }

  GAME_STATE.playerX = clamp(  // player stays within borders
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN; // cooldown
  }
  if (GAME_STATE.playerCooldown > 0) { //reset cooldown
    GAME_STATE.playerCooldown -= dt;
    //score++;
  }

  const player = document.querySelector(".player");
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

/*Player Laser*/

// Create laser
function createLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/player-laser.png";
  $element.className = "laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  setPosition($element, x, y);
}

//Update both lasers
function updateLasers(dt, $container) {

  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {

    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED;

    if (laser.y < 0) {
      destroyLaser($container, laser);
    }

    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const enemies = GAME_STATE.enemies;

    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {// Enemy hit        
        destroyEnemy($container, enemy);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}

// Check player laser
function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

/*Enemy*/

// Create enemies and adds them in the array
function createEnemy($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/enemy.png";
  $element.className = "enemy";
  $container.appendChild($element);
  const enemy = {
    x,
    y,
    cooldown: rand(0.5, ENEMY_COOLDOWN),
    $element
  };
  GAME_STATE.enemies.push(enemy);
  setPosition($element, x, y);
}

// Move enemies and update them
function updateEnemies(dt, $container) {
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const enemies = GAME_STATE.enemies;
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);
    enemy.cooldown -= dt;
    if (enemy.cooldown <= 0) {
      createEnemyLaser($container, x, y);
      enemy.cooldown = ENEMY_COOLDOWN;
    }
  }
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}

// Check collision with enemy
function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element);
  enemy.isDead = true;
}

/*Enemy laser*/

// Create enemy laser
function createEnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "img/enemy-laser.png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.enemyLasers.push(laser);
  setPosition($element, x, y);
}

// Enemy laser and collision
function updateEnemyLasers(dt, $container) {
  const lasers = GAME_STATE.enemyLasers;

  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    const r2 = player.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) { // Player has been hit       
      destroyPlayer($container, player);

      break;
    }
  }
  GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
}

/*Controls*/

// Start controls
function init() {
  const $container = document.querySelector(".game");
  createPlayer($container);

  const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
  for (let j = 0; j < 3; j++) {
    const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
    for (let i = 0; i < ENEMIES_PER_ROW; i++) {
      const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
      createEnemy($container, x, y);
    }
  }
}

// We win if there is no more enemies
function win() {
  return GAME_STATE.enemies.length === 0;
}

//Each time a key is pressed
function update() {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;

  if (GAME_STATE.gameOver) { 
    document.querySelector(".game-over").style.display = "block";
    return;
  }

  if (win()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }

  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);

  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

//So we can start the game
function onKeyDown(e) {
  if (e.keyCode === 37 ||e.keyCode === 65) { //left
    GAME_STATE.leftPressed = true; 
  } else if (e.keyCode === 39 ||e.keyCode === 68) {//right
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === 32) {//fire laser
    GAME_STATE.spacePressed = true;
  }
}

//To stop moving or firing

function onKeyUp(e) {  //
  if (e.keyCode === 37 ||e.keyCode === 65) { 
    GAME_STATE.leftPressed = false; 
  } else if (e.keyCode === 39 ||e.keyCode === 68) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === 32) {
    GAME_STATE.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);