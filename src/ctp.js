'use strict';

var createWorld = function (line, column) {
  var map = new Array(line);
  for (var i = 0; i < line; i++) {
   map[i]=new Array(column);
  }
  return map;
};

var buildHtmlTable = function (world) {
  var table = document.createElement('table');
  for (var line_number = 0; line_number < world.length; line_number++) {
    const line = world[line_number];
    table.appendChild(buildHtmlLine(line, line_number));
  }
  return table;
};

var buildHtmlLine = function(line, line_number) {
  var html_line = document.createElement('tr');
  for (var cell_id = 0; cell_id < line.length; cell_id++) {
    var html_cell = document.createElement('td');
    html_cell.innerHTML = '~';
    html_cell.id = line_number + "_" + cell_id;
    html_line.appendChild(html_cell);
  }
  return html_line;
}

var createTable = function(world) {
  const table = buildHtmlTable(world);
  const text_screen = document.getElementById('text_screen');
  text_screen.appendChild(table);
};

var afficheWorld = function(world) {
  createTable(world);
};

var valide = function(world, line, column) {
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

var isPositionValide = function(world, line, column) {
  return valide(world, line, column);
};

var isFreeCell = function (world, line, column){
  if (isPositionValide(world, line, column)) {
    if (world[line][column] === undefined) {
      return true;
    }
  }
  return false;
};

var freeCells = function (world, line, column) {
  var free_cells = [];
  if (isFreeCell(world, line -1, column + 1)) free_cells.push([line - 1, column + 1]);
  if (isFreeCell(world, line -1, column    )) free_cells.push([line - 1, column]);
  if (isFreeCell(world, line -1, column - 1)) free_cells.push([line - 1, column - 1]);
  if (isFreeCell(world, line   , column + 1)) free_cells.push([line    , column + 1]);
  if (isFreeCell(world, line   , column - 1)) free_cells.push([line    , column - 1]);
  if (isFreeCell(world, line +1, column + 1)) free_cells.push([line + 1, column + 1]);
  if (isFreeCell(world, line +1, column    )) free_cells.push([line + 1, column]);
  if (isFreeCell(world, line +1, column - 1)) free_cells.push([line + 1, column - 1]);
  return free_cells;
};

if (typeof window === 'undefined') {
  module.exports.createWorld = createWorld;
  module.exports.buildHtmlTable = buildHtmlTable;
  module.exports.valide = valide;
  module.exports.freeCells = freeCells;
} else {
  window.createWorld = createWorld;
  window.afficheWorld = afficheWorld;
}
