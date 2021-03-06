let userName
import { getData } from "./httpAction.js"

$(document).ready(function () {
    $("#unamesubmit").click(function () {
        userName =  $("#unameinput").val()
        window.location = './game/game.html?username='+userName
    });
    const url = "https://snake-game-backend.herokuapp.com/Alldatas"
    getData(url)
    .then(data => {
        $("#first").children().remove();
        $("#second").children().remove();
        $("#third").children().remove();
        const alluserDatas = data.datas
        $("#first").text("1st."+alluserDatas[0].uid+"(score:"+alluserDatas[0].score+")")
        $("#second").text("2nd."+alluserDatas[1].uid+"(score:"+alluserDatas[1].score+")")
        $("#third").text("3rd."+alluserDatas[2].uid+"(score:"+alluserDatas[2].score+")")
    })
    .catch(error => console.error(error))
});
