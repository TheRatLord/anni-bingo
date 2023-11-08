const bingoOptions = [
  "B1", "B2", "B3", "B4", "B5",
  "I1", "I2", "I3", "I4", "I5",
  "N1", "N2", "N3", "N4", "N5",
  "G1", "G2", "G3", "G4", "G5",
  "O1", "O2", "O3", "O4", "O5",
];

const centerTile = "FREE SPACE\n Ice DPS Qu"

class Cell {
  constructor(value, game) {
    this.value = value;
    this.game = game;
    this.isMarked = false;
    this.element = this.createCellElement();
  }

  createCellElement() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = this.value;
    cell.addEventListener("click", () => this.toggleMark());
    return cell;
  }

  toggleMark() {
    this.isMarked = !this.isMarked;
    this.updateCellAppearance();
    this.game.checkWin();
  }

  updateCellAppearance() {
    if (this.isMarked) {
      this.element.classList.add("marked");
    } else {
      this.element.classList.remove("marked");
    }
  }
}
  
class BingoGame {
  constructor() {
    this.cells = this.generateCells();
    this.bingoBoard = document.getElementById("bingo-board");
    this.generateBoard();
  }

  generateCells() {
    const shuffledArray = this.shuffleArray(bingoOptions);
    shuffledArray[Math.trunc(shuffledArray.length / 2)] = centerTile
    return shuffledArray.map((value) => new Cell(value, this));
  }

  generateBoard() {
    this.bingoBoard.innerHTML = "";
    this.cells.forEach((cell) => {
      this.bingoBoard.appendChild(cell.element);
    });
  }

  checkWin() {
    if (this.userWon()) {
      this.displayWin();
    }
  }

  displayWin() {
  }

  userWon() {
    len = 5
    // Check for a horizontal win in each row
    for (let row = 0; row < len; row++) {
      const rowCells = this.cells.slice(row * len, (row + 1) * len);
      if (rowCells.every((cell) => cell.isMarked)) {
        return true;
      }
    }

    // Check for a vertical win in each column
    for (let col = 0; col < len; col++) {
      let isColumnWin = true;
      for (let row = 0; row < len; row++) {
        if (!this.cells[col + row * len].isMarked) {
          isColumnWin = false;
          break;
        }
      }
      if (isColumnWin) {
        return true;
      }
    }

    // Check for diagonal wins
    for (let i=0; i < len; i++)
    if (


      (this.cells[0].isMarked && this.cells[6].isMarked && this.cells[12].isMarked && this.cells[18].isMarked) ||
      (this.cells[4].isMarked && this.cells[8].isMarked && this.cells[12].isMarked && this.cells[16].isMarked)
    ) {
      return true;
    }

    return false;
  }

  shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}


const bingoGame = new BingoGame();