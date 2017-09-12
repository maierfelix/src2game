function rad2deg(angle) {
  return angle * (Math.PI / 180);
};

function activeSatanMode() {
  return (getGradientColor === getSatanColor);
};

function explosionAt(x, y, ww, hh) {
  for (let ii = 0; ii < 100; ++ii) {
    let px = x + ((Math.random() * ww) - (ww / 2));
    let py = y + ((Math.random() * hh) - (hh / 2));
    let pt = new Particle(px, py, 8, 8, "#FFF");
    pt.vx = Math.random() * 2;
    pt.vy = Math.random() * 2;
    particles.push(pt);
  };
};

var velo = 1;
var rr = 127; var rrr = velo;
var rg = 12; var rrg = velo;
var rb = 108; var rrb = velo;
function getRainbowColor() {
  rr += rrr;
  if (rr >= 255) { rrr = -velo; }
  else if (rr <= 0) { rrr = velo; }
  rg += rrg;
  if (rg >= 255) { rrg = -velo; }
  else if (rg <= 0) { rrg = velo; }
  rb += rrb;
  if (rb >= 255) { rrb = -velo; }
  else if (rb <= 0) { rrb = velo; }
  return ([rr, rg, rb, velo]);
};

function getSatanColor() {
  return ([255, 0, 0, (rr / 0xff) & 0xff]);
};

let getGradientColor = getRainbowColor;
