import { update as update_snake, draw as draw_snake, SNAKE_SPEED, get_head_pos, touch_head } from "./snake.js"
import { update as update_food, draw as draw_food, get_is_eaten} from "./food.js"
import { vaild } from "./grid.js"
import { is_moved } from "./listener.js"
let prevTime = 0
let islost = false
let userName
let score = 0
let time
let waiting_time
const game_board = document.getElementById('game_board')
const dash_board = document.getElementById('dash_board')

function main(currentTime) {
    if(islost){
        if(confirm('lost')){
            window.location = '../'
        }
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


function update(currentTime) {
    update_dash(currentTime)
    update_snake()
    update_food()
    chk_death()
}

function draw() {
    game_board.innerHTML = ""
    draw_dash(dash_board)
    draw_snake(game_board)
    draw_food(game_board)
}

function draw_dash(ele) {
    let push_in_thing = [userName,score,time]
    let origin = ["名字(Name) : ","得分(Score) : ","時間(Time) : "]
    for(let i = 0; i<3; i++){
        ele.children[i+1].innerHTML = origin[i] + push_in_thing[i]
    }
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

