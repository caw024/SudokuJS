document.addEventListener('DOMContentLoaded', function() {

    // get values that would constitute a valid sudoku puzzle
    function getVals() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&?level=3";
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {
            let vals = data["squares"];
            return vals;
        })
        .catch(error => {
            console.log('Error:', error);
        });
        return false;
    }

    // given the vals, return the 9x9 array of sudoku
    function getPuzzle(vals){
        var puzzle = [];
        for (var i = 0; i < 9; i++){
            let row = []
            for (var j = 0; j < 9; j++){
                row.push('_');
            }
            puzzle.push(row)
        }
        vals.forEach(l => puzzle[l['x']][l['y']] = l['value']);
        return puzzle;
    }


    // Solves Sudoku puzzle
    function solveSudoku(arr){
        // stack keeps track of which indices to look at
        let stack = [];

        // todo
    }

    // check for validity of fxn
    function isValid(arr,x,y){
        // trusting that diff works
        // check for distinct row and column
        let row = arr[x];
        let col = [];
        for (var i = 0; i < 9; i++){
            col.push(arr[i][y]);
        }
        
        // check row
        let diff = new Map();
        row.forEach(ele => diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1));
        for (var i = 0; i < 9; i++){
            if (diff.has(i) && diff.get(i) > 1){
                return false;
            }
        }

        // check col
        diff.clear();
        col.forEach(ele => diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1));
        for (var i = 0; i < 9; i++){
            if (diff.has(i) && diff.get(i) > 1){
                return false;
            }
        }

        // check for its current square
        diff.clear();
        var floorx = Math.floor(x/3) * 3;
        var floory = Math.floor(y/3) * 3;
        // get current 3 by 3 square
        for (var i = floorx; i < floorx+3; i++){
            for (var j = floory; j < floory + 3; j++){
                let ele = arr[i][j];
                diff.has(ele) ? diff.set(ele, diff.get(ele)+1) : diff.set(ele,1);
            }
        }
        for (var i = 0; i < 9; i++){
            if (diff.has(i) && diff.get(i) > 1){
                return false;
            }
        }

        // otherwise, currently a valid puzzle
        return true;
    }

    var vals = getVals();
    var puzzle = getPuzzle(vals);

   

    //solveSudoku(puzzle);
    //alert(puzzle[0]);
});