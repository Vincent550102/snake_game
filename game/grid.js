
const grid_SIZE = 21

export function rand_grid_pos() {
    return {
        x: Math.floor(Math.random()*grid_SIZE) + 1,
        y: Math.floor(Math.random()*grid_SIZE) + 1
    }
}

export function vaild(pos) {
    return Math.min(pos.x,pos.y) <=0 || Math.max(pos.x,pos.y) > grid_SIZE
}