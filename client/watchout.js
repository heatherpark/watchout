var settings = {
  w: window.innerWidth - 60,
  h: window.innerHeight - 160,
  r: 8,
  n: 15
};

var score = 0;
var highScore = 0;
var collisionCount = 0;

var addPX = function(num) {
  return num + 'px';
};

var randomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomSpotGenerator = function() {
  var x = randomNum(10, settings.w);
  var y = randomNum(10, settings.h);

  return {x: x, y: y};
};

var board = d3.select('.board')
  .append('svg')
  .attr('width', settings.w)
  .attr('height', settings.h);

var enemies = board
  .selectAll('.enemies')
  .data(d3.range(settings.n))
  .enter()
  .append('circle')
  .classed('enemies', true)
  .attr({
    r: settings.r,
    cx: 10,
    cy: 10,
    fill: '#600000',
    stroke: '#00CECE',
    'stroke-width': 1
  });

var hero = d3.select('.hero')
  .style({
    left: addPX(settings.w / 2),
    top: addPX(settings.h / 2)
  });

board.on('mousemove', function() {
  var mouse = d3.mouse(this);
  hero.style({
    left: addPX(mouse[0]),
    top: addPX(mouse[1])
  });
});

var moveEnemies = function(el) {
  var spot = randomSpotGenerator();

  el.transition()
    .delay(1000)
    .duration(1000)
    .attr({
      cx: spot.x,
      cy: spot.y
    }).each('end', function() {
      moveEnemies(d3.select(this));
    });
}

moveEnemies(enemies);

var scoreCounter = function() {
  score++;
  highScore = Math.max(score, highScore);
  d3.select('.highscore span')
    .text(highScore);
  d3.select('.current span')
    .text(score);
  d3.select('.collisions span')
    .text(collisionCount);
};

setInterval(scoreCounter, 500);

var prevCollision = false;
var count = 0;

var collisions = function() {
  var collision = false;

  enemies.each(function() {
    var x = d3.select(this).attr('cx') - +hero.style('left').replace('px', '');
    var y = d3.select(this).attr('cy') - +hero.style('top').replace('px', '');

    if (Math.sqrt(x * x + y * y) < settings.r * 2) {
      collision = true;
    }
  });

  if (collision) {
    score = 0;
    board.style('background', '#2b3135 url("imgs/boom.jpg") no-repeat center center fixed');
    if (prevCollision !== collision) {
      collisionCount++;
    } else {
      board.style('background', '#2b3135');
    }
  }

  prevCollision = collision;
};

d3.timer(collisions);
