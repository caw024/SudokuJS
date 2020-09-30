document.addEventListener('DOMContentLoaded', function() {

    // get all the prefilled squares of randomly generated sudoku puzzle
    function getPuzzle() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&?level=3";
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {
            let vals = data["squares"];
            // return as json data of the form ( {x: , y:, value: } )
            // note this is ajax (asynchronous), so you must set it to document.innerhtml
            
            console.log('a')
            vals.forEach(l => {
                var num = (l['x'])+9*(l['y']);
                document.getElementById( num ).value = l['value'];
                document.getElementById( num ).setAttribute("disabled", "");

            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
        return false;
    }


    // Solves Sudoku puzzle
    function solveSudoku(arr,ctr){
        if (ctr == 81){
            for (var i = 0; i < 9; i++){
                console.log(arr[i]);
            }
            return arr;
        }

        // what numbers to track
        let x = Math.floor(ctr/9);
        let y = ctr % 9;
        if (arr[x][y] != "_"){
            return solveSudoku(arr,ctr+1);
        }
        var poss = validNumbers(arr,x,y);
        if (poss.length == 0){
            return false;
        }
        for (var i = 0; i < poss.length; i++){
            arr[x][y] = poss[i];
            if (solveSudoku(arr,ctr+1)){
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

    getPuzzle();
    console.log(1);
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
});