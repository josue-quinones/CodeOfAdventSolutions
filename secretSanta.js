const { dir } = require('console');
const fs = require('fs');

var moves = [];

// const startingLocationShip = {"east":0,"north":0};

const order = ["N","NE","E","SE","S","SW","W","NW"]

var Waypoint = {"current":"NE","north":1,"east":10};

var currentLocationShip = {"north":0,"east":0};

fs.readFile('input.txt', "utf8",(err, content) => {
    if (err) return console.log(err);
    // Authorize a client with credentials, then call the Gmail API.
    loadAnswers(content);
});

function loadAnswers(content) {
  let cont = content.split('\n');
  for (let x = 0; x < cont.length; x++) {
    moves.push({"move":cont[x][0],"amt":parseInt(cont[x].substring(1))});
  }

  for (let x = 0; x < moves.length; x++) {
    switch (moves[x]["move"]) {
      case "L":
      case "R":
        turn(moves[x]["move"],moves[x]["amt"] / 90);
        break;
      case "N":
      case "S":
      case "E":
      case "W":
        move(moves[x]["move"],moves[x]["amt"]);
        break;
      case "F":
        forward(moves[x]["amt"]);
        break;
    }
  }
  console.log(currentLocationShip,ManhattanD());
}

function ManhattanD() {
  return Math.abs(currentLocationShip["north"]) + Math.abs(currentLocationShip["east"])
}

function turn(direction,turns) {
  // const order = ["N","NE","E","SE","S","SW","W","NW"]
  let currDir = order.indexOf(currentLocationShip["current"]);
  let nextDir = 0;
  if (direction == "R") {
    nextDir = currDir + (turns * 2);
    if (nextDir > 7) {
      
    }
    if (currDir % 2 == 0) {
      
    } else {
      
    }
    nextDir = currDir + turns;
    if (nextDir > 3) {
      nextDir = nextDir - 4
    }
  } else {
    nextDir = currDir - turns;
    if (nextDir < 0) {
      nextDir = 4 + nextDir;
    }
  }
  currentLocationShip["current"] = order[nextDir]
  
}

function forward(amount) {
  switch(currentLocationShip["current"]) {
    case "E":
      currentLocationShip["east"] += amount;
      break;
    case "W":
      currentLocationShip["east"] -= amount;
      break;
    case "N":
      currentLocationShip["north"] += amount;
      break;
    case "S":
      currentLocationShip["north"] -= amount;
      break;
  }
}

function move(direction, amount) {
  switch(direction) {
    case "N":
      Waypoint["north"] += amount;
      break;
    case "S":
      Waypoint["north"] -= amount;
      break;
    case "E":
      Waypoint["east"] += amount;
      break;
    case "W":
      Waypoint["east"] -= amount;
      break;
  }
  setWaypointCurrentDirection();
}

function setWaypointCurrentDirection() {
  let n = Waypoint["north"];
  let e = Waypoint["east"];
  if (n > 0 && e == 0) {
    Waypoint["current"] = "N";
  } else if (n > 0 && e > 0 ) {
    Waypoint["current"] = "NE";
  } else if (n == 0 && e > 0) {
    Waypoint["current"] = "E";
  } else if (n < 0 && e > 0) {
    Waypoint["current"] = "SE";
  } else if (n < 0 && e == 0) {
    Waypoint["current"] = "S";
  } else if (n < 0 && e < 0) {
    Waypoint["current"] = "SW";
  } else if (n == 0 && e < 0) {
    Waypoint["current"] = "W";
  } else if (n > 0 && e < 0) {
    Waypoint["current"] = "NW";
  } else {
    Waypoint["north"] = 0;
    Waypoint["east"] = 0;
  }
}