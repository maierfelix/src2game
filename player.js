class Player extends Entity {
  constructor() {
    super(...arguments);
    this._score = 0;
    this.won = false;
    this.dead = false;
    this.canJump = true;
  }
  set score(v) {
    if (!activeSatanMode()) this._score = v;
    if (this === player) {
      if (this.score > highscore) {
        highscore = this.score;
      }
    }
  }
  get score() {
    return this._score;
  }
  kill() {
    this.dead = true;
    setTimeout(function() {
      reset();
    }, 3e3);
  }
  generateTexture() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.width / 2,
      this.height / 2,
      ((this.width / 2) + (this.height / 2)) / 2,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
    return canvas;
  }
};
