const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'image/ground.png';

const foodImg = new Image();
foodImg.src = 'image/food2.png';

const player = new Image();
player.src = 'image/player.png';

let box = 32;
let score = 0;
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

let dir;

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
  else if (event.keyCode == 65 && dir != "right")
    dir = "left";
  else if (event.keyCode == 87 && dir != "down")
    dir = "up";
  else if (event.keyCode == 68 && dir != "left")
    dir = "right";
  else if (event.keyCode == 83 && dir != "up")
    dir = "down";
}

// function ealTail (head, arr) { 
//   for(let i = 0; i < arr.length; i++) {
//     if (head.x == arr[i].x && head.y == arr[i].y )
//     clearInterval(game);
//   }
// }

function drawGameOver() {
  // Создаем элементы для сообщения о конце игры и кнопки перезапуска
  let gameOverDiv = document.createElement('div');
  let message = document.createElement('h1');
  let restartButton = document.createElement('button');
  let scoreDisplay = document.createElement('p');

  // Задаем текст сообщения
  message.textContent = 'Конец игры';

  // Задаем текст кнопки перезапуска
  restartButton.textContent = 'Нажмите "F5", чтобы перезапустить';

  // Задаем текст счетчика
  scoreDisplay.textContent = `Твой результат: ${score}`;

  // Добавляем стили элементам
  gameOverDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Задаем полупрозрачный черный цвет фона
  gameOverDiv.style.color = 'white';
  gameOverDiv.style.textAlign = 'center';
  gameOverDiv.style.position = 'fixed';
  gameOverDiv.style.width = '100vw'; // Занимает всю ширину окна браузера
  gameOverDiv.style.height = '100vh'; // Занимает всю высоту окна браузера
  gameOverDiv.style.top = '0';
  gameOverDiv.style.left = '0';
  gameOverDiv.style.display = 'flex';
  gameOverDiv.style.flexDirection = 'column';
  gameOverDiv.style.justifyContent = 'center';
  gameOverDiv.style.alignItems = 'center';
  message.style.fontSize = '40px';
  restartButton.style.fontSize = '20px';
  restartButton.style.marginTop = '20px'; // Добавляем немного отступа между сообщением и кнопкой
  restartButton.style.border = '20px';
  scoreDisplay.style.fontSize = '24px';
  scoreDisplay.style.marginTop = '20px'; // Добавляем немного отступа между кнопкой и счетчиком

  // Добавляем элементы на страницу
  gameOverDiv.appendChild(message);
  gameOverDiv.appendChild(scoreDisplay);
  gameOverDiv.appendChild(restartButton);
  document.body.appendChild(gameOverDiv);

  // Устанавливаем обработчик события для кнопки перезапуска
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 116) { // Код клавиши F5
      restartGame();
    }
  });
}

function restartGame() {
  snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box
  };
  dir = undefined;
  score = 0;
  food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
  };
  game = setInterval(drawGame, 100);
}

function checkBoundaryCollision() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game);
    drawGameOver();
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        restartGame();
      }
    });
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y, box, box);
  for (let i = 0; i < snake.length; i++) {
    ctx.drawImage(player, snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = 'White';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // ealTail(newHead,snake);

  snake.unshift(newHead);
  checkBoundaryCollision();
}

let game = setInterval(drawGame, 100);
