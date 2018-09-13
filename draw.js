
var grid;
var column;
var rows;
var s = 80;

var totalMines = 15;

function make2DArray(column, rows){
    var arr = new Array(column);
    for(i = 0; i <arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function setup(){
    createCanvas(701, 701);
    column = floor(width / s);
    rows = floor(height / s);
    grid = make2DArray(column, rows);
    
    placeMines();
    devideMines();
    countMines();
}

function placeMines(){
    for(i = 0; i < column; i++){
        for(j = 0; j < rows; j++){
            grid[i][j] = new Cell(i, j, s);
        }
    }
}

function devideMines(){
    var space = [];
    for(var i = 0; i < column; i++){
        for(var j = 0; j < rows; j++){
            space.push([i, j]);
        }
    }

    for(var k = 0; k < totalMines; k++){
        var index = floor(random(space.length));
        var choice = space[index];
        var i = choice[0];
        var j = choice[1];

        //Delete index spot
        space.splice(index, 1);
        grid[i][j].mine = true;
    }
}

function countMines(){
    for(i = 0; i < column; i++){
        for(j = 0; j < rows; j++){
            grid[i][j].countMines();
        }
    }
}

function mousePressed(){
    for(i = 0; i < column; i++){
        for(j = 0; j < rows; j++){
           if(grid[i][j].contains(mouseX, mouseY)){
               grid[i][j].reveal();
           }
        }
    }
}

function draw(){
    background(255);
    for(i = 0; i < column; i++){
        for(j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
}