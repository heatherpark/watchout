// start slingin' some d3 here.



//function to generate random x and y coordinate

var randomSpot = function() {
  var x = randomNum(10, window.innerWidth - 60);
  var y = randomNum(110, window.innerHeight - 160);

  return [x, y];
};

var enemies = [];

for (var i = 0; i < 15; i++) {
  enemies.push(randomSpot());
}

var board = d3.select('.board').append('svg').attr('width', window.innerWidth - 50).attr('height', window.innerHeight - 130);
var enemySVG = board.selectAll('.enemies')
    .data(enemies)
    .enter()
    .append('circle')
    .classed('enemies', true)
    .attr('r', 8)
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('fill', '#600000')
    .attr('stroke', '#00CECE')
    .attr('stroke-width', 1);


function moveEnemy() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i] = randomSpot();
  }

  enemySVG.data(enemies).transition().delay(1000).duration(1000).attr('cx', function(d) {
    return d[0];
  }).attr('cy', function(d) {
    return d[1];
  });

  setTimeout(function() {
    moveEnemy();
  }, 1000);
}

moveEnemy();

var hero = [window.innerWidth / 2, window.innerHeight / 2];

var heroSVG = board.selectAll('.hero')
    .data([hero])
    .enter()
    .append('circle')
    .attr('r', 8)
    .attr('cx', function(d) {  return d[0];  })
    .attr('cy', function(d) {  return d[1];  })
    .attr('fill', '#a80000');

setInterval(function() {
console.log(enemySVG);
  var n = enemySVG[0];
    for (var i = 0; i < n.length; i++) {
      console.log(n[i]);
      var x = d3.select(n[i]).attr('cx');
      var y = d3.select(n[i]).attr('cy');
      var hx = heroSVG.attr('cx');
      var hy = heroSVG.attr('cy');

      if ((hx > x - 8 && hx < x + 8) && (hy > y - 8 && hy < y + 8)) {
        if (currentScore > highScore) {
          highScore = currentScore;
          d3.select('.highscore>span').text(highScore);
        }

        currentScore = 0;
        collisions++;
        d3.select('.current>span').text(currentScore);
        d3.select('.collisions>span').text(collisions);
      }

    }
}, 100);





//declare array of enemies - 15 enemies - tuples of [x, y]
//loop through enemies and call function on them

//insert hero element (ds.slelectALL('.hero')?)
//give static position

//apply hero dragability - using D3?

//put all elements on page with SVGs?

//check for collisions

//recursive movement and collision checking




// variables for highScore, currentScore, nCollisions
var highScore = 0;
var currentScore = 0;
var collisions = 0;

// increment currentScore by 1 every 500ms
setInterval(function() {
  currentScore++;
  d3.select('.current>span').text(currentScore);
}, 500);

// when collision is found
  // check if currentScore is higher than highScore
    // if so
      // set highScore to currentScore
  // increment nCollisions

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// d3.random.normal(3, 1)();
