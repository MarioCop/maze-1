let squares = [];
let targetFound = false;
let targetLocation = 0;
let maze = '';
let start = 0;
let queue;
const size = 21;
const MAX = 10;

document.addEventListener('DOMContentLoaded', () => { // On page load generate board framework
  const board = document.querySelector('.board');
  queue = new Queue();

  function createBoard() {


    for (let i = 0; i < size * size; i++) { // create board
      const square = document.createElement('div');
      square.setAttribute('id', i);
      board.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();
  loadMaze();
})



function reload() {
  location.reload();
}

function begin(){ //start BFT search
  queue.add(start)
  traverse(start)
}

function traverse(id) { // BFT Add next available square to the queue search each square in the queue till target is found
 //console.log(queue.peek())

  queue.dequeue()
  if(squares[id].classList.contains('target')){
    targetFound = true;
    targetLocation = id;
  }
  squares[id].classList.add('visited')

  if(!targetFound &&!squares[id + 1].classList.contains('wall') && !squares[id + 1].classList.contains('visited')){ // right
    queue.add(id + 1);
    squares[id + 1].setAttribute("prev", id);
  }
  if(!targetFound && !squares[id + size].classList.contains('wall') && !squares[id + size].classList.contains('visited')){ // right
    queue.add(id + size);
    squares[id + size].setAttribute("prev", id);
  }
  if(!targetFound && !squares[id - 1].classList.contains('wall') && !squares[id - 1].classList.contains('visited')){ // right
    queue.add(id - 1);
    squares[id - 1].setAttribute("prev", id);
  }
  if(!targetFound && !squares[id - size].classList.contains('wall') && !squares[id - size].classList.contains('visited')){ // right
    queue.add(id - size);
    squares[id - size].setAttribute("prev", id);
  }
  if(!targetFound) traverse(queue.peek());
  else{revealPath(targetLocation)}
}

function revealPath(id){
  try{
  squares[id].classList.add('path')
  revealPath(parseInt(squares[id].getAttribute('prev')));
  console.log("[" + id + "]")
  }catch{

  }
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function loadMaze(){ // load one of 10 mazes
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      maze = this.responseText;
    }
  };
  xhttp.open("GET", "maze"+ randomInt(MAX), true);
  xhttp.send();
  let parseMaze = maze.split(' ');
  for(let i = 0; i < size * size; i++){
    squares[i].classList.remove("wall","ghost","target","empty","path","visited");
    if (parseMaze[i] == 1) squares[i].classList.add("wall"); //black
    else if (parseMaze[i] == 2) {squares[i].classList.add("ghost"); start = i;} //red
    else if (parseMaze[i] == 3) squares[i].classList.add("target"); //yellow
    else squares[i].classList.add("empty") //grey
  }
  targetLocation = 0;
  targetFound = false;
  if(!queue.isEmpty())
  {
    while(!queue.isEmpty()) queue.dequeue();
  }
}
