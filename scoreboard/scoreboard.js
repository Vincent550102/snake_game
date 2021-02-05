import { getData } from "../httpAction.js"

const htmlEncode = function (handleString){
    return handleString
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/ /g,"&nbsp;")
    .replace(/\'/g,"&#39;")
    .replace(/\"/g,"&quot;");
}


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
            try{
                for(var i = 0; i<3; i++) {
                    if(!i){
                        element[keys[i]] = htmlEncode(element[keys[i]])
                    }
                    $urow.append($('<td>'+element[keys[i]]+'</td>'))
                }
                board.children().next().append($urow)
            }catch(EvalError){
                return;
            }
            // console.log(element)
            
        });
    })
    .catch(error => console.error(error))
});