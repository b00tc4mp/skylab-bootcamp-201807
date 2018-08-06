import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  return (
    <button className={props.winner ? "square winner" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

 isWinSquare(i) {
   if (this.props.winningLine.length === 0) return false;
   return this.props.winningLine.includes(i);
 }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winner={this.isWinSquare(i)}
      />
    );
  }



  renderRow(i) {
    return <div className="board-row" key={i}>
      {this.renderSquare(i)}
      {this.renderSquare(i + 1)}
      {this.renderSquare(i + 2)}
    </div>
  }

  render() {

    let rows = [];
    for (let i = 0; i < this.props.squares.length; i += 3) {
      rows.push(this.renderRow(i));
    }
    return <div>{rows}</div>
  }
}

function DrawMessage(props) {
  if (!props.isDraw) return null;
  else return (<h2>This game ended in a draw!</h2>);
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      loc: -1,
      xIsNext: true,
      stepNumber: 0,
      historySortIsAscending:true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];

    const squares = current.squares.slice();


    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = 'X';
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        loc: i,
      }]),
      stepNumber: history.length,

      xIsNext: !this.state.xIsNext,
    });

  }

  toggleHistorySort() {
    const historySort = !this.state.historySortIsAscending;
    this.setState({historySortIsAscending:historySort});
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner = "";
    let winningLine = [];
    const winnerResults = calculateWinner(current.squares);

    if (winnerResults) {
      winner = winnerResults.winner;
      winningLine = winnerResults.winningLine;
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const {row = "", col = ""} = toRowCol(step.loc);
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
          <span className={this.state.stepNumber === move ? "stepBold" : ""}>Row: {row} Col: {col} </span>
        </li>
      );
    });

    if(!this.state.historySortIsAscending) moves.reverse();

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    let draw =  history.length === 10 && winner === "";
    const changeHistorySortText = this.state.historySortIsAscending ? "Descending" : "Ascending";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <button onClick={() => this.toggleHistorySort()}>{changeHistorySortText}</button>
        <DrawMessage isDraw={draw}/>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner:squares[a],winningLine:lines[i]};
    }
  }
  return null;
}

function toRowCol(i) {
  if (i >= 0) return ({row: (Math.floor(i / 3) + 1).toString(), col: (i % 3 + 1).toString()})
  else return ({});
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
)
;
