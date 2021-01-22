let userName

$(document).ready(function () {
    $("#unamesubmit").click(function () { 
        userName =  $("#unameinput").val()
        window.location = './game/game.html?username='+userName
    });
});
