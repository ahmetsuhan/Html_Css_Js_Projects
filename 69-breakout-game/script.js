const App = (function () {
  const DOMSelectors = {
    body: document.body,
    rulesBtn: document.getElementById("rules-btn"),
    closeBtn: document.getElementById("close-btn"),
    rules: document.getElementById("rules"),
    rulesContainer: document.getElementById("rules-container"),
    canvas: document.getElementById("canvas"),
  };

  function getCanvasHeight() {
    return DOMSelectors.canvas.height;
  }
  function getCanvasWidth() {
    return DOMSelectors.canvas.width;
  }

  function getCanvasContext() {
    return DOMSelectors.canvas.getContext("2d");
  }

  const STATE = {
    score: 0,
    brickRowCount: 9,
    brickColumnCount: 5,
    ballProps: {
      x: getCanvasWidth() / 2,
      y: getCanvasHeight() / 2,
      size: 10,
      speed: 4,
      dx: 4,
      dy: -4,
    },
    paddleProps: {
      x: getCanvasWidth() / 2 - 40,
      y: getCanvasHeight() - 20,
      w: 80,
      h: 10,
      speed: 8,
      dx: 0,
    },
    bricks: [],
    brickInfo: {
      w: 70,
      h: 20,
      padding: 10,
      offsetX: 45,
      offsetY: 60,
      visible: true,
    },
  };

  function createBricks(brickRowCount, brickColumnCount) {
    for (let i = 0; i < brickRowCount; i++) {
      STATE.bricks[i] = [];
      for (let j = 0; j < brickColumnCount; j++) {
        const x =
          i * (STATE.brickInfo.w + STATE.brickInfo.padding) +
          STATE.brickInfo.offsetX;
        const y =
          j * (STATE.brickInfo.h + STATE.brickInfo.padding) +
          STATE.brickInfo.offsetY;
        STATE.bricks[i][j] = { x, y, ...STATE.brickInfo };
      }
    }
  }
  function drawScore() {
    const ctx = getCanvasContext();
    ctx.font = "20px Arial";
    ctx.fillText(`Score ${STATE.score}`, canvas.width - 100, 30);
  }

  function drawPaddle() {
    const { paddleProps: paddle } = STATE;
    const ctx = getCanvasContext();
    ctx.beginPath();

    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = "#0095dd";
    ctx.fill();

    ctx.closePath();
  }
  function drawBall() {
    const { ballProps } = STATE;

    const ctx = getCanvasContext();
    ctx.beginPath();
    ctx.arc(ballProps.x, ballProps.y, ballProps.size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    const ctx = getCanvasContext();
    STATE.bricks.forEach((column) => {
      column.forEach((brick) => {
        ctx.beginPath();

        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  function clearCanvas() {
    const ctx = getCanvasContext();
    ctx.clearRect(0, 0, getCanvasWidth(), getCanvasHeight());
  }

  function draw() {
    clearCanvas();
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }

  function movePaddle() {
    const { paddleProps } = STATE;
    paddleProps.x += paddleProps.dx;
    if (paddleProps.x + paddleProps.w > canvas.width) {
      paddleProps.x = canvas.width - paddleProps.w;
    }

    if (paddleProps.x < 0) {
      paddleProps.x = 0;
    }
  }

  function moveBall() {
    const { ballProps } = STATE;
    const canvasWidth = getCanvasWidth();
    const canvasHeight = getCanvasHeight();

    ballProps.x += ballProps.dx;
    ballProps.y += ballProps.dy;

    if (
      ballProps.x + ballProps.size > canvasWidth ||
      ballProps.x - ballProps.size < 0
    ) {
      ballProps.dx *= -1;
    }

    if (
      ballProps.y + ballProps.size > canvasHeight ||
      ballProps.y - ballProps.size < 0
    ) {
      ballProps.dy *= -1;
    }

    //paddle collision
    managePaddleCollision();

    manageBrickCollision();

    // hit bottom wall --> lose
    manageBallOutOfArea();
  }

  function changeBallDirectionVertically() {
    const { ballProps } = STATE;
    ballProps.dy = -ballProps.speed;
  }

  function managePaddleCollision() {
    const anyCollision = isBallCollideWithPaddle();

    if (anyCollision) {
      changeBallDirectionVertically();
    }
  }

  function isBallCollideWithPaddle() {
    const { ballProps, paddleProps } = STATE;

    return (
      ballProps.x - ballProps.size > paddleProps.x &&
      ballProps.x + ballProps.size < paddleProps.x + paddleProps.w &&
      ballProps.y + ballProps.size > paddleProps.y
    );
  }

  function manageBallOutOfArea() {
    const isBallOut = isBallOutOfGameArea();

    if (isBallOut) {
      showAllBricks();
      resetScore();
    }
  }

  function isBallOutOfGameArea() {
    const { ballProps } = STATE;
    const canvasHeight = getCanvasHeight();
    return ballProps.y + ballProps.size > canvasHeight;
  }

  function checkBrickIsVisible(brick) {
    return brick.visible;
  }

  function checkIsBallCollideWithBrick(brick) {
    const { ballProps } = STATE;
    return (
      ballProps.x - ballProps.size > brick.x &&
      ballProps.x + ballProps.size < brick.x + brick.w &&
      ballProps.y + ballProps.size > brick.y &&
      ballProps.y - ballProps.size < brick.y + brick.h
    );
  }

  function reverseBallVertically() {
    const { ballProps } = STATE;
    ballProps.dy *= -1;
  }
  function hideBrick(brick) {
    brick.visible = false;
  }
  function showBrick(brick) {
    brick.visible = true;
  }

  function manageBrickCollision() {
    STATE.bricks.forEach((column) => {
      column.forEach((brick) => {
        const isVisible = checkBrickIsVisible(brick);
        if (isVisible) {
          const anyCollision = checkIsBallCollideWithBrick(brick);
          if (anyCollision) {
            reverseBallVertically();
            hideBrick(brick);

            increaseScore();
          }
        }
      });
    });
  }

  function resetScore() {
    STATE.score = 0;
  }

  function increaseScore() {
    STATE.score++;
    if (STATE.score % (STATE.brickRowCount * STATE.brickRowCount) === 0) {
      showAllBricks();
    }
  }

  function showAllBricks() {
    STATE.bricks.forEach((column) => {
      column.forEach((brick) => {
        showBrick(brick);
      });
    });
  }

  function update() {
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
  }

  function attachEvents() {
    const { body, closeBtn, rulesBtn, rules, rulesContainer } = DOMSelectors;

    body.addEventListener("click", function (e) {
      if (e.target.contains(rulesContainer)) {
        rules.classList.remove("show");
      }
    });
    closeBtn.addEventListener("click", function (e) {
      rules.classList.remove("show");
    });

    rulesBtn.addEventListener("click", function (e) {
      rules.classList.add("show");
    });

    function keyDownHandler(e) {
      const { paddleProps } = STATE;

      if (
        e.key === "ArrowRight" ||
        e.key === "Right" ||
        e.key === "d" ||
        e.key === "D"
      ) {
        paddleProps.dx = paddleProps.speed;
      } else if (
        e.key === "Left" ||
        e.key === "ArrowLeft" ||
        e.key === "a" ||
        e.key === "A"
      ) {
        paddleProps.dx = -paddleProps.speed;
      }
    }
    function keyUpHandler(e) {
      const { paddleProps } = STATE;
      if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft" ||
        e.key === "d" ||
        e.key === "D" ||
        e.key === "a" ||
        e.key === "A"
      ) {
        paddleProps.dx = 0;
      }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
  }

  return {
    init: function () {
      createBricks(STATE.brickRowCount, STATE.brickColumnCount);
      update();
      attachEvents();
    },
  };
})();

window.addEventListener("DOMContentLoaded", App.init);
