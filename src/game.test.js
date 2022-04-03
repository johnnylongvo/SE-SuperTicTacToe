//what to do next
//player class and gameboard class

// we need to install enumifyjs, use typescript, or homebrew an enum class
const checkWinner = require('./game');
let xando = ["x","o",""];
var rando = xando[Math.random(Math.floor()*xando.length)];
let extraneous = [
    ["x","x","x","x","x"],
    ["o","o","o","o","o"],
    ["x","x","x","x","x"],
    ["o","o","o","o","o"],
    ["x","x","x","x","x"]  
];
let xdoublewin = [
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"]
];
let odoublewin = [
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"]
];
let xwin = [
    ["x","x","x","x","x"],
    ["o","x","o","x","o"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["x","o","x","o","x"]
];
let owin = [
    ["o","o","o","o","o"],
    ["o","x","o","x","o"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["x","o","x","o","x"]
];
let randomarray = [
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando]
];

let xWinArr=['x', 'x','x','x','x',
"o","x","o","x","o",
"o","x","o","x","o",
"x","o","x","o","x",
"x","o","x","o","x"
]

let oWinArr=['o', 'o','o','o','o',
"o","x","o","x","o",
"o","x","o","x","o",
"x","o","x","o","x",
"x","o","x","o","x"
]

let TieArr=['x', 'x','o','o','o',
"o","x","o","x","o",
"o","x","o","x","o",
"x","o","x","o","x",
"x","o","x","o","x"
]

test('tests game state for o winning', () => {
   expect(checkWinner(oWinArr)).toBe("o");
 });
test('tests game state for x winning', () => {
   expect(checkWinner(xWinArr)).toBe("x");
 });
 test('tests game state for tie', () => {
    expect(checkWinner(TieArr)).toBe(null);
  });
// etc...