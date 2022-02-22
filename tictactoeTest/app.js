const boxes = Array.from(document.getElementsByClassName('box'));
console.log(boxes);

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 20) { //box is on the top add border on the bottom
      styleString += `border-bottom: 3px solid var(--sadboysummer);`;
    }
    if (index % 5 === 0) {
      styleString += `border-right: 3px solid var(--sadboysummer);`;
    }
    if (index % 5 === 4) {
      styleString += `border-left: 3px solid var(--sadboysummer);`;
    }
    if (index % 5 === 3) {
      styleString += `border-left: 3px solid var(--sadboysummer);`;
    }
    if (index % 5 === 2) {
      styleString += `border-left: 3px solid var(--sadboysummer);`;
    }
    if (index % 5 === 1) {
      styleString += `border-left: 3px solid var(--sadboysummer);`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid var(--sadboysummer);`;
    }
    box.style = styleString;
  })
}

// if (index < 20) { //box is on the top add border on the bottom
//   styleString += 'border-bottom: 3px solid var(--sadboysummer);';
// }
// if (index % 5 === 0 || index % 5 == 1 || index % 5 == 2 || index % 5 == 3) {
//   styleString += 'border-right: 3px solid var(--sadboysummer);';
// } 

drawBoard();