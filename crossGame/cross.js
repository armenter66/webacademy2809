function createGame() {

  const X = 'X';
  const O = 'O';
  const EMPTY = ' ';
  const gameStatuses = {
    NOT_STARTED: 'NOT_STARTED',
    STARTED: 'STARTED',
    ENDED: 'ENDED',
    DRAWITEM: 'DRAWITEM'
  }

  const game = {
      board: [
          [EMPTY, EMPTY, EMPTY],
          [EMPTY, EMPTY, EMPTY],
          [EMPTY, EMPTY, EMPTY]
      ],
      currentUser: X,
      status: gameStatuses.NOT_STARTED,
      userAction(rowIndex, cellIndex) {
          //const cellEl = e.target.closest('.cross__board-item');
          // const cellEl = e.currentTarget;
          // const rowIndex = game.cells.findIndex(function (rowItems) {
          //     return rowItems.includes(cellEl);
          // });
          // const cellIndex = game.cells[rowIndex].findIndex( function(cell) {
          //     return cell === cellEl;
          // })
          return function action(el) {
              game.step(rowIndex, cellIndex);
          }
      },
      step(rowIndex, cellIndex) {
          if (game.status !== gameStatuses.STARTED || game.board[rowIndex][cellIndex] !== EMPTY) {
              return false;
          }

          const currentUser = game.currentUser;

          game.board[rowIndex][cellIndex] = currentUser;

          game.status = gameStatuses.DRAWITEM;
          game.fillCell(rowIndex, cellIndex, currentUser);

          const winLine = game.findWinLine(currentUser);

          if (winLine) {
            game.status = gameStatuses.ENDED;
          } else {
            game.currentUser = currentUser === X ? O : X;
          }

      },
      statusAlert(){
        if (game.status === gameStatuses.ENDED) {

          const currentUser = game.currentUser;

          alert(`Выиграли ${currentUser === X ? 'крестики' : 'нолики'}`)
        } else if (game.status === gameStatuses.DRAWITEM) {
          game.status = gameStatuses.STARTED;
        }
      },
      isLineWin(line, symbol) {
          return line.items.every(function (s) {
            return s === symbol;
          })
      },
      findWinLine(symbol) {
        const lines = game.getLines();

        return lines.find(function (line) {
            return game.isLineWin(line, symbol);
        });
      },
      getLines() {
        const lines = game.board.map(function(row, index) {
          return {
            items: row,
            index,
            type: 'row'
          };
        });

        for (let i = 0; i < 3; i++) {
          const column = {
            type: 'columns',
            index: i,
            items: [
              game.board[0][i],
              game.board[1][i],
              game.board[2][i]
            ]
          };
          lines.push(column);
        }

        lines.push({
          type: 'diagonal',
          index: 0,
          items: [
            game.board[0][0],
            game.board[1][1],
            game.board[2][2]
          ]
        }, {
          type: 'diagonal',
          index: 1,
          items: [
            game.board[0][2],
            game.board[1][1],
            game.board[2][0]
          ]
        })


        return lines;
      },
      createX() {
        const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');


        svgRoot.setAttribute('class', 'x cross__board-item-el');
        svgRoot.setAttribute('viewBox', '0 0 80 80')

        line1.setAttribute('class', 'x__line1');
        line1.setAttribute('x1', '20');
        line1.setAttribute('y1', '10');
        line1.setAttribute('x2', '60');
        line1.setAttribute('y2', '70');

        line2.setAttribute('class', 'x__line2');
        line2.setAttribute('x1', '60');
        line2.setAttribute('y1', '10');
        line2.setAttribute('x2', '20');
        line2.setAttribute('y2', '70');

        svgRoot.append(line1, line2);

        svgRoot.addEventListener('animationend', game.statusAlert);

        return svgRoot;

      },
      createO() {
          const svgRoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

          svgRoot.setAttribute('class', 'o cross__board-item-el');
          svgRoot.setAttribute('viewBox', '0 0 80 80');

          ellipseEl.setAttribute('cx', '40');
          ellipseEl.setAttribute('cy', '40');
          ellipseEl.setAttribute('rx', '20');
          ellipseEl.setAttribute('ry', '30');

          svgRoot.append(ellipseEl);

          svgRoot.addEventListener('animationend', game.statusAlert);

          return svgRoot;
      },
      start(conversation) {
        game.conversation = conversation;
        game.board = [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ],
        game.currentUser = X,
        game.status = gameStatuses.STARTED;

        game.render();
      },
      init() {
          const boardEl = document.querySelector('.cross__board');

          game.boardEl = boardEl;
          game.boardRow = boardEl.querySelectorAll('.cross__board--row');
          game.cells = [];

          for (let i = 0; i < game.boardRow.length; i++) {
            const rowItems = game.getRowCells(game.boardRow[i]);
                  game.cells.push( rowItems );

              rowItems.forEach( function (cell, cellIndex) {
                  cell.addEventListener('click', game.userAction(i, cellIndex));
              })
          };

          //boardEl.addEventListener('click', game.userAction);

          game.status = gameStatuses.STARTED;

      },
      getRowCells( rowEl ) {
              return Array.from( rowEl.querySelectorAll('.cross__board-item') );
      },
      fillCell(rowIndex, cellIndex, data) {
              const cell = game.cells[rowIndex][cellIndex];

              cell.innerText = '';

              if (data === X) {
                  const XEL = game.createX();

                  cell.append(XEL);
              } else if (data === O) {
                  const OEL = game.createO();

                  cell.append(OEL);
              }
      },

      render() {
          game.board.forEach(function (rowData, rowIndex) {
              rowData.forEach( function (cellData, cellIndex) {
                  game.fillCell(rowIndex, cellIndex, cellData);
              });
          });
      }
  };


  game.init();

  game.render();

  return game;


}


const game = createGame();

document.querySelector('.cross__board').style.border = '2px solid blue';

// const startBtn = document.querySelector('.action--start');

// startBtn.addEventListener('click', function () {
//   game.start();
// })

const optionsForm = document.querySelector('.actions');

optionsForm.addEventListener('submit', function(e) {
  e.preventDefault();

  game.start();

  const selectEl = optionsForm.elements.robotName;

  const robotName = selectEl.value;

  if (robotName !== "human") {
    const robot = new Robot(game, robotName);

    console.log(robot);

    robot.conversation();
  }

})