export default class Tile  {
    constructor (value) {
        this.value = value
    }

    increment (val = 2) {
        this.value += val
    }

    erase () {
        this.value = 0
    }
}