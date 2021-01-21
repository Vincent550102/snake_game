let userName

function clickStart(){
    userName = document.getElementById('unameinput').value
    window.location = './game/game.html?username='+userName
    
    // console.log(userName)
}