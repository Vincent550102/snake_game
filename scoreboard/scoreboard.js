import { getData } from "../httpAction.js"

$(document).ready(function () {
    const url = "https://snake-game-backend.herokuapp.com/Alldatas"
    getData(url)
    .then(data => {
        $("#loadobj").remove();
        const alluserDatas = data.datas
        const board = $("#scoreboard")
        var cnt = 0;
        alluserDatas.forEach(element => {
            cnt++
            // uid score time
            var $urow = $("<tr></tr>")
            $urow.append($('<th scope="row">' + String(cnt) + '</th>'))
            const keys = ['uid','score','time'];
            for(var i = 0; i<3; i++) {
                $urow.append($('<td>'+element[keys[i]]+'</td>'))
            }
            board.children().next().append($urow)
            // console.log(element)
            
        });
    })
    .catch(error => console.error(error))
});