// we need to install enumifyjs, use typescript, or homebrew an enum class
// the following line gets the game class
const sum = require('./game');
// this is an array defining potential values for a game square
let xando = ["x","o",""];
// this pulls a random value from the above array
var rando = xando[Math.random(Math.floor()*xando.length)];
// this defines a game whose state should not be possible
let extraneous = [
    ["x","x","x","x","x"],
    ["o","o","o","o","o"],
    ["x","x","x","x","x"],
    ["o","o","o","o","o"],
    ["x","x","x","x","x"]  
];
// this is a double win condition for x
let xdoublewin = [
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"]
];
// double win condition for o
let odoublewin = [
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["o","x","o","x","o"]
];
// single win condition for x
let xwin = [
    ["x","x","x","x","x"],
    ["o","x","o","x","o"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["x","o","x","o","x"]
];
// single win condition for o
let owin = [
    ["o","o","o","o","o"],
    ["o","x","o","x","o"],
    ["o","x","o","x","o"],
    ["x","o","x","o","x"],
    ["x","o","x","o","x"]
];
// array of random values pulled from the possible value array
let randomarray = [
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando],
    [rando,rando,rando,rando,rando]
];

//test('tests game state for o winning', () => {
//    expect(insertgamestateevaluationfunctionhere(owin)).toBe(insertenumvalueforowinning);
//  });
//test('tests game state for x winning', () => {
//    expect(insertgamestateevaluationfunctionhere(xwin)).toBe(insertenumvalueforxwinning);
//  });
// etc...