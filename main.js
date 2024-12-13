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
  area.children[0].innerText = `Direção: ${direction}`;

  let index = 0;
  cells.forEach((td) => {
    if (index == snake) {
      td.style.background = "blue";
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

function updateSnake() {
  switch (direction) {
    case "up":
      snake[0] -= height;
      break;
    case "down":
      snake[0] += height;
      break;
    case "right":
      snake[0] += 1;
      break;
    case "left":
      snake[0] -= 1;
      break;
  }

  if (runningState) setTimeout(updateSnake, velocity);
}

function start() {
  getInput();
  drawTable();
  setTimeout(updateSnake, velocity);
}

function loop() {
  updateScreen();
}

start();
setInterval(loop, 150);
