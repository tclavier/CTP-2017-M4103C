const ctp = require('ctp');
var jsdom = require("jsdom");
var document = jsdom.jsdom(undefined);
global.document = document;
const assert = require('assert');

const default_world = [[undefined, undefined],
                       [undefined, undefined]];

function createFullSharkWorld() {
  const fish00 = new ctp.Shark(0,0);
  const fish01 = new ctp.Shark(0,1);
  const fish10 = new ctp.Shark(1,0);
  const fish11 = new ctp.Shark(1,1);
  var world = [[fish00, fish01],
               [fish10, fish11]];
  return world;
}

describe('Control TP', () => {
  describe('Q1', () => {
    it('createWorld should create world map initialised by Undefined', () => {
      assert.equal(undefined, ctp.createWorld(2, 2)[1][1]);
    });
    it('createWorld should create world map with good lines number', () => {
      assert.equal(2, ctp.createWorld(2, 2).length );
    });
    it('createWorld should create world map with good column number', () => {
      assert.equal(2, ctp.createWorld(2, 2)[0].length );
    });
  });

  describe('Q2', () => {
    xit('buildHtmlTable should generate a html table with u for undefined cell', () => {
      assert.equal("u", ctp.buildHtmlTable(default_world).rows[1].cells[1].innerHTML);
    });
    it('buildHtmlTable should generate a html table with good line number', () => {
      assert.equal(2, ctp.buildHtmlTable(default_world).rows.length);
    });
    it('buildHtmlTable should generate a html table with line and column in id', () => {
      assert.equal("1_0", ctp.buildHtmlTable(default_world).rows[1].cells[0].id);
    });
  });

  describe('Q3', () => {
    it('buildHtmlTable should generate a html table with ~ for undefined cell', () => {
      assert.equal("~", ctp.buildHtmlTable(default_world).rows[1].cells[1].innerHTML);
    });
  });

  describe('Q4', () => {
    it('valide should return true if point is in world', () => {
      assert.equal(true, ctp.valide(default_world, 1, 1));
    });
    it('valide should return false if point is out of world', () => {
      assert.equal(false, ctp.valide(default_world, -1, 1));
      assert.equal(false, ctp.valide(default_world, 2, 1));
      assert.equal(false, ctp.valide(default_world, 1, 4));
      assert.equal(false, ctp.valide(default_world, 0, -1));
      assert.equal(false, ctp.valide(default_world, 0, 2));
    });
  });

  describe('Q5', () => {
    it('freeCells should return all free cell around (line, column)', () => {
      assert.equal(3, ctp.freeCells(default_world, 1, 1).length);
    });
    it('freeCell should return one random free cell around (line, column)', () => {
      assert.equal(2, ctp.freeCell(default_world, 1, 1).length);
    });
  });

  describe('Q6', () => {
    it('addFish must add element in fich list', () => {
      var fishes = [];
      assert.equal(1, ctp.addFish(default_world, fishes).length);
    });
    it('addFish must create fish', () => {
      var fishes = [];
      assert.equal(true, ctp.addFish(default_world, fishes)[0] instanceof ctp.Fish);
    });
    it('addFish must create entity in random position', () => {
      var fishes = [];
      const new_fish = ctp.addFish(default_world, fishes)[0];
      const fish_pos = new_fish.getPosition();
      assert.equal(true, ctp.valide(default_world, fish_pos[0], fish_pos[1]));
    });
  });

  describe('Q7', () => {
    it('moveAnimal should move fish to new position', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      const old_position = fish.getPosition();
      ctp.moveAnimal(world, fish);
      const new_position = fish.getPosition();
      assert.equal(false, JSON.stringify(old_position) == JSON.stringify(new_position));
    });
    it('moveAnimal should move fish in world', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      const old_position = fish.getPosition();
      ctp.moveAnimal(world, fish);
      const new_position = fish.getPosition();
      assert.equal(undefined, ctp.getElementInPosition(world, old_position));
      assert.equal(fish, ctp.getElementInPosition(world, new_position));
    });
    it('addFish should register fish in world', () => {
      var fishes = [];
      var world = [[undefined, undefined],
                   [undefined, undefined]];
      const new_fish = ctp.addFish(world, fishes)[0];
      const fish_pos = new_fish.getPosition();
      assert.equal(new_fish, ctp.getElementInPosition(world, fish_pos));
    });
    it('moveAllFish should move all fish in world', () => {
      var world = [[undefined, undefined],
                   [undefined, undefined]];
      var fishes = ctp.addFish(world, []);
      assert.equal(1, fishes.length)
      const fish = fishes[0];
      const old_pos = fish.getPosition();
      ctp.moveAllFish(world, fishes);
      const new_pos = fish.getPosition();
      assert.equal(false, JSON.stringify(old_pos) == JSON.stringify(new_pos));
    });
  });
  describe('Q9', () => {
    it('Fish should have a getSymbol function', () => {
      const fish = new ctp.Fish(0,0);
      assert.equal("F", fish.getSymbol());
    });
    it('Shark should have a getSymbol function', () => {
      const fish = new ctp.Shark(0,0);
      assert.equal("S", fish.getSymbol());
    });
  });
  describe('Q10', () => {
    it('buildHtmlTable should generate a html table with P for fish cell', () => {
      const fish = new ctp.Fish(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      assert.equal("F", ctp.buildHtmlTable(world).rows[0].cells[0].innerHTML);
    });
    it('buildHtmlTable should generate a html table with S for shark cell', () => {
      const fish = new ctp.Shark(0,0);
      var world = [[fish, undefined],
                   [undefined, undefined]];
      assert.equal("S", ctp.buildHtmlTable(world).rows[0].cells[0].innerHTML);
    });
  });
  describe('Q11', () => {
    it('moveAnimal should stay fish in place when no free cell around', () => {
      const fish00 = new ctp.Fish(0,0);
      const fish01 = new ctp.Fish(0,1);
      const fish10 = new ctp.Fish(1,0);
      const fish11 = new ctp.Fish(1,1);
      var world = [[fish00, fish01],
                   [fish10, fish11]];
      ctp.moveAnimal(world, fish00);
      assert.equal("[0,0]", JSON.stringify(fish00.getPosition()));
    });
    it('addFish should not add fish when no free cell', () => {
      var world = createFullSharkWorld();
      const fishes = ctp.addFish(world, [])
      assert.equal(0, fishes.length);
    });
    it('moveAllShark should move all shark in world', () => {
      const shark = new ctp.Shark(0,0);
      var world = [[shark, undefined],
                   [undefined, undefined]];
      const old_pos = shark.getPosition();
      ctp.moveAllShark(world);
      const new_pos = shark.getPosition();
      assert.equal(false, JSON.stringify(old_pos) == JSON.stringify(new_pos));
    });
  });
  describe('Q12', () => {
    it('moveAllShark should eat fish if possible', () => {
      const shark = new ctp.Shark(0,0);
      const fish = new ctp.Fish(1,1);
      var world = [[shark, undefined],
                   [undefined, fish]];
      const old_pos = shark.getPosition();
      ctp.moveAllShark(world);
      const new_pos = shark.getPosition();
      assert.equal("[1,1]", JSON.stringify(new_pos));
    });
    it('findFishes should find all fish around position', () => {
      const fish = new ctp.Fish(1,1);
      var world = [[undefined, undefined],
                   [undefined, fish]];
      const fishes = ctp.findFishes(world, [0,0]);
      assert.equal("[1,1]", JSON.stringify(fishes[0]));
    });
  });
  describe('Q13', () => {
    it('fish will reproduce each turn', () => {
      var fish = new ctp.Fish(1,1);
      fish.reproduce = 1;
      var world = [[undefined, undefined],
                   [undefined, fish]];
      ctp.reproduce(world);
      assert.equal(2, ctp.getFishList(world).length);
    });
    it('fish will not reproduce when world is full', () => {
      var fish1 = new ctp.Fish(0,0);
      var fish2 = new ctp.Fish(0,1);
      var fish3 = new ctp.Fish(1,0);
      var fish4 = new ctp.Fish(1,1);
      fish1.reproduce = 1;
      var world = [[fish1, fish2],
                   [fish3, fish4]];
      ctp.reproduce(world);
      assert.equal(4, ctp.getFishList(world).length);
    });
    it('shark will reproduce after 3 turn', () => {
      var shark = new ctp.Shark(1,1);
      shark.reproduce = 3;
      var world = [[undefined, undefined],
                   [undefined, shark]];
      ctp.reproduce(world);
      ctp.reproduce(world);
      ctp.reproduce(world);
      assert.equal(2, ctp.getSharkList(world).length);
    });
  });
});
