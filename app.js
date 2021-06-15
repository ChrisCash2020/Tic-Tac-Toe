let body = document.querySelector('body');
let form = document.querySelector('form');
let formRadioBtns = document.querySelectorAll('form .radio');
let onePlayerBtn = formRadioBtns[0];
let twoPlayerBtn = formRadioBtns[1];
let playerInputs = document.getElementsByName('player-name');
let formSubmit = document.querySelector('#submit');
let twoPlayerGame = false;
let playerText = document.getElementById('one');
let playerText2 = document.getElementById('two');
let IconChange = document.querySelector('.icon-change');
let errorMsg = document.querySelector('.error-msg');
let openBoard = document.querySelector('.board-toggle');
let scoreBoard = document.querySelector('.score-board');
let removeBoard = document.querySelector('.remove');
let mainContainer = document.querySelector('.main');
let winnerBox = document.querySelector('.winner-box');
let optionInputs = document.querySelectorAll('.options input');
let scoreCounters = document.querySelectorAll('.score-counter');
let boxes = document.querySelectorAll('.box');
let scoreBoardNames = document.querySelectorAll('.score-box h2');
let gameStart = false;
let ply1 = 0;
let ply2 = 0;
let round = 1;
openBoard.addEventListener('click', (e) => {
  scoreBoard.style.animation = 'var(--slide-board)';
  mainContainer.style.animation = 'var(--slide-main)';
});
removeBoard.addEventListener('click', (e) => {
  scoreBoard.style.animation = 'var(--reverse-board)';
  mainContainer.style.animation = 'var(--reverse-main)';
});
formRadioBtns.forEach((playerBtn) => {
  playerBtn.addEventListener('click', (e) => {
    playerBtn.checked
      ? (formSubmit.disabled = false)
      : (formSubmit.disabled = true);
  });
});
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  twoPlayerBtn.checked ? (twoPlayerGame = true) : (twoPlayerGame = false);
  gameBoard();
  form.style.left = '-9999px';
  openBoard.style.visibility = 'visible';
});
form.addEventListener('click', (e) => {
  if (onePlayerBtn.checked) {
    playerInputs[0].disabled = false;
  } else if (!onePlayerBtn.checked) {
    playerInputs[0].disabled = true;
  }
  if (twoPlayerBtn.checked) {
    playerInputs[1].disabled = false;
    playerInputs[2].disabled = false;
  } else if (!twoPlayerBtn.checked) {
    playerInputs[1].disabled = true;
    playerInputs[2].disabled = true;
  }
});
const gameBoard = () => {
  let count = 1;
  let firstPlayer = [];
  let secondPlayer = [];
  let computerPlayer = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let animate = (x) => {
    if (x.textContent == 'X') {
      playerText.parentElement.style.transform = 'scale(1.15)';
      playerText.parentElement.style.borderColor = '#40c9ff';
      playerText2.parentElement.style.transform = 'scale(0.9)';
      playerText2.parentElement.style.borderColor = '#ccc';
    } else if (x.textContent == 'O') {
      playerText2.parentElement.style.transform = 'scale(1.15)';
      playerText2.parentElement.style.borderColor = '#40c9ff';
      playerText.parentElement.style.transform = 'scale(0.9)';
      playerText.parentElement.style.borderColor = '#ccc';
    }
  };
  let winnerChecker = (numbers) => {
    let checker = (arr, target) => target.every((v) => arr.includes(v));
    return checker(numbers, [0, 1, 2]) === true
      ? true
      : checker(numbers, [3, 4, 5]) === true
      ? true
      : checker(numbers, [6, 7, 8]) === true
      ? true
      : checker(numbers, [0, 3, 6]) === true
      ? true
      : checker(numbers, [1, 4, 7]) === true
      ? true
      : checker(numbers, [2, 5, 8]) === true
      ? true
      : checker(numbers, [0, 4, 8]) === true
      ? true
      : checker(numbers, [2, 4, 6]) === true
      ? true
      : false;
  };
  let generatedComputerChoice = (array) => {
    setTimeout(function () {
      let length = computerPlayer.length - 1;
      if (length >= 0 && winnerChecker(firstPlayer) === false) {
        let random = Math.round(Math.random() * length);
        boxes[computerPlayer[random]].textContent = 'O';
        animate(boxes[computerPlayer[random]]);
        array.push(computerPlayer[random]);
        computerPlayer.splice(
          computerPlayer.indexOf(computerPlayer[random]),
          1
        );
      }
    }, 450);

    if (winnerChecker(array) === true) {
      ply2++;
      winnerBox.firstElementChild.textContent = `You Lose!`;
      updateScore();
    }
  };
  let updateScore = () => {
    scoreCounters[0].textContent = `${ply1}`;
    scoreCounters[1].textContent = `${ply2}`;
    winnerBox.style.left = '50%';
    mainContainer.style.setProperty('--blur', 'blur(2px)');
  };
  if (gameStart === true) {
    boxes.every((box) => {
      if (
        (box.textContent != '' && winnerChecker(firstPlayer) === false) ||
        winnerChecker(secondPlayer) === false
      ) {
        winnerBox.firstElementChild.textContent = `Its a Tie!`;
        updateScore();
      }
    });
  }

  if (twoPlayerGame == true) {
    gameStart = true;
    playerText.textContent = `${
      playerInputs[1].value === '' ? 'Player 1' : playerInputs[1].value
    }`;
    playerText2.textContent = `${
      playerInputs[2].value === '' ? 'Player 2' : playerInputs[2].value
    }`;
    scoreBoardNames[0].textContent = `${playerText.textContent}`;
    scoreBoardNames[1].textContent = `${playerText2.textContent}`;
    if (IconChange.classList.contains('fa-robot')) {
      IconChange.classList.remove('fa-robot');
      IconChange.classList.add('fa-user');
    } else {
      IconChange.style.color = 'orangered';
    }
    boxes.forEach((box, index) => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        if (count >= 1 && box.textContent === '') {
          box.textContent = 'X';
          animate(box);
          firstPlayer.push(index);
          if (winnerChecker(firstPlayer) === true) {
            ply1++;
            winnerBox.firstElementChild.textContent = `${playerText.textContent} wins`;
            updateScore();
          }
          return count--;
        } else if (count < 1 && box.textContent === '') {
          box.textContent = 'O';
          animate(box);
          secondPlayer.push(index);
          if (secondPlayer.length >= 3) {
            if (winnerChecker(secondPlayer) === true) {
              ply2++;
              winnerBox.firstElementChild.textContent = `${playerText2.textContent} wins`;
              updateScore();
            }
          }
          return count++;
        }
      });
    });
  } else {
    playerText.textContent = `${
      playerInputs[0].value === '' ? 'Player 1' : playerInputs[0].value
    }`;
    scoreBoardNames[0].textContent = `${playerText.textContent}`;
    if (IconChange.classList.contains('fa-user')) {
      IconChange.classList.remove('fa-user');
      IconChange.classList.add('fa-robot');
      IconChange.style.color = '#40c9ff';
    }
    boxes.forEach((box, index) => {
      box.addEventListener('click', (e) => {
        e.preventDefault();
        if (box.textContent === '') {
          box.textContent = 'X';
          animate(box);
          computerPlayer.splice(computerPlayer.indexOf(index), 1);
          firstPlayer.push(index);
          if (winnerChecker(firstPlayer) === true) {
            ply1++;
            winnerBox.firstElementChild.textContent = `${playerText.textContent} wins`;
            updateScore();
          }
        }
        generatedComputerChoice(secondPlayer);
      });
    });
  }
  optionInputs[0].addEventListener('click', (e) => {
    e.preventDefault();
    round++;
    boxes.forEach((box) => (box.textContent = ''));
    firstPlayer = [];
    secondPlayer = [];
    computerPlayer = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    scoreBoard.children[5].textContent = `Round ${round}`;
    winnerBox.style.left = '-9999px';
    mainContainer.style.setProperty('--blur', null);
  });
  optionInputs[1].addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
};
