import { update as update_snake, draw as draw_snake, SNAKE_SPEED, get_head_pos, touch_head } from "./snake.js"
import { update as update_food, draw as draw_food, get_is_eaten} from "./food.js"
import { vaild } from "./grid.js"
import { is_moved } from "./listener.js"
import { postData } from "../httpAction.js"
let prevTime = 0
let islost = false
let userName
let score = 0
let time
let waiting_time

const game_board = $("#game_board")
const dash_board = $("#dash_board")

function main(currentTime) {
    if(islost){
        lost_thing();
        return
    }
    window.requestAnimationFrame(main)
    const SECOND_SINCE_LAST_TIME = (currentTime-prevTime)/1000
    if (SECOND_SINCE_LAST_TIME<1/SNAKE_SPEED) return
    if(waiting_time==null && is_moved()) waiting_time = currentTime
    prevTime = currentTime
    update(currentTime)
    draw()
}
// main()
window.requestAnimationFrame(main)

function lost_thing(){
    $('#endCard').css("visibility","visible")
    var $loading = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'
    $('#statusBoard').append($loading)
    const url = "https://snake-game-backend.herokuapp.com/CheckData"
    const data = {
        "uid":userName
    }
    postData(url,data)
    .then(data => {
        const udata = data
        var status_mess = "您 " + userName + " 達到分數 " + String(score) + " 所花費的時間是 " + String(time)+"\n";
        if(udata.already) {
            if(score>udata.score||(score==udata.score && time<udata.time)) {
                status_mess+="恭喜您這次的成績大於歷史上的成績\n\n按下一步為您更新!";
                insert_data_toDB({
                    "uid":userName,
                    "time":time,
                    "score":score
                });
            } else {
                status_mess+="這次的成績好像沒有歷史上的成績好\n\n按下一步再接再勵qq";
            }
        } else {
            status_mess+="你還沒出現在排行榜上歐\n\n按下一步為您新增~";
            insert_data_toDB({
                "uid":userName,
                "time":time,
                "score":score
            });
        }
        $("#statusBoard").text(status_mess)
    })
    .catch(error => console.error(error))
}

function insert_data_toDB(data){
    postData('https://snake-game-backend.herokuapp.com/catcatGettok',{
        'uid':userName
    })
    .then(access=>{
        const url = 'https://snake-game-backend.herokuapp.com/InsertData';
        postData(url, data, access.access_token)
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

function update(currentTime) {
    update_dash(currentTime)
    update_snake()
    update_food()
    chk_death()
}

function draw() {
    game_board.text("")
    draw_dash(dash_board)
    draw_snake(game_board)
    draw_food(game_board)
}

function draw_dash(ele) {
    let push_in_thing = [userName,score,time]
    let origin = ["名字(Name) : ","得分(Score) : ","時間(Time) : "]
    ele.children().each(function(idx){
        if(!idx) return
        $(this).text(origin[idx-1]+push_in_thing[idx-1])
    })
    // for(let i = 0; i<3; i++){
    //     ele.children[i+1].innerHTML = origin[i] + push_in_thing[i]
    // }
}

function update_dash(currentTime) {
    update_score()
    update_time(currentTime)
    update_name()
}

function update_score() {
    score += get_is_eaten()
}

function update_time(currentTime) {
    time = is_moved()?Math.floor((currentTime-waiting_time)/1000):0
}

function update_name() {
    userName = new URLSearchParams(location.search).get('username')
}

function chk_death() {
    // console.log(vaild(get_head_pos()))
    islost = vaild(get_head_pos()) || touch_head(get_head_pos())
}

