import {get_direction} from "./listener.js"
export const SNAKE_SPEED = 6
let new_part = 0
const snake_body = [{x:11,y:11}]

export function update() {
    add_part()
    for(let i = snake_body.length - 2; i>=0; i--) {
        snake_body[i+1] = {...snake_body[i]}
    }
    const director = get_direction()
    snake_body[0].x += director.x
    snake_body[0].y += director.y
    // console.log('upd_snake')
}

export function draw(game_board) {
    snake_body.forEach(part => {
        const snake_element = document.createElement('div')
        snake_element.style.gridRowStart = part.y
        snake_element.style.gridColumnStart = part.x
        snake_element.classList.add('snake')
        game_board.append(snake_element)
    })
    // console.log('draw_snake')
}

export function expend_snake(val) {
    new_part += val
}

export function onsnake(pos,ign) {
    return snake_body.some((part,idx) => {
        if(ign&&!idx)return false
        return is_pos_equal(part,pos)
    })
}

export function touch_head(pos){
    return onsnake(pos,true)
}

export function get_head_pos() {
    return snake_body[0]
}

function is_pos_equal(pos1, pos2) {
    return pos1.x===pos2.x && pos1.y===pos2.y
}

function add_part() {
    for(let i = 0; i<new_part; i++){
        snake_body.push({...snake_body[snake_body.length-1]})
    }
    new_part=0
}