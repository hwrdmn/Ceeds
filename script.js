var Items = function(initArrayData){
    this.items = initArrayData;
    var rowSize = initArrayData[0].length;
    var isSelected = false;
    var firstSelectedItem = {row:null,
                            col:null};
    var firstAdded = false;
    var self = this;

    function sumItemsRow(row){
        var sum = row.reduce(function(sum, current){
            return sum + current;
        });
        return sum;
    };

    function checkSumItems(item1, item2){
        return item1 + item2 === 10 ? true : false;
    };

    function checkEqualItems(item1, item2){
        return item1 === item2 ? true : false;
    };

    function checkRowNeighbor(row, col1, col2){
        var sum = 0;
        for (let i = col1+1; i<col2; i++){
            sum+=self.items[row][i];
        }
        return sum === 0 ? true : false;
    };

    function checkColNeighbor(row1, row2, col){
        var sum = 0;
        for (let i = row1+1; i<row2; i++){
            sum+=self.items[i][col];
        }
        return sum === 0 ? true : false;
    };

    function compareItemPosition(row1, col1, row2, col2){
        if (row1===row2){
            if (col1 < col2){
                return true;
            } else {
                return false;
            }
        } else if (row1 < row2){
            return true;
        } else {
            return false;
        }
    };

    function checkGreaterPosition(row1, col1, row2, col2){
        if (row1 == row2) 
            if (col1 < col2)
                return true;
            else 
                return false;
        if (row1<row2)
            return true;
        else 
            return false;
    };

    function checkNeighbor(row1, col1, row2, col2){
        let item1 = self.items[row1][col1],
            item2 = self.items[row2][col2];
        if (!checkSumItems(item1, item2) && !checkEqualItems(item1, item2)){  
            return false;
        }
        if (checkGreaterPosition(row1, col1, row2, col2) === false){            
            let r = row1, c = col1;
            row1 = row2; row2 = r;
            col1 = col2; col2 = c;
        }
        if ((row1===row2) && (col1===col2))
            return false;
        if (row1===row2){
            return checkRowNeighbor(row1, col1, col2);
        } else if (col1 === col2){
            return checkColNeighbor(row1, row2, col1);
        } else{
            let sum1 = 0,
                sum2 = 0,
                t,
                row;
            t = self.items[row1].slice();
            row = t.splice(col1+1, self.items[row1].length - col1);
            sum1 = row.length===0 ? 0 : row.reduce(function(sum, current){
                    return sum + current;
                });
            t = self.items[row2].slice();;
            row = t.splice(0, col2);
            sum2 = row.length===0 ? 0 :  row.reduce(function(sum, current){
                    return sum + current;
                });
            return (sum1+sum2) === 0  ? true : false;
        }
    }

    function checkEmptyRow(row){
        var sum = sumItemsRow(row);
        return sum === 0 ? true : false;
    }

    function delEmptyRow(rowIndex){
        self.items.splice(rowIndex, 1);
    }

    this.selectItem = function(row, col){
        if (!isSelected){
            firstSelectedItem.row = row;
            firstSelectedItem.col = col;
            isSelected = true;
        } else {
            if (checkNeighbor(firstSelectedItem.row, firstSelectedItem.col, row, col)){
                this.items[firstSelectedItem.row][firstSelectedItem.col] = 0;
                this.items[row][col] = 0;
                this.items.forEach(function(row, i) {
                    if (checkEmptyRow(row)){
                        delEmptyRow(i);
                    }                    
                }, this);
                this.items.forEach(function(row, i) {
                    if (checkEmptyRow(row)){
                        delEmptyRow(i);
                    }                    
                }, this);
            };
            isSelected = false;
            firstSelectedItem.row = null;
            firstSelectedItem.col = null;
        }
    };

    this.checkEmpty = function() {
        if (self.items.lenth === 0)
            return true;
        else
            return false;
    }

    this.getColCount = function() {
        return this.items[0].length;
    }

    this.getRowCount = function() {
        return this.items.length;
    }

    this.getItemValue = function(row, col) {
        if (this.items[row][col] == 0)
            return ''
        else 
            return this.items[row][col].toString();
    }

    this.addRows = function(){
        let t1 = [];
        let t = [];
        let r;
        this.items.forEach(function(row) {
            row.forEach(function(item) {
                if (item !== 0)
                    t.push(item);                
            }, this);            
        }, this);
        
        if (firstAdded == false){  
            r = rowSize - t.length % rowSize;    
            for (let i = 0; i<r; i++)
                t.push(0);
            while (t.length != 0){
                for (let i = 0; i < rowSize; i++){
                    t1.push(t.shift());
                }
                this.items.push(t1);
                t1 = [];
            }
            firstAdded = true;
        } else {
            let lastRow = this.items[this.items.length - 1];
            let indexLastEl = 0;
            
            for (let i = lastRow.length - 1; i >= 0; i--){
                if (lastRow[i] == 0)
                    indexLastEl = i;
                else 
                    break;
            }
            for (let i = indexLastEl; i<lastRow.length; i++){
                lastRow[i] = t.shift()
            }
            r = rowSize - t.length % rowSize; 
            for (let i = 0; i<r; i++)
                t.push(0);
            while (t.length != 0){
                for (let i = 0; i < rowSize; i++){
                    t1.push(t.shift());
                }
                this.items.push(t1);
                t1 = [];
            }
        }
        console.log(this.items);
    }
};

var Game = function(){
    var initData = [[1,2,3,4,5,6,7,8,9],
                    [1,1,1,2,1,3,1,4,1],
                    [5,1,6,1,7,1,8,1,9]];

    var testData = [[1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1]];
                    
    this.data = new Items(initData);
    var self = this;
    var canvas;
    var context;
    var colCount,
        rowCount;
    var button;
    const COL_WIDTH = 40;
    const ROW_HEIGHT = 40;
    const START_X = 0;
    const START_Y = 0;

    this.changeSizeCanvas = function (){
        self.colCount = self.data.getColCount();
        self.rowCount = self.data.getRowCount();
        self.canvas.width = COL_WIDTH * self.colCount;
        self.canvas.height = ROW_HEIGHT * self.rowCount;
    }

    this.init = function(){
        this.canvas = document.getElementsByTagName('canvas')[0];
        this.canvas.addEventListener('click', function (e) {
            self.onClick(e);
        });
        this.button = document.getElementById('add').onclick = self.onAddClick;
        this.changeSizeCanvas();
        this.context = this.canvas.getContext('2d');
        this.drawTable();
    };

    this.clear = function(){
        this.canvas.clearRect(0,0, this.canvas.width, this.canvas.height);
    };

    this.drawTable = function(){
        let i, j;
        let pos = START_Y;
        this.clear();
        this.context.moveTo(START_X, START_Y);
        this.changeSizeCanvas();
        for (i = 0; i<=this.colCount; i++){
            this.context.lineTo(pos, this.canvas.height);
            pos+=COL_WIDTH
            this.context.moveTo(pos, START_Y);            
        }
        this.context.moveTo(START_X, START_Y);
        pos = START_Y;
        for (j = 0; j<=this.rowCount; j++){
            this.context.lineTo(this.canvas.width, pos);
            pos+=ROW_HEIGHT
            this.context.moveTo(START_Y, pos); 
        }
        this.context.strokeStyle = 'grey';
        this.context.stroke();
        let posX = 15,
            posY = 25;
        this.context.font = '20px Arial';
        for (i = 0; i<this.rowCount; i++){
            for (j = 0; j<this.colCount; j++){             
                this.context.fillText(this.data.getItemValue(i,j), posX, posY); 
                posX += COL_WIDTH;               
            }
            posX = 15;
            posY += ROW_HEIGHT;
        }

    };

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }; 

    this.getRow = function(y){
        return Math.floor(y / ROW_HEIGHT);
    }

    this.getCol = function(x){
        return Math.floor(x / COL_WIDTH);
    }

    this.onClick = function(e){
        var rect = this.canvas.getBoundingClientRect(), 
            x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            row = this.getRow(y), 
            col = this.getCol(x);
        this.data.selectItem(row, col);
        if (this.data.checkEmpty()){
            console.log('win');
        }
        this.drawTable();
    };

    this.onAddClick = function(){
        self.data.addRows();
        self.drawTable();
    }


}

document.addEventListener('DOMContentLoaded', function () {
    this.game = new Game();
    this.game.init();
});