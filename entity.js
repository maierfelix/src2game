class Entity {
  constructor(
    // position
    x = 0, y = 0,
    // size
    width = 1, height = 1,
    // color
    color = "#000"
  ) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.ws = 0;
    this.hs = 0;
    this.opacity = 1;
    this.gravity = 0;
    this.width = width | 0;
    this.height = height | 0;
    this.color = color;
    this.texture = this.generateTexture();
  }
  generateTexture() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    return canvas;
  }
};
