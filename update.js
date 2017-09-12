let dcx = 0;
let dcvx = 0.00075;

function update() {
  updateDeathLines();
  updateDeadEntities();
  updateCamera();
  updateBlocks();
  updatePlayers();
  updateParticles();
};

function updateDeathLines() {
  // horizontal
  dcx += dcvx;
  dcvx += 0.00125;
  // max velo =^ 2.0
  dcvx = Math.min(dcvx, 2.0);
};

function updateDeadEntities() {
  for (let ii = 0; ii < entities.length; ++ii) {
    let entity = entities[ii];
    if (entity.dead) continue;
    if (entity.x + (entity.width / 2) <= dcx) {
      entity.opacity *= 0.0975;
    }
  };
};

function updateCamera() {
  if (!player) return;
  cx = -player.x + (width / 2);
  cy = -player.y + (height / 2);
};

function updateBlocks() {
  for (let ii = 0; ii < blocks.length; ++ii) {
    let block = blocks[ii];
    if (block.broken) {
      block.opacity *= 0.0125;
      if (block.opacity <= 0.1 && block.broken) blocks.splice(ii, 1);
    }
  };
};

function updateParticles() {
  for (let ii = 0; ii < particles.length; ++ii) {
    let pt = particles[ii];
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.opacity -= 0.05;
    if (pt.opacity < 0) {
      particles.splice(ii, 1);
    }
  };
};

function updatePlayers() {
  for (let ii = 0; ii < players.length; ++ii) {
    let entity = players[ii];
    if (entity.dead) continue;
    // gravity
    if (isBlockedAt(entity.vx, 0, entity)) entity.vx = 0;
    if (isBlockedAt(0, entity.vy, entity)) entity.vy += 0.1;
    if (!isBlockedAt(0, entity.vy, entity)) entity.vy += 0.1;
    else entity.vy = -entity.vy * 0.65;
    entity.y += entity.vy;
    entity.x += entity.vx;
    entity.vx = entity.vx * 0.75;
    if (player === entity) {
      if (
        player.y + (player.height / 2) > maxBlockY ||
        entity.x + (entity.width / 2) <= dcx
      ) {
        if (!player.dead) {
          player.kill();
        }
      }
    }
  };
};

function isBlockedAt(x, y, entity) {
  let ex = (entity.x + entity.vx) + x;
  let ey = (entity.y + entity.vy) + y;
  for (let ii = 0; ii < blocks.length; ++ii) {
    let block = blocks[ii];
    if (
      (ex < block.x + block.width) &&
      (ex + entity.width > block.x) &&
      (ey < block.y + block.height) &&
      (ey + entity.height > block.y)
    ) {
      // high speed => break block
      if ((entity.vy >= 5 || activeSatanMode()) && !block.broken) {
        block.broken = true;
        explosionAt(block.x, block.y, block.width, block.height);
        player.score++;
      }
      if (entity === player) {
        if (block.satan) {
          player.score = 666;
          highscore = "6".repeat(width);
          //player.kill();
          getGradientColor = getSatanColor;
          document.body.style.background = `rgb(20,0,0)`;
        }
        // reset jump switch
        if (block.y >= player.y + player.height) {
          player.canJump = true;
        }
        // block rewards
        if (
          block.reward &&
          player.y >= block.y + block.height
        ) {
          let velo = (Math.random() * 5) - 5;
          explosionAt(block.x, block.y, block.width, block.height);
          player.score += block.reward;
          block.reward = 0;
          player.y += 1;
          player.vy = Math.abs(5.0);
        }
      }
      return true;
    }
  };
  return false;
};
