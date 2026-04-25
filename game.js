let score = 0;

document.addEventListener("DOMContentLoaded", function () {
  const player = document.querySelector(".game-player");
  const gameContainer = document.querySelector(".game-container");

  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  let playerX = gameWidth / 2 - 20;
  let playerY = gameHeight / 2 - 20;

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  player.dataset.moveWidth = gameWidth;
  player.dataset.moveHeight = gameHeight;

  spawnCoin();
  setInterval(spawnCoin, 2000);
  setInterval(collectCoins, 100);
});


document.addEventListener("keydown", function (event) {
  const player = document.querySelector(".game-player");

  const moveWidth = parseFloat(player.dataset.moveWidth);
  const moveHeight = parseFloat(player.dataset.moveHeight);

  let playerX = parseInt(player.style.left);
  let playerY = parseInt(player.style.top);

  switch (event.key) {
    case "ArrowUp":
      if (playerY > 0) playerY -= 10;
      break;
    case "ArrowDown":
      if (playerY < moveHeight - 40) playerY += 10;
      break;
    case "ArrowLeft":
      if (playerX > 0) playerX -= 10;
      break;
    case "ArrowRight":
      if (playerX < moveWidth - 40) playerX += 10;
      break;
    default:
      return;
  }

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;
});

function spawnCoin() {
  const coin = document.createElement("div");
  coin.classList.add("coin");

  const gameContainer = document.querySelector(".game-container");

  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  const coinX = Math.random() * (gameWidth - 24);
  const coinY = Math.random() * (gameHeight - 24);

  coin.style.left = `${coinX}px`;
  coin.style.top = `${coinY}px`;

  gameContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 5000);
}

function collectCoins() {
  const player = document.querySelector(".game-player");
  const coins = document.querySelectorAll(".coin");
  const scoreBox = document.getElementById("score-box");
  const message = document.getElementById("message");

  coins.forEach((coin) => {
    const coinRect = coin.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.x < coinRect.x + coinRect.width &&
      playerRect.x + playerRect.width > coinRect.x &&
      playerRect.y < coinRect.y + coinRect.height &&
      playerRect.y + playerRect.height > coinRect.y
    ) {
      coin.remove();
      score++;
      scoreBox.value = score;

      const mensajes = [
        "Hwa... esta canción es para ti 💌",
        "No puedo dejar de pensar en ti...",
        "Quédate conmigo un poco más...",
        "Eres mi inspiración ✨",
      ];

      message.textContent =
        mensajes[Math.floor(Math.random() * mensajes.length)];

      if (score === 10) {
        message.textContent = "Encontraste a Seonghwa 💖";
      }
    }
  });
}
