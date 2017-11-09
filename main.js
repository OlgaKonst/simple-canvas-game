var score = document.querySelector('#score');
var btns = document.querySelectorAll('button');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var counter = 0;
var flag = false;
var timer = 50;
var rects = [];

canvas.addEventListener('click', function(e) {
  for(var i = 0; i < rects.length; i++) {
    if( e.pageX >= rects[i].x && e.pageX < (rects[i].x + 20)
        && e.pageY >= (rects[i].y+20) && e.pageY <(rects[i].y + 40)) {
      rects.splice(i, 1);
      counter++;
      score.innerText = counter;
      return;
    }
  }
});

for(var i=0; i < btns.length; i++) {
  if(btns[i].innerText === 'Start') {
    var btnStart = btns[i];
  } else if(btns[i].innerText === 'Stop') {
    var btnStop = btns[i];
  }
}

if(btnStart) {
  btnStart.addEventListener('click', function(e) {
    counter = 0;
    flag = true;
    score.innerText = counter;
  });
}

if(btnStop) {
  btnStop.addEventListener('click', function(e) {
    rects = [];
    flag = false;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  });
}

function addRect() {
  var x = Math.round(Math.random()*619);
  var color = '#' + Math.floor(Math.random()*16777215).toString(16);
  var a = Math.random();
  var speed = Math.ceil(a*10)/10;

  var rect = {
    x: x,
    y: 0,
    color: color,
    speed: speed
  }
  rects.push(rect);
}

function showRects() {
  if(timer%50 === 0 && flag === true) {
    addRect();
  }

  for(var i = 0; i < rects.length; i++) {
    ctx.fillStyle = rects[i].color;
    ctx.fillRect(rects[i].x, rects[i].y, 20, 20);
    rects[i].y =rects[i].y + rects[i].speed;
    if(rects[i].y > canvas.clientHeight) {
      rects.splice(i, 1);
    }
  }
  timer++;
}
function animate() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  showRects();
  requestAnimationFrame(animate);
}

document.body.onload = animate;