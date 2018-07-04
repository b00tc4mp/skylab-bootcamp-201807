///// LISTENERS //////
askNameBtn.addEventListener("click", function() {
  userName();
  startGame();
});
solutionBtn.addEventListener("click", showSolution);
endGameBtn.addEventListener("click", endGame);
playAgainBtn.addEventListener("click", playAgain);
//document.getElementsByClassName('coord').addEventListener("click",flip)
function backup() {
  return [
    { id: 1, qty: 1, name: "portaaviones", length: 4 },
    { id: 2, qty: 2, name: "galeon", length: 3 },
    { id: 3, qty: 3, name: "velero", length: 2 },
    { id: 4, qty: 4, name: "colchoneta", length: 1 }
  ];
}

var person = "";
var boats = backup();
var missileCount = 0;
var userBoard = [];
var board = [];
var shipReg = [[]];
var tempReg = [];

function userName() {
  person = document.getElementById("inputName").value;
  document.getElementById("welcomePerson").innerHTML = "Bienvenid@ " + person;
  document.getElementById("modulo2").style.display = "block";
  document.getElementById("introGame").style.display = "none";
}

var clickFunction = function(e) {
  document.getElementById(this.id).classList.add("flip");
  document.getElementById(this.id).classList.remove("coord");
  document.getElementById(this.id).classList.remove("shipHere");
  //document.getElementById(this.id).classList.remove("coord");
  var tempID = this.id;
  setTimeout(function() {
    checkCoords(tempID.split(","));
  }, 300);
  //alert(this.id)
  document
    .getElementById(this.id)
    .removeEventListener("mouseover", hoverFunction, false);
  document
    .getElementById(this.id)
    .removeEventListener("click", clickFunction, false);
  ++missileCount;
};

var hoverFunction = function() {
  var splitID = this.id.split(",");
  var letterCoord = Number(splitID[0]) + 65;
  var numberCoord = Number(splitID[1]) + 1;
  this.innerHTML = String.fromCharCode(letterCoord) + numberCoord;
  this.addEventListener("mouseout", function() {
    this.innerHTML = "";
  });
};
function drawCanvas() {
  //Canvas starter
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = new Image();
  ctx.font = "30px Arial";
  ctx.clearRect(250, 0, 65, c.height);
  ctx.clearRect(0, 350, 65, 200);
  ctx.strokeStyle = "#00FF00";
  //Colchoneta
  img.src = "resources/ColchonetaGreen.png";
  ctx.drawImage(img, 30, 10, 75, 75);
  ctx.strokeText("X", 150, 60);
  //Velero
  ctx.strokeText(boats[3].qty, 250, 60);
  img.src = "resources/VeleroGreen.png";
  ctx.drawImage(img, 10, 70);
  ctx.strokeText("X", 150, 140);
  ctx.strokeText(boats[2].qty, 250, 140);
  //Galeon
  img.src = "resources/GaleonGreen.png";
  ctx.drawImage(img, 20, 180, 75, 75);
  ctx.strokeText("X", 150, 230);
  ctx.strokeText(boats[1].qty, 250, 230);
  //Portaaviones
  img.src = "resources/PortaavionesGreen.png";
  ctx.drawImage(img, 10, 260, 100, 38);
  ctx.strokeText("X", 150, 285);
  ctx.strokeText(boats[0].qty, 250, 285);
  //Suma
  ctx.beginPath();
  ctx.moveTo(200, 300);
  ctx.lineTo(c.width, 300);
  ctx.stroke();
  var totalQty = 0;
  for (var i = 0; i < boats.length; i++) {
    totalQty += boats[i].qty;
  }

  ctx.fillStyle = "#00FF00";
  ctx.fillText("THREATS LEFT", 10, 350);
  ctx.strokeText(totalQty, 250, 350);
}
function startGame() {
  fillShips();
  drawCanvas();
  document.getElementById("tableWrapper").style.display = "block";
  document.getElementById("controlsGame").style.display = "block";
  coordsAttributeAssigner();
  for (var i = 0; i < document.getElementsByClassName("coord").length; i++) {
    document
      .getElementsByClassName("coord")
      [i].addEventListener("mouseover", hoverFunction, false);
    document
      .getElementsByClassName("coord")
      [i].addEventListener("click", clickFunction, false);
  }
}

function showSolution() {
  for (var l = 0; l < document.getElementsByClassName("coord").length; l++) {
    var tempPos = document.getElementsByClassName("coord")[l].id.split(",");
    for (var i = 1; i < shipReg.length; i++) {
      for (var j = 0; j < shipReg[i].length; j++) {
        if (tempPos[0] == shipReg[i][j][0] && tempPos[1] == shipReg[i][j][1]) {
          document.getElementsByClassName("coord")[l].classList.add("shipHere");
        }
      }
    }
  }
}

function coordsAttributeAssigner() {
  var tableVar = document.getElementById("table");
  var count = 1;
  var countX = 0;
  for (var i = 12; i < tableVar.getElementsByTagName("td").length; i++) {
    if (i % 11 !== 0) {
      tableVar.getElementsByTagName("td")[i].classList.add("coord");
      tableVar
        .getElementsByTagName("td")
        [i].setAttribute("id", countX + "," + (countX + i - 12 * count));
    } else if (i % 11 === 0) {
      ++countX;
      ++count;
    }
  }
}

function endGame() {
  document.getElementById("endMsgContainer").style.display = "block";
  document.getElementById("tableWrapper").style.display = "none";
  document.getElementById("controlsGame").style.display = "none";
  document.getElementById("modulo2").style.display = "none";
  if (hasGameEnded()) {
    document.getElementById("endMsg").innerHTML =
      "YOU ELIMINATED ALL THREATS USING " + missileCount + " MISSILES!";
  } else {
    document.getElementById("endMsg").innerHTML =
      "MISSION FAILED, WE'LL GET 'EM NEXT TIME ";
  }
}

function playAgain() {
  person = "";
  shipReg = [[]];
  tempReg = [];
  missileCount = 0;
  boats = backup();
  document.getElementById("introGame").style.display = "block";
  document.getElementById("endMsgContainer").style.display = "none";
  document.getElementById("inputName").value = "";
  //  console.log(document.getElementById('table').getElementsByTagName('td').length)
  for (
    var i = 0;
    i < document.getElementById("table").getElementsByTagName("td").length;
    i++
  ) {
    //document.getElementsByClassName("coord")[i].classList.remove("flip");
    document.getElementById("table").getElementsByTagName("td")[i].classList =
      "";
  }
}

//////////////////////
//////  LOGIC  ///////
//////////////////////

function orientationBoat() {
  var coinflip = Math.round(Math.random() * 1);
  // Horizontal = 0, Vertical = 1
  return coinflip;
}

function decidePlace(id) {
  var orientation = orientationBoat();
  var backwards = false;
  var tempShip = [];
  tempShip.push([Math.round(Math.random() * 9), Math.round(Math.random() * 9)]);
  if (orientation === 0) {
    if (tempShip[0][0] + boats[id - 1].length > 10) {
      backwards = true;
    }
  } else {
    if (tempShip[0][1] + boats[id - 1].length > 10) {
      backwards = true;
    }
  }

  for (var i = 1; i < boats[id - 1].length; i++) {
    //console.log(boats[id-1].length)
    if (orientation === 0) {
      if (backwards) {
        tempShip.push([tempShip[0][0] - i, tempShip[0][1]]);
      } else if (!backwards) {
        tempShip.push([tempShip[0][0] + i, tempShip[0][1]]);
      }
    } else if (orientation === 1) {
      if (backwards) {
        tempShip.push([tempShip[0][0], tempShip[0][1] - i]);
      } else if (!backwards) {
        tempShip.push([tempShip[0][0], tempShip[0][1] + i]);
      }
    }
  }
  return tempShip;
}

function checkCrash(tempReg, shipReg) {
  for (var k = 0; k < shipReg.length; k++) {
    for (var j = 0; j < shipReg[k].length; j++) {
      for (var i = 0; i < tempReg.length; i++) {
        if (
          tempReg[i][0] == shipReg[k][j][0] &&
          tempReg[i][1] == shipReg[k][j][1]
        ) {
          //console.log("found this pos " + tempReg[i][0] + " " + tempReg[i][1] + " in this reg " + shipReg[k] + " => FINDING ANOTHER PLACE TO DRAW THE SHIP")
          return true; // Found it
        }
      }
    }
  }
  return false; // Not found
}

function fillShips() {
  for (var i = 0; i < boats.length; i++) {
    for (var j = 0; j < boats[i].qty; j++) {
      do {
        tempReg = decidePlace(boats[i].id);
      } while (checkCrash(tempReg, shipReg));
      shipReg.push(tempReg);
    }
  }
}

function hasGameEnded() {
  for (var i = 1; i < shipReg.length; i++) {
    if (shipReg[i].length != 0) return false;
  }
  //console.log("WINNER!")
  return true;
}

function checkCoords(userCoords) {
  for (var i = 1; i < shipReg.length; i++) {
    for (var j = 0; j < shipReg[i].length; j++) {
      if (
        userCoords[0] == shipReg[i][j][0] &&
        userCoords[1] == shipReg[i][j][1]
      ) {
        // console.log("TOCADO! ")
        document.getElementById(userCoords.join(",")).classList.add("hitShip");
        shipReg[i].splice(j, 1);
        //console.log("J: " + j + "I: " + i)
        if (shipReg[i].length == 0) {
          if (i > 6) {
            boats[3].qty--;
            //console.log("Has hundido una " + boats[3].name + "! Te quedan " + boats[3].qty)
          } else if (i < 7 && i > 3) {
            boats[2].qty--;
            // console.log("Has hundido un " + boats[2].name + "! Te quedan " + boats[2].qty)
          } else if (i < 4 && i > 1) {
            boats[1].qty--;
            // console.log("Has hundido un " + boats[1].name + "! Te quedan " + boats[1].qty)
          } else {
            boats[0].qty--;
            //   console.log("Has hundido un " + boats[0].name + "! Te quedan " + boats[0].qty)
          }
          drawCanvas();
        }
        if (hasGameEnded()) {
          endGame();
        }
        return;
      }
    }
  }
  document.getElementById(userCoords.join(",")).classList.add("hitWater");
}
