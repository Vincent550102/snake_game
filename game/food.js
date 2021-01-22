import {onsnake, expend_snake} from "./snake.js"
import {rand_grid_pos} from "./grid.js"
let food_body = get_new_pos()

const expend_rate = 3
let is_eaten = false

export function update() {
    is_eaten = false
    if(onsnake(food_body,false)){
        is_eaten = true
        expend_snake(expend_rate)
        food_body = get_new_pos()
    }
}

export function draw(game_board) {
    const food_element = document.createElement('div')
    food_element.style.gridRowStart = food_body.y
    food_element.style.gridColumnStart = food_body.x
    food_element.classList.add('food')
    game_board.append(food_element)
    // console.log('draw_food')
}

export function get_is_eaten(){
    return is_eaten
}

function get_new_pos() {
    let new_pos
    while(new_pos == null || onsnake(new_pos,false)) {
        new_pos = rand_grid_pos()
    }
    return new_pos
}