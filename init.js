function createPlayer() {
  player = new Player(
    32,
    -32,
    32, 32,
    "blue"
  );
  player.opacity = 0.5;
  players.push(player);
  entities.push(player);
  window.player = player;
};

(function init() {
  resize();
  reset();
  draw();
})();
