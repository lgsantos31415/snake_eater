let width = 8;
let height = 8;
let numberOfCells = width * height;
let canva = document.getElementById("canva");
let area = document.getElementById("area");
let array = Array(numberOfCells).fill(0);
let snake = [0];
let cells = [];
let direction = "right";
let runningState = true;
let velocity = 750;
let apple;
let gameover = document.getElementById("gameover");
let interval;
let score = 0;
let restart = gameover.querySelector("button");

let firstColumn = [];
let lastColumn = [];
for (let y = 0; y < height; y++) {
  let index = searchTable(y, 0);
  firstColumn.push(index);
}
for (let y = 0; y < height; y++) {
  let index = searchTable(y, height - 1);
  lastColumn.push(index);
}

restart.onclick = restartFunction;

function searchTable(row, col) {
  return row * width + col;
}

function drawTable() {
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");

  for (let x = 0; x < width; x++) {
    let tr = document.createElement("tr");
    for (let y = 0; y < height; y++) {
      let td = document.createElement("td");
      td.innerText = searchTable(x, y);
      tr.appendChild(td);
      cells.push(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  canva.appendChild(table);
}

function updateScreen() {
  area.children[0].innerText = `Direction: ${direction}`;
  area.children[1].innerText = `Score: ${score}`;
  area.children[2].innerText = `Snake: ${snake}`;
  area.children[3].innerText = `Velocity: ${1000 - velocity}`;

  let index = 0;
  cells.forEach((td) => {
    if (snake.includes(index)) {
      td.style.background = "blue";
    } else if (index == apple) {
      td.style.background = "red";
    } else {
      td.style.background = "green";
    }

    index++;
  });
}

function getInput() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  });
}

function shiftValues() {
  for (let x = snake.length - 1; x > 0; x--) {
    snake[x] = snake[x - 1];
  }
}

function updateSnake() {
  shiftValues();

  switch (direction) {
    case "up":
      let upValue = snake[0] - height;
      if (upValue < 0 || snake.includes(upValue)) gameOver();
      else snake[0] = upValue;
      break;
    case "down":
      let downValue = snake[0] + height;
      if (downValue > numberOfCells - 1 || snake.includes(downValue))
        gameOver();
      else snake[0] = downValue;
      break;
    case "right":
      let rightValue = snake[0] + 1;
      if (lastColumn.includes(rightValue - 1) || snake.includes(rightValue))
        gameOver();
      else snake[0] = rightValue;
      break;
    case "left":
      let leftValue = snake[0] - 1;
      if (firstColumn.includes(leftValue + 1) || snake.includes(leftValue))
        gameOver();
      else snake[0] = leftValue;
      break;
  }

  if (runningState) setTimeout(updateSnake, velocity);
}

function generateRandomApple() {
  let randInt = Math.floor(Math.random() * numberOfCells);

  if (snake.includes(randInt)) generateRandomApple();
  else apple = randInt;
}

function addScore() {
  if (snake[0] == apple) {
    score++;
    generateRandomApple();
    snake.push(snake[0]);
    let newVel = Math.min(score * 10, 30);
    velocity = Math.max(velocity - newVel, 70);
  }
}

function gameOver() {
  clearInterval(interval);
  runningState = !runningState;
  gameover.classList.remove("invisible");
  gameover.querySelector("p").innerText = `Your score: ${score}`;
}

function restartFunction() {
  velocity = 750;
  runningState = !runningState;
  gameover.classList.add("invisible");
  interval = setInterval(loop, 150);
  setTimeout(updateSnake, velocity);
  snake = [0];
  direction = "right";
  score = 0;
}

function start() {
  getInput();
  drawTable();
  generateRandomApple();
  setTimeout(updateSnake, velocity);
  interval = setInterval(loop, 150);
}

function loop() {
  addScore();
  updateScreen();
}

start();
