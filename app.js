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
});
form.addEventListener('click', (e) => {
  if (onePlayerBtn.checked || playerInputs[0].click()) {
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
  let boxes = document.querySelectorAll('.box');
  let firstPlayer = [];
  let secondPlayer = [];
  let computerPlayer = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
    let length = computerPlayer.length - 1;
    if (length >= 0) {
      let random = Math.round(Math.random() * length);
      boxes[computerPlayer[random]].textContent = 'O';
      array.push(computerPlayer[random]);
      computerPlayer.splice(computerPlayer.indexOf(computerPlayer[random]), 1);
      if (winnerChecker(array) === true) {
        alert('Computer Won');
      }
    }
  };
  let updateScore = () => {};
  if (twoPlayerGame == true) {
    playerText.textContent = `${
      playerInputs[1].value === '' ? 'Player 1' : playerInputs[1].value
    }`;
    playerText2.textContent = `${
      playerInputs[2].value === '' ? 'Player 2' : playerInputs[2].value
    }`;
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
          firstPlayer.push(index);
          if (winnerChecker(firstPlayer) === true) {
            alert('You Won');
          }
          return count--;
        } else if (count < 1 && box.textContent === '') {
          box.textContent = 'O';
          secondPlayer.push(index);
          if (secondPlayer.length >= 3) {
            if (winnerChecker(secondPlayer) === true) {
              alert('You Won');
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
          computerPlayer.splice(computerPlayer.indexOf(index), 1);
          firstPlayer.push(index);
          if (winnerChecker(firstPlayer) === true) {
            alert('You Won');
          }
        }
        generatedComputerChoice(secondPlayer);
      });
    });
  }
};
