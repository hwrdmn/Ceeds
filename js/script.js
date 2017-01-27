var initData = [[1,2,3,4,5,6,7,8,9],
                [1,1,1,2,1,3,1,4,1],
                [5,1,6,1,7,1,8,1,9]];

$(function(){    
    function drawTabel(Data){
        Data.forEach(function(line){
            var row = $('<tr></tr>');
            line.forEach(function(item){
                var cell = $('<td></td>').text(item);
                row.append(cell);
            });
            $('table').append(row);
        })
    };

    drawTabel(initData);
    var checkItem = selectItem()

    $('td').click(function(){
        var i = $(this).parent().index();
        var j = $(this).index()        
        var ppp = checkItem(initData[i][j]);
        console.log(ppp);
    });

    function selectItem(){
        var previusValue = 0;
        var check = function(value){
            if (previusValue===0){
                previusValue = value;
                return null;
            } else if ((previusValue == value) || (previusValue+value===10)){
                previusValue=0;
                return true;
            } else {
                previusValue=0;
                return false;
            }          
        };                
        return check;
    };
});
