
let keys = {};
window.addEventListener("keydown", function(e) {
  keys[e.key] = 1;
});
window.addEventListener("keyup", function(e) {
  keys[e.key] = 0;
});
setInterval(function() {
  if (player.won || player.dead) return;
  let velo = 2;
  if (keys["a"] || keys["ArrowLeft"]) {
    if (!isBlockedAt(-velo, 0, player)) player.vx -= velo;
  }
  if (keys["d"] || keys["ArrowRight"]) {
    if (!isBlockedAt(velo, 0, player)) player.vx += velo;
  }
  if (keys["w"] || keys["ArrowUp"]) {
    //if (!isBlockedAt(player.x, player.y - velo)) player.y -= velo;
  }
  if (keys["s"] || keys["ArrowDown"]) {
    //if (!isBlockedAt(player.x, player.y + velo)) player.y += velo;
  }
  if ((keys[" "] || keys["ArrowUp"] || keys["w"]) && player.canJump) {
    player.vy = -5;
    player.canJump = false;
  }
}, 1e3 / 30);

input.oninput = function(e) {
  setTimeout(function() { reset(); });
};
