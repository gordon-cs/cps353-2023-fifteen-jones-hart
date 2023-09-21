"use strict";

let tiles = [].slice.call(document.getElementsByTagName("div")).slice(1);
let emptySquare =["300px","300px"];

document.getElementById("puzzlearea").addEventListener('click', moveTiles);

setUpBoard();
setupHover();

function setUpBoard() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let index = (r * 4) + c;
      if (index < 15) {
        let xPos = 100 * c;
        let yPos = 100 * r;
        tiles[index].style.marginLeft = xPos + "px";
        tiles[index].style.marginTop = yPos + "px";
        tiles[index].style.backgroundImage = "url('background.jpg')";
        tiles[index].style.backgroundPosition = -xPos + "px " + -yPos + "px";
        tiles[index].classList.add("standard");
      }
    }
  }
}

function moveTiles(event) {
  let tile = tiles[event.target.innerText - 1];
  if (isSlidable(event.target.innerText - 1)) {
    let tilePosX = tile.style.marginLeft;
    let tilePosY = tile.style.marginTop;
    tile.style.marginLeft = emptySquare[0];
    tile.style.marginTop  = emptySquare[1];
    emptySquare = [tilePosX, tilePosY];
  }
  setupHover();
}

function setupHover() {
  for(let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    if (isSlidable(i)) {
      tile.classList.add("hover");
    } else {
      tile.classList.remove("hover");
    }
  }
}

function isSlidable(index) {
  let tile = tiles[index];
  let tilePosX = tile.style.marginLeft;
  let tilePosY = tile.style.marginTop;
  let xDistance = Math.abs(tilePosX.substring(0,tilePosX.length-2) -
                          emptySquare[0].substring(0,emptySquare[0].length-2));
  let yDistance = Math.abs(tilePosY.substring(0,tilePosY.length-2) -
                          emptySquare[1].substring(0,emptySquare[1].length-2));
    return ((xDistance <= 100 && yDistance == 0) ||
            (xDistance == 0 && yDistance <= 100));
}
