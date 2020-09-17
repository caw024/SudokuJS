document.addEventListener('DOMContentLoaded', function() {

    // Generates new puzzle
    function newPuzzle() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&?level=3";
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {
            let vals = data["squares"];
            var arr = [];
            for (var i = 0; i < 9; i++){
                let row = []
                for (var j = 0; j < 9; j++){
                    row.push('_');
                }
                arr.push(row)
            }
            
            vals.forEach(l => arr[l['x']][l['y']] = l['value']);
            return arr;
        })
        .catch(error => {
            console.log('Error:', error);
        });
        return false;
    }

    // Solves Sudoku puzzle
    function solveSudoku(arr){
        // todo
    }

    var puzzle = newPuzzle();
    //solveSudoku(puzzle);
    //alert(puzzle[0]);
});