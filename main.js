import { update as update_snake, draw as draw_snake, SNAKE_SPEED, get_head_pos, touch_head } from "./snake.js"
import { update as update_food, draw as draw_food } from "./food.js"
import { vaild } from "./grid.js"
let prevTime = 0
let islost = false
const game_board = document.getElementById('game_board')

function main(currentTime) {
    if(islost){
        if(confirm('lost')){
            window.location = './'
        }
        // alert('lost')
        return
    }
    window.requestAnimationFrame(main)
    const SECOND_SINCE_LAST_TIME = (currentTime-prevTime)/1000
    if (SECOND_SINCE_LAST_TIME<1/SNAKE_SPEED) return

    prevTime = currentTime

    update()
    draw()
}
// main()
window.requestAnimationFrame(main)


function update() {
    update_snake()
    update_food()
    chk_death()
}

function draw() {
    game_board.innerHTML = ""
    draw_snake(game_board)
    draw_food(game_board)
}

function chk_death() {
    console.log(vaild(get_head_pos()))
    islost = vaild(get_head_pos()) || touch_head(get_head_pos())
}