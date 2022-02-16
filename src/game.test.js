// we need to install enumifyjs, use typescript, or homebrew an enum class
const sum = require('./game');
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

//test('tests game state for o winning', () => {
//    expect(insertgamestateevaluationfunctionhere(owin)).toBe(enumvalueforowinning);
//  });
//test('tests game state for x winning', () => {
//    expect(insertgamestateevaluationfunctionhere(xwin)).toBe(enumvalueforxwinning);
//  });
// etc...