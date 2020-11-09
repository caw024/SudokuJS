// get all the prefilled squares of randomly generated sudoku puzzle
function getPuzzle() {
    document.getElementById("Solve").disabled=true;
    document.getElementById("New").disabled=true;
    document.getElementById("timer").innerHTML = "";
    solved = false;

    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            var item = i + 9*j;
            var cell = document.getElementById(item);
            cell.value = "";
            cell.removeAttribute("disabled");
        }
    }

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&?level=3";
    fetch(proxyurl + url)
    .then(response => response.json())
    .then(data => {
        let vals = data["squares"];
        // return as json data of the form ( {x: , y:, value: } )
        // note this is ajax (asynchronous), so you must set it to document.innerhtml
        
        vals.forEach(l => {
            var num = (l['x'])+9*(l['y']);
            document.getElementById( num ).value = l['value'];
            document.getElementById( num ).setAttribute("disabled", "");
        });
        // reset puzzle features
        document.getElementById("Solve").disabled = false;
        document.getElementById("New").disabled = false;
        document.getElementById("timer").innerHTML = "00:00";
    })
    .catch(error => {
        console.log('Error:', error);
    });

    return false;
}

// solves sudoku puzzle
function solvePuzzle(){
    var arr = [];
    for (var i = 0; i < 9; i++){
        temp = [];
        for (var j = 0; j < 9; j++){
            var item = j + 9*i;
            var val = document.getElementById(item);

            if (val.hasAttribute('disabled')){
                temp.push(parseInt(val.value));
            }
            else{
                temp.push("_");
            }
        }
        arr.push(temp);
    }
    
    solveSudokuHelper(arr, 0);
    solved = true;
    console.log(solved);
}


// Solves Sudoku puzzle
function solveSudokuHelper(arr,ctr){
    // puzzle is solved
    if (ctr == 81){
        for (var i = 0; i < 9; i++){
            for (var j = 0; j < 9; j++){
                var item = j + 9*i;
                var cell = document.getElementById(item);
                cell.value = arr[i][j];
                cell.setAttribute("disabled", "");
            }
        }
        return arr;
    }

    // what numbers to track
    let x = Math.floor(ctr/9);
    let y = ctr % 9;
    if (arr[x][y] != "_"){
        return solveSudokuHelper(arr,ctr+1);
    }
    var poss = validNumbers(arr,x,y);
    if (poss.length == 0){
        return false;
    }
    for (var i = 0; i < poss.length; i++){
        arr[x][y] = poss[i];
        if (solveSudokuHelper(arr,ctr+1)){
            return true;
        }
    }
    arr[x][y] = "_";
    return false;
}

// get valid numbers for array
function validNumbers(arr,x,y){
    // trusting that diff works
    // check for distinct row and column

    let poss = [1,2,3,4,5,6,7,8,9];
    let row = arr[x];
    let col = [];
    for (var i = 0; i < 9; i++){
        col.push(arr[i][y]);
    }
    
    // check row
    let diff = new Map();
    row.forEach(ele => diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1));
    for (var i = 1; i < 10; i++){
        // invalid number
        if (diff.has(i) && diff.get(i) > 1){
            return [];
        }
        // if number already exists in a row
        else if (diff.has(i)){
            const index = poss.indexOf(i);
            if (index > -1) {
                poss.splice(index, 1);
            }              
        }
    }

    // check col
    diff.clear();
    col.forEach(ele => diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1));
    for (var i = 1; i < 10; i++){
        if (diff.has(i) && diff.get(i) > 1){
            return [];
        }
        // if number already exists in a col
        else if (diff.has(i)){
            const index = poss.indexOf(i);
            if (index > -1) {
                poss.splice(index, 1);
            }              
        }
    }

    diff.clear();
    var floorx = Math.floor(x/3) * 3;
    var floory = Math.floor(y/3) * 3;
    // get map from numbers to occurences in 3 by 3 square
    for (var i = floorx; i < floorx+3; i++){
        for (var j = floory; j < floory + 3; j++){
            let ele = arr[i][j];
            diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1);
        }
    }
    // check if current square is valid
    for (var i = 1; i < 10; i++){
        if (diff.has(i) && diff.get(i) > 1){
            return [];
        }
        // if number already exists in a 3x3 square
        else if (diff.has(i)){
            const index = poss.indexOf(i);
            if (index > -1) {
                poss.splice(index, 1);
            }              
        }
    }

    // otherwise, currently a valid puzzle
    return poss;
}

//var ans = solveSudoku(puzzle,0);
    //alert(ans);
    //alert(puzzle[0]);

/*
var arr = [[6,9,4,1,8,3,5,2,7],
        [2,1,3,7,9,5,4,6,8],
        [5,8,7,6,2,4,9,3,1],
        [3,5,8,2,7,1,6,9,4],
        [1,2,6,4,3,9,8,7,5],
        [7,4,9,8,5,6,2,1,3],
        [4,7,2,9,1,8,3,5,6],
        [8,3,1,5,6,2,7,4,9],
        [9,6,5,3,4,7,1,8,2]]
*/


// returns if input is valid
function isValid(t){
    var arr = new Array("1","2","3","4","5","6","7","8","9");
    return arr.includes(t) ? true : false;
}

function validateInput(cell){
    //console.log(cell);
    cell.addEventListener("input", () => {
    //console.log(cell.value)
    if (isValid(cell.value) === false){
        cell.value = "";
    }
});
}

// preshades columns of border
function borderShade(){
    document.querySelectorAll(".cell").forEach( cell => {
        console.log(cell);
        if (cell.id % 3 == 0){
            cell.style['border'] = "none";
            cell.style['border-left'] = "4px solid black";
        }
        else if (cell.id % 9 == 8){
            cell.style['border'] = "none";
            cell.style['border-right'] = "4px solid black";
        }
    });
}

function timer(){
    if (solved){
        return;
    }
    const t = document.querySelector('#timer');
    var temp = t.innerHTML.split(':');

    if (temp[1] === '59'){
        temp[0] = (parseInt(temp[0])+1).toString();
        if (temp[0].length === 1){
            temp[0] = "0" + temp[0];
        }
        temp[1] = "00";
    }
    else{
        temp[1] = (parseInt(temp[1])+1).toString();
        if (temp[1].length === 1){
            temp[1] = "0" + temp[1];
        }
    }
    //console.log(temp);
    t.innerHTML = temp[0] + ":" + temp[1];
}

var solved = false;
// Upon loading DOM
document.addEventListener("DOMContentLoaded", function(){
    borderShade();
    getPuzzle();
    setInterval(timer,1000);
    
    document.getElementById("New").addEventListener('click', getPuzzle );
    document.getElementById("Solve").addEventListener('click', solvePuzzle );  
    document.querySelectorAll(".cell").forEach( cell => validateInput(cell));
});
