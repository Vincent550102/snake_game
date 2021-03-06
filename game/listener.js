
let direction = {x:0,y:0}


window.addEventListener("keydown", e =>{
    switch (e.key){
        case "k":
        case "ArrowUp":
            if(direction.y!==0) break
            direction = {x:0,y:-1}
            break
        case "h":
        case "ArrowLeft":
            if(direction.x!==0) break
            direction = {x:-1,y:0}
            break
        case "j":
        case "ArrowDown":
            if(direction.y!==0) break
            direction = {x:0,y:1}
            break
        case "l":
        case "ArrowRight":
            if(direction.x!==0) break
            direction = {x:1,y:0}
            break
    }
})

export function is_moved(){
    return direction.x!=0||direction.y!=0
}

export function get_direction(){
    return direction
}