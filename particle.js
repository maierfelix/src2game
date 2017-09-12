class Particle extends Entity {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.opacity = 1;
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
