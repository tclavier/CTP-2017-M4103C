'use strict';

const createWorld = function (line, column) {
  var map = new Array(line);
  for (var i = 0; i < line; i++) {
   map[i]=new Array(column);
  }
  return map;
};

const countLinesOfWorld = function(world) {
  return world.length;
}

const countRowsOfWorld = function(world) {
  if (countLinesOfWorld(world) > 0) {
    return world[0].length;
  } else {
    return 0;
  }
}

const buildHtmlTable = function (world) {
  var table = document.createElement('table');
  for (var line_number = 0; line_number < world.length; line_number++) {
    const line = world[line_number];
    table.appendChild(buildHtmlLine(line, line_number));
  }
  return table;
};

const buildHtmlLine = function(line, line_number) {
  var html_line = document.createElement('tr');
  for (var cell_id = 0; cell_id < line.length; cell_id++) {
    var html_cell = document.createElement('td');
    if (line[cell_id] == undefined) {
      html_cell.innerHTML = '~';
    } else {
      html_cell.innerHTML = line[cell_id].getSymbol();
    }
    html_cell.id = line_number + "_" + cell_id;
    html_line.appendChild(html_cell);
  }
  return html_line;
}

const createTable = function(world) {
  const table = buildHtmlTable(world);
  const text_screen = document.getElementById('text_screen');
  text_screen.appendChild(table);
};

const afficheWorld = function(world) {
  createTable(world);
};

const showFichNumber = function(fishes) {
  const fish_number = document.getElementById('fish_number');
  fish_number.innerHTML = fishes.length;
};

const showSharkNumber = function(world) {
  const shark_number = document.getElementById('shark_number');
  shark_number.innerHTML = getSharkList(world).length;
};

const resetScreen = function () {
  const text_screen = document.getElementById('text_screen');
  text_screen.innerHTML = '';
};


const valide = function(world, line, column) {
  var in_world = true;
  if (world[line]) {
    var max_column  = world[line].length;
    if (column < 0 || column >= max_column ) {
      in_world = false;
    }
  } else {
    in_world = false;
  }
  return in_world;
};

const isPositionValide = function(world, position) {
  return valide(world, position[0], position[1]);
};

const isFreeCell = function (world, line, column){
  if (isPositionValide(world, [line, column])) {
    if (world[line][column] === undefined) {
      return true;
    }
  }
  return false;
};

const isFishCell = function (world, line, column){
  if (isPositionValide(world, [line, column])) {
    if (world[line][column] instanceof Fish ) {
      return true;
    }
  }
  return false;
};

const freeCells = function (world, line, column) {
  var free_cells = [];
  if (isFreeCell(world, line -1, column + 1)) free_cells.push([line - 1, column + 1]);
  if (isFreeCell(world, line -1, column    )) free_cells.push([line - 1, column    ]);
  if (isFreeCell(world, line -1, column - 1)) free_cells.push([line - 1, column - 1]);
  if (isFreeCell(world, line   , column + 1)) free_cells.push([line    , column + 1]);
  if (isFreeCell(world, line   , column - 1)) free_cells.push([line    , column - 1]);
  if (isFreeCell(world, line +1, column + 1)) free_cells.push([line + 1, column + 1]);
  if (isFreeCell(world, line +1, column    )) free_cells.push([line + 1, column    ]);
  if (isFreeCell(world, line +1, column - 1)) free_cells.push([line + 1, column - 1]);
  return free_cells;
};

const findFishes = function (world, position) {
  const line = position[0];
  const column = position[1];
  var fishes = [];
  if (isFishCell(world, line -1, column + 1)) fishes.push([line - 1, column + 1]);
  if (isFishCell(world, line -1, column    )) fishes.push([line - 1, column    ]);
  if (isFishCell(world, line -1, column - 1)) fishes.push([line - 1, column - 1]);
  if (isFishCell(world, line   , column + 1)) fishes.push([line    , column + 1]);
  if (isFishCell(world, line   , column - 1)) fishes.push([line    , column - 1]);
  if (isFishCell(world, line +1, column + 1)) fishes.push([line + 1, column + 1]);
  if (isFishCell(world, line +1, column    )) fishes.push([line + 1, column    ]);
  if (isFishCell(world, line +1, column - 1)) fishes.push([line + 1, column - 1]);
  return fishes;
};

const freeCell = function (world, line, column) {
  var cells = freeCells(world, line, column);
  const i = Math.floor(Math.random() * cells.length);
  return cells[i];
};

var Fish = function(line, column) {
  this.line = line;
  this.column = column;
  this.getPosition = function() {
    return [this.line, this.column];
  };
  this.setPosition = function(position) {
    this.line = position[0];
    this.column = position[1];
  };
  this.getSymbol = function () {
    return "F";
  };
};

var Shark = function(line, column) {
  this.line = line;
  this.column = column;
  this.getPosition = function() {
    return [this.line, this.column];
  };
  this.setPosition = function(position) {
    this.line = position[0];
    this.column = position[1];
  };
  this.getSymbol = function () {
    return "S";
  };
};

const moveAnimal = function (world, fish) {
  const old_position = fish.getPosition();
  const new_position = freeCell(world,old_position[0], old_position[1]);
  if (new_position != undefined) {
    fish.setPosition(new_position);
    setElementInPosition(world, old_position, undefined);
    setElementInPosition(world, new_position, fish);
  }
};
const getRandomPosition = function(world) {
    const line = Math.floor(Math.random() * countLinesOfWorld(world))
    const row = Math.floor(Math.random() * countRowsOfWorld(world))
    return freeCell(world,line, row);
}

const addFish = function (world, fishes, random=false) {
  var new_position;
  if (random) {
    new_position = getRandomPosition(world)
  } else {
    new_position = freeCell(world,0,0);
  }

  if (new_position != undefined) {
    var fish = new Fish(new_position[0], new_position[1]);
    setElementInPosition(world, new_position, fish);
    fishes.push(fish);
  }
  return fishes;;
};

const getElementInPosition = function (world, position) {
  return world[position[0]][position[1]]
};

const setElementInPosition = function (world, position, element) {
  world[position[0]][position[1]] = element;
};

const moveAllFish = function (world, fishes) {
  fishes.forEach(function(fish){
    moveAnimal(world, fish);
  });
}

const getSharkList = function (world) {
  return [].concat.apply([], world).filter(function(item){return item instanceof Shark})
}

const getFishList = function (world) {
  return [].concat.apply([], world).filter(function(item){return item instanceof Fish})
}

const eatFish = function (world, shark) {
  const old_position = shark.getPosition();
  const fishes = findFishes(world,old_position);
  var new_position = undefined;
  if (fishes && fishes.length >= 1) {
    new_position = fishes[0];
    shark.setPosition(new_position);
    setElementInPosition(world, old_position, undefined);
    setElementInPosition(world, new_position, shark);
    return true;
  }
  return false;
}

const moveAllShark = function (world) {
  const sharks = getSharkList(world);
  sharks.forEach(function(shark){
    if (! eatFish(world, shark)) {
      moveAnimal(world, shark);
    }
  });
}

const step = function (world, fishes) {
  moveAllFish(world, fishes);
  moveAllShark(world);
  fishes = getFishList(world);
  resetScreen();
  afficheWorld(world);
  showFichNumber(fishes)
  showSharkNumber(world)
};

if (typeof window === 'undefined') {
  module.exports.createWorld = createWorld;;
  module.exports.buildHtmlTable = buildHtmlTable;
  module.exports.valide = valide;
  module.exports.freeCells = freeCells;
  module.exports.findFishes = findFishes;
  module.exports.freeCell = freeCell;
  module.exports.addFish = addFish;
  module.exports.Fish = Fish;
  module.exports.Shark = Shark;
  module.exports.moveAnimal = moveAnimal;
  module.exports.moveAllFish = moveAllFish;
  module.exports.moveAllShark = moveAllShark;
  module.exports.getElementInPosition = getElementInPosition;
} else {
  window.createWorld = createWorld;
  window.afficheWorld = afficheWorld;
  window.step = step;
  window.Fish = Fish;
  window.getRandomPosition = getRandomPosition;
  window.setElementInPosition = setElementInPosition;
}
