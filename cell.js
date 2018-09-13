
function Cell(i, j, s){
    this.i = i;
    this.j = j;
    this.x = i * s;
    this.y = j * s;
    this.s = s;
    this.neighborCount = 0;

    this.mine = false;
    this.revealed = false;
}

Cell.prototype.show = function(){
    stroke(0);
    noFill();
    rect(this.x, this.y ,this.s, this.s);
    if(this.revealed){
        if(this.mine){
            fill(200);
            ellipse(this.x + this.s * 0.5, this.y + this.s * 0.5, this.s * 0.5);
        }else{
            fill(200);
            rect(this.x, this.y, this.s, this.s);
            if(this.neighborCount > 0){
                textAlign(CENTER);
                fill(0);
                textSize(40);
                text(this.neighborCount, this.x + this.s * 0.5, this.y + this.s - 30);
            }
        }
    }
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    //FloodFill 
    if(this.neighborCount == 0){
        this.floodFill();
    }
}

Cell.prototype.floodFill = function(){
    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < column && j > -1 && j < rows){
                var neigbors = grid[i][j];
                if(!neigbors.mine && !neigbors.revealed){
                    neigbors.reveal();
                }
            }
        }
    }
}

Cell.prototype.countMines = function(){
    if(this.mine){
        this.neighborCount = -1;
        return;
    }
    var total = 0;

    for(var xoff = -1; xoff <= 1; xoff++){
        for(var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < column && j > -1 && j < rows){
                var neigbors = grid[i][j];
                if(neigbors.mine){
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function(x, y){
    return(x > this.x && x < this.x + this.s && y > this.y && y < this.y + this.s);
}

