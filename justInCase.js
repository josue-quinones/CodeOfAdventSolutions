//6
let cont = content.split('\n' + '\n');
for (var x = 0; x < cont.length; x++) { //
  groups.push(cont[x].replace(/\n/g," "));
}

//7
let obj = cont[x].split(' contain ');
obj[0] = obj[0].substring(0,obj[0].indexOf(' bags'))
obj[1] = obj[1].substring(0,obj[1].indexOf('.'))
obj[1] = obj[1] == "no other bags" ? '0' : obj[1].replace(/ bag[s]*/g,'');
obj[1] = obj[1] != '0' ? obj[1].replace(/(\d)( )/g,'$1:') : '0';
obj[1] = (obj[1] != '0' && obj[1].indexOf(',') > -1) ? obj[1].split(', ') : (obj[1] == '0' ? '0' : [obj[1]]);
let children = {};
if (obj[1] != '0') {
  for (var y = 0; y < obj[1].length; y++) {
    let amt = obj[1][y].split(':')
    children[amt[1]] = amt[0];
  }
} else {
  children = '0';
}
bags[obj[0]] = children;
function checkShinyBagContents() {
  let contentNames = Object.keys(bags[MY_BAG]);
  console.log(contentNames)
  for (let x = 0; x < contentNames.length; x++) {
    let bagCont = checkBagContents(contentNames[x]);
    interiorBags += parseInt(bags[MY_BAG][contentNames[x]]) * bagCont + parseInt(bags[MY_BAG][contentNames[x]])
    console.log(interiorBags)
  }
}
function checkBagContents(bagName) {
  if (bags[bagName] === '0') {
    return 0;
  } else {
    let toReturn = 0;
    let baggy = Object.keys(bags[bagName])
    console.log(baggy, bags[bagName])
    for (var y = 0; y < baggy.length; y++) {
      toReturn +=  parseInt(bags[bagName][baggy[y]]) * parseInt(checkBagContents(baggy[y])) + parseInt(bags[bagName][baggy[y]])
      console.log(bagName,baggy[y],bags[bagName][baggy[y]],toReturn)
    }
    return toReturn;
  }
}

//8
function testList (temp_i) {
  let instructions = temp_i.slice(0);
  for (var y = 0; y < instructions[instructions.length - 1]["line"]; y++) {
    let currInstName = instructions[y]["name"];
    let argOp = instructions[y]["arg"][0];
    let rest = parseInt(instructions[y]["arg"].substring(1))
    let executed = instructions[y]["exc"]
    // console.log(instructions[y])
    if (!executed) {
      instructions[y]["exc"] = true;
      switch(currInstName) {
        case "nop":
          break;
        case "acc":
          if (argOp == "+") accumulator += rest;
          else if (argOp == "-") accumulator -= rest;
          else console.log(instructions[y],argOp,rest);
          break;
        case "jmp":
          y -= 1
          if (argOp == "+") y += rest;
          else if (argOp == "-") y -= rest;
          else console.log(instructions[y],argOp,rest)
          break;
        default:
          console.log(instructions[y]);
          break;
      }
    } else {
      return false;
    }
  }
  return true
}
for (let x = 0; x < cont.length; x++) {
  i.push({"line":x,"name":cont[x].split(' ')[0],"arg":cont[x].split(' ')[1],"exc":false});
}
let x = 0;
let lines = i.filter(x => x["name"] != "acc").map(x => {return x.line});
// let lines = [209,210]
for (x = 0; x < lines.length; x++) {
  let curr = i[lines[x]]["name"];
  let temp = (curr == "nop") ? "jmp" : "nop";
  i[lines[x]]["name"] = temp;
  let passed = testList(i.slice(0))
  // console.log(i[lines[x]]["name"],curr,lines[x])
  if (passed) {
    console.log(lines[x])
    break;
  } else {
    i[lines[x]]["name"] = curr;
    accumulator = 0;
    i.forEach(x => x["exc"] = false)
  }
}

//9
//1
function verify() {
  let passed = false;
  for (var x = 25; x < preAmble.length; x++) {
    console.log("Trying:",preAmble[x])
    for (let y = x - 1; y >= x - 25; y--) {
      for (let z = x - 25; z < y ;z++) {
        passed = checkSum(preAmble[x],preAmble[y],preAmble[z])
        if (passed) {
          break;
        } 
      }
      if (passed) {
        break;
      }
    }
    if (!passed) break;
    passed = false;
  }
  console.log(x)
}

function checkSum(Curr,M,N) {
  let check = M != N && Curr == M + N
  // if (check) console.log(Curr,M,N)
  return check
}
//2
var preAmble = [];

const MY_NUM = 542529149;
function loadAnswers(content) {
  let cont = content.split('\n');
  for (let x = 0; x < cont.length; x++) {
    preAmble.push(parseInt(cont[x]))
  }
  //542529149 is invalid num
  for (var x = 0; x < preAmble.length; x++) {
    // console.log("Starting with ",x, preAmble[x])
    let sum = 0;
    for (var y = x; y < preAmble.length; y++) {
      sum += preAmble[y];
      if (sum > MY_NUM) break;
      else if (sum == MY_NUM) {
        // console.log("Here it stopped ",x,y)
        break;
      }
    }
    if (sum == MY_NUM) break;
    sum = 0;
  }
  let min,max;
  min = 99999999999;
  max = 0;
  for (x; x <= y; x++) {
    if (preAmble[x] < min) min = preAmble[x]
    if (preAmble[x] > max) max = preAmble[x]
  }
  console.log(min+max)
}

//10
//1.
function loadAnswers(content) {
  let cont = content.split('\n');
  for (let x = 0; x < cont.length; x++) {
    adapters.push(parseInt(cont[x]));
  }
  adapters = adapters.sort( (a, b) => a - b);
  console.log(adapters)
  verify()
}
function verify() {
  let diff_arr = [1];
  for (var x = 0; x < adapters.length - 1; x++) {
    diff_arr.push(diff(adapters[x ],adapters[x+ 1]))
  }
  // console.log(diff_arr.filter(x => x == 2))
  console.log(diff_arr.filter(x => x == 1).length * (diff_arr.filter(x => x == 3).length + 1))
  //2343
}

function diff(a,b) {
  return b - a;
}
//2 math + guessing

//11
//1
var moves = [];

const startingLocation = {"current":"E","east":0,"north":0};

const order = ["N","E","S","W"]

var currentLocation = {"current":"E","east":0,"north":0};

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
  console.log(currentLocation,ManhattanD());
}

function ManhattanD() {
  return Math.abs(currentLocation["east"]) + Math.abs(currentLocation["north"])
}

function turn(direction,turns) {
  let currDir = order.indexOf(currentLocation["current"]);
  let nextDir = 0;
  if (direction == "R") {
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
  currentLocation["current"] = order[nextDir]
}

function forward(amount) {
  switch(currentLocation["current"]) {
    case "E":
      currentLocation["east"] += amount;
      break;
    case "W":
      currentLocation["east"] -= amount;
      break;
    case "N":
      currentLocation["north"] += amount;
      break;
    case "S":
      currentLocation["north"] -= amount;
      break;
  }
}

function move(direction, amount) {
  switch(direction) {
    case "N":
      currentLocation["north"] += amount;
      break;
    case "S":
      currentLocation["north"] -= amount;
      break;
    case "E":
      currentLocation["east"] += amount;
      break;
    case "W":
      currentLocation["east"] -= amount;
      break;
  }
}
//2

