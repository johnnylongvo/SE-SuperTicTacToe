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


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});