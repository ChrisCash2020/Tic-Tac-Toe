const gameBoard = (player) => {
  var count = 1;
  let boxes = document.querySelectorAll('.box');
  let firstPlayer = [];
  let secondPlayer = [];
  let multiplesOf = (numbers, multiple) => {
    numbers.filter((x) => x % multiple === 0);
    return numbers.length;
  };
  boxes.forEach((box, index) => {
    box.addEventListener('click', (e) => {
      e.preventDefault();
      if (count >= 1) {
        box.textContent = 'X';
        firstPlayer.push(index);
        if (firstPlayer.length >= 3) {
          if (multiplesOf(firstPlayer, 4) == 3) {
            alert('You Won');
          }
        }
        return count--;
      } else {
        box.textContent = 'O';
        secondPlayer.push(index);
        if (secondPlayer.length >= 3) {
          if (multiplesOf(secondPlayer, 4) == 3) {
            alert('You Won');
          }
        }
        return count++;
      }
    });
  });
};
gameBoard();
