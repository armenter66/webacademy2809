function Cell( {number, row, column, canMove} ) {
  // this = { __proto__: Cell.prototype }
  this.rootEl = document.createElement('div');
  this.rootEl.className = 'board__item';
  this.rootEl.innerText = number;
  this.row = row;
  this.column = column;
  this.canMove = canMove;

};

Cell.prototype.setProps = function ({row, column, canMove}) {
  this.row = row;
  this.column = column;
  this.canMove = canMove;

  this.render();
}

Cell.prototype.render = function () {
  const { row, column, canMove } = this;

  this.rootEl.style.transform = `translate(${column*100}%, ${row*100}%)`;

  if (canMove) {
      this.rootEl.classList.add('board__item--can-move');
  } else {
    this.rootEl.classList.remove('board__item--can-move');
  }

  return this.rootEl;
};

const EMPTY_CELL = 16;
const WIN_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, EMPTY_CELL];
const keyToDirection = {
    38: 'TOP',
    87: 'TOP',
    40: 'BOTTOM',
    83: 'BOTTOM',
    39: 'RIGHT',
    68: 'RIGHT',
    37: 'LEFT',
    65: 'LEFT'
};


function Game() {

  this.rootEL = document.querySelector('.board');
  this.clearBoard();
  this.board = [...WIN_ARRAY].sort(() => Math.random() - .5 );
  this.cells = {};

  const cells = [];
        const moves = this.canMove();

  this.board.forEach( (num, idx) => {
      if (num === EMPTY_CELL) {
        return;
      }

      const { row, column } = this.getCellPosition(idx);

      const canMove = idx in moves;

      const cell = new Cell ({number: num, row, column, canMove});

      this.cells[num] = cell;

      cells.push( cell.render() );
  });

  this.fill(cells);

  document.addEventListener('keydown', (e) => {
      if (e.which in keyToDirection) {
          this.move(keyToDirection[e.which]);
      }
  });

  document.addEventListener('click', (cl) => {
      if (this.canMove[cl]) {
        this.move(cl);
      }
  });

};

Game.prototype.move = function (direction) {
  const moves = this.canMove();

  if (moves[direction] !== null) {
    const moveIdx = moves[direction];
    const zeroIdx = this.board.findIndex(num => num === EMPTY_CELL);
    const newBoard = [...this.board];

    newBoard[zeroIdx] = this.board[moveIdx];
    newBoard[moveIdx] = EMPTY_CELL;

    this.board = newBoard;

    this.render();
  }

};

Game.prototype.canMove = function() {
  const idxZero = this.board.findIndex(num => num === EMPTY_CELL);
  const { row: zeroRow, column: zeroColumn } = this.getCellPosition(idxZero);
  const neighbours = {
    BOTTOM: zeroRow === 0 ? null : idxZero - 4,
    RIGHT: zeroColumn === 0 ? null : idxZero - 1,
    LEFT: zeroColumn === 3 ? null : idxZero + 1,
    TOP: zeroColumn === 3 ? null : idxZero + 4
  };

  const posibilities = {};

  for ( const direction in neighbours) {
    if (neighbours[direction] !== null ) {
      posibilities[ neighbours[direction] ] = direction;
    }
  }

  return {
    ...neighbours,
    ...posibilities,
  };

};

Game.prototype.fill = function (cells = Object.values(this.cells).map(c => c.render() ) ) {
  //this.rootEL.append.apply(this.rootEL, cells);
  this.rootEL.append(...cells);
};

Game.prototype.clearBoard = function () {
    this.rootEL.innerText = '';
};

Game.prototype.getCellPosition = function (idx) {
    return {
        row: Math.floor(idx / 4),
        column: idx % 4,
    }
}

Game.prototype.render = function () {
    const moves = this.canMove();

    this.board.forEach((num, idx) => {
      const {row, column} = this.getCellPosition(idx);
      const cell = this.cells[num];
        if (cell) {
          cell.setProps({
              row,
              column,
              canMove: idx in moves
          });
        }
    });


};


const game = new Game();
