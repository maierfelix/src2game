let stage = null;

let wBlockIndex = 0;
let hBlockIndex = 0;

let minBlockY = 0;
let maxBlockY = 0;

let tasks = [];

let wdir = 1;
let hdir = -1;

let highscore = 0;

const BG_COLOR = "#e1c3c3";

function addBlock(entity) {
  blocks.push(entity);
  entities.push(entity);
  if (entity.y < minBlockY) minBlockY = entity.y;
  if (entity.y > maxBlockY) maxBlockY = entity.y;
};

setInterval(function() {
  if (!tasks.length) return;
  let task = tasks.shift();
  let ww = 32; let hh = 32;
  // call
  if (task.category === Iroh.CALL) {
    let block = new Block(
      (wBlockIndex++) * ww,
      (task.indent + 1 + hBlockIndex) * hh,
      ww, hh
    );
    if (task.call === eval) {
      block.satan = true;
      block.y -= block.height * 4;
    }
    addBlock(block);
  }
  else if (task.category === Iroh.IF) {
    let block = new Block(
      (wBlockIndex--) * ww,
      (task.indent + 1 + hBlockIndex) * hh,
      ww, hh
    );
    addBlock(block);
    wBlockIndex += wdir;
    hBlockIndex += hdir;
    if (Math.random() < 0.45 && wBlockIndex > 3) {
      let block = new Block(
        (wBlockIndex) * ww,
        ((minBlockY / hh) * hh) - hh * 2,
        ww, hh
      );
      block.reward = 10;
      addBlock(block);
    }
  }
  else if (task.category === Iroh.LOOP) {

  }
}, 50);

function reset() {
  tasks = [];
  blocks = [];
  entities = [];
  particles = [];
  if (activeSatanMode()) {
    getGradientColor = getRainbowColor;
    document.body.style.background = BG_COLOR;
    highscore = 0;
  }
  // keep old player shadows
  players.map(player => {
    // make sure this windowsboy stays dead
    player.dead = true;
    entities.push(player);
  });
  timer = 0;
  cx = width / 2;
  cy = height / 2;
  player = null;
  hBlockIndex = 0;
  wBlockIndex = 0;
  maxBlockY = minBlockY = 0;
  wdir = 1;
  hdir = -1;
  dcx = 0;
  dcvx = 0.00075;
  createPlayer();
  stage = new Iroh.Stage(input.value);
  attachListeners(stage);
  // run script
  try {
    eval(stage.script);
  } catch (e) {
    let event = stage.createEvent(Iroh.PROGRAM_ERROR);
    event.indent = stage.indent;
    event.error = e;
    event.trigger("error");
  }
};

function log(e, kind) {
  /*console.log(
    " ".repeat(e.indent) + 
    getCategoryAsString(e.category),
    kind
  );*/
  tasks.push(e);
};

function getCategoryAsString(c) {
  for (let key in Iroh) {
    if (key === key.toUpperCase()) {
      if (Iroh[key] === c) return key;
    }
  };
  return null;
};

function attachListeners(stage) {

  // function call
  stage.addListener(Iroh.CALL)
  .on("before", (e) => {
    let external = e.external ? "#external" : "";
    log(e, "before");
  })
  .on("after", (e) => {
    let external = e.external ? "#external" : "";
    log(e, "after");
  });

  // function
  stage.addListener(Iroh.FUNCTION)
  .on("enter", (e) => {
    let sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) log(e, "enter");
  })
  .on("leave", (e) => {
    let sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) log(e, "leave");
  })
  .on("return", (e) => {
    let sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) log(e, "return");
  });

  // loop
  stage.addListener(Iroh.LOOP)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // if
  stage.addListener(Iroh.IF)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // else
  stage.addListener(Iroh.ELSE)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // try
  stage.addListener(Iroh.TRY)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // switch
  stage.addListener(Iroh.SWITCH)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // case
  stage.addListener(Iroh.CASE)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // catch
  stage.addListener(Iroh.CATCH)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // finally
  stage.addListener(Iroh.FINALLY)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  });

  // new
  stage.addListener(Iroh.OP_NEW)
  .on("before", (e) => {
    log(e, "before");
  })
  .on("after", (e) => {
    log(e, "after");
  });

  // program
  stage.addListener(Iroh.PROGRAM)
  .on("enter", (e) => {
    log(e, "enter");
  })
  .on("leave", (e) => {
    log(e, "leave");
  })
  .on("error", (e) => {
    log(e, "error");
  });

};

