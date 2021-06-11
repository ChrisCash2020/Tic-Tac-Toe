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
formRadioBtns.forEach((playerBtn) => {
  playerBtn.addEventListener('click', (e) => {
    playerBtn.checked
      ? (formSubmit.disabled = false)
      : (formSubmit.disabled = true);
  });
});
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  let startGame;
  twoPlayerBtn.checked ? (twoPlayerGame = true) : (twoPlayerGame = false);
  gameBoard();
  form.style.left = '-999px';
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

const gameBoard = (player) => {
  var count = 1;
  let boxes = document.querySelectorAll('.box');
  let firstPlayer = [];
  let secondPlayer = [];
  let computerPlayer = [];
  let generatedComputerChoice = () => {
    Math.round(Math.random() * 9);
  };
  let testOneMultiples = (numbers) => {
    numbers = numbers.sort((a, b) => b - a);

    let arr1 = numbers.filter((x) => x % 4 === 0);
    let arr2 = numbers.filter((x) => x % 3 === 0);
    let arr3 = numbers.filter((x) => x % 2 === 0 && x < 7 && x != 0);
    let arr4 = numbers.filter((x) => x === 1 || x == 4 || x === 7);
    let arr5 = numbers.filter((x) => x === 2 || x == 5 || x === 8);
    let arr6 = numbers.filter((x) => x === 0 || x == 1 || x === 2);
    let arr7 = numbers.filter((x) => x === 3 || x == 4 || x === 5);
    let arr8 = numbers.filter((x) => x === 6 || x == 7 || x === 8);
    return arr8.length >= 3
      ? true
      : arr7.length >= 3
      ? true
      : arr6.length >= 3
      ? true
      : arr5.length >= 3
      ? true
      : arr4.length >= 3
      ? true
      : arr3.length >= 3
      ? true
      : arr2.length >= 3
      ? true
      : arr1.length >= 3
      ? true
      : false;
  };
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
          if (testOneMultiples(firstPlayer) === true) {
            alert('You Won');
          }
          return count--;
        } else if (count < 1 && box.textContent === '') {
          box.textContent = 'O';
          secondPlayer.push(index);
          if (secondPlayer.length >= 3) {
            if (testOneMultiples(secondPlayer) === true) {
              alert('You Won');
            }
          }
          return count++;
        }
      });
    });
  } else {
    let count = 0;
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
          count++;
          firstPlayer.push(index);
          if (testOneMultiples(firstPlayer) === true) {
            alert('You Won');
          }
        }
      });
    });
  }
};
