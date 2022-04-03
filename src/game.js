function checkWinner(squares) {
    const lines = [
      [0,   1,  2,  3,  4 ],
      [5,   6,  7,  8,  9 ],
      [11, 12, 13, 14, 15 ],
      [16, 17, 18, 19, 20 ],
      [21, 22, 23, 24, 25 ],
      [0, 5, 11, 16, 21 ],
      [1, 6, 12, 17, 22 ],
      [2, 7, 13, 18, 23],
      [3, 8, 14, 19, 24],
      [4, 9, 15, 20, 25],
      [0, 6, 13, 19, 25],
      [4, 8, 13, 17, 21]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a]===squares[e]) {
        return squares[a];
      }
    }
    return null;
  }
  
  module.exports = checkWinner;
  