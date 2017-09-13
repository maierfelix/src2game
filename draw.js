"use strict";

let width = window.innerWidth;
let height = window.innerHeight;

let ctx = canvas.getContext("2d");

let cx = 0;
let cy = 0;

let player = null;

let timer = 0;
let blockColor = null;

let blocks = [];
let players = [];
let entities = [];
let particles = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
};

function drawStats() {
  drawScore();
  drawHighscore();
};

function drawScore() {
  let fSize = 22;
  let str = `Score: ${activeSatanMode() ? "666" : player.score}`;
  ctx.font = `${fSize}px Consolas`;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgb(128, 128, 128)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(str, fSize / 2, fSize);
  ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
};

function drawHighscore() {
  let fSize = 22;
  let str = `Highscore: ${activeSatanMode() ? "6".repeat(width) : highscore}`;
  ctx.font = `${fSize}px Consolas`;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgb(128, 128, 128)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(str, fSize / 2, fSize + fSize);
  ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
};

function drawDeathScreen() {
  ctx.fillStyle = `rgba(0,0,0,0.5)`;
  ctx.fillRect(0, 0, width, height);
  let fSize = 90;
  let stra = "Game over";
  let strb = "U dont live da code";
  if (activeSatanMode()) {
    stra = "Hell o w0rld";
    strb = "";
  }
  ctx.font = `${fSize}px Consolas`;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgb(128, 128, 128)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.fillText(stra, (width / 2) - (ctx.measureText(stra).width / 2), height / 2);
  ctx.fillText(strb, (width / 2) - (ctx.measureText(strb).width / 2), (height / 2) + fSize);
  ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
};

function drawPlayer(entity) {
  let texture = entity.texture;
  let width = entity.width;
  let height = entity.height;
  let x = cx + entity.x;
  let y = cy + (entity.y);
  ctx.globalAlpha = entity.dead ? 0.1 : entity.opacity;
  ctx.drawImage(
    texture,
    0, 0,
    width, height,
    x, y,
    width, height
  );
  ctx.globalAlpha = 0.1;
  ctx.drawImage(
    texture,
    0, 0,
    width, height,
    x + 5, y + 3,
    width, height
  );
  ctx.globalAlpha = 1.0;
};

function drawBlock(entity, index) {
  let texture = entity.texture;
  let width = entity.width;
  let height = entity.height;
  let x = cx + (entity.x) + Math.cos(((index * 1) + timer) / 1.5);
  let y = cy + (entity.y) + Math.sin(((index * 1) + timer) / 1.5);
  let factor = activeSatanMode() ? 0.015 : 1.5;
  ctx.globalAlpha = entity.opacity / 2;
  ctx.fillStyle = `rgb(${blockColor[0]},${blockColor[1]},${blockColor[2]})`;
  if (entity.reward) ctx.fillStyle = `yellow`;
  else if (entity.satan) {
    ctx.fillStyle = `red`;
    ctx.globalAlpha = entity.opacity;
  }
  ctx.fillRect(
    x - Math.cos(((index * 10) + timer) / factor), y,
    width + Math.cos(((index * 10) + timer) / factor), height
  );
  // shadow
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#000";
  ctx.fillRect(
    x - Math.cos(((index * 10) + timer) / factor) + 5, y + 3,
    width + Math.cos(((index * 10) + timer) / factor), height
  );
  ctx.globalAlpha = 1.0;
};

function drawEntities() {
  for (let ii = 0; ii < entities.length; ++ii) {
    let entity = entities[ii];
    if (entity instanceof Player) drawPlayer(entity);
    else if (entity instanceof Block) drawBlock(entity, ii);
  };
};

function drawParticles() {
  for (let ii = 0; ii < particles.length; ++ii) {
    let pt = particles[ii];
    let texture = pt.texture;
    let width = pt.width;
    let height = pt.height;
    let x = cx + (pt.x);
    let y = cy + (pt.y);
    ctx.globalAlpha = pt.opacity;
    ctx.drawImage(
      texture,
      0, 0,
      width, height,
      x, y,
      width, height
    );
  };
  ctx.globalAlpha = 1.0;
};

function drawDeathRow() {
  ctx.fillStyle = `rgb(${blockColor[0]},${blockColor[1]},${blockColor[2]})`;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(
    0, cy + maxBlockY,
    width, height - (cy + maxBlockY)
  );
  ctx.globalAlpha = 1.0;
};

function drawDeathColumn() {
  if (!player) return;
  ctx.fillStyle = `rgb(${blockColor[0]},${blockColor[1]},${blockColor[2]})`;
  ctx.globalAlpha = 0.25;
  ctx.fillRect(
    cx, 0,
    dcx, cy + maxBlockY
  );
  ctx.globalAlpha = 1.0;
};

function clear() {
  ctx.globalAlpha = 0.05;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = `rgb(${blockColor[0]},${blockColor[1]},${blockColor[2]})`;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;
};

function draw() {
  blockColor = getGradientColor();
  timer += 0.25;
  requestAnimationFrame(draw);
  update();
  clear();
  drawDeathRow();
  drawDeathColumn();
  drawEntities();
  drawParticles();
  if (player.dead) {
    drawDeathScreen();
  }
  drawStats();
};

window.onresize = resize;
