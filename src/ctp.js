'use strict';

module.exports.createWorld = function (line, column) {
  var map = new Array(line);
  for (var i = 0; i < line; i++) {
   map[i]=new Array(column);
  }
  return map;
}
