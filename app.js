let form = document.querySelector('form');
let formRadioBtns = document.querySelectorAll('form .radio');
let onePlayerBtn = formRadioBtns[0];
let twoPlayerBtn = formRadioBtns[1];
let playerInputs = document.getElementsByName('player-name');
let formSubmit = document.querySelector('#submit');
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (formRadioBtn[0].checked) console.log('one');
  if (formRadioBtn[1].checked) console.log('two');
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
  boxes.forEach((box, index) => {
    box.addEventListener('click', (e) => {
      e.preventDefault();
      if (count >= 1) {
        box.textContent = 'X';
        firstPlayer.push(index);
        if (testOneMultiples(firstPlayer) === true) {
          alert('You Won');
        }
        return count--;
      } else {
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
};
gameBoard();
