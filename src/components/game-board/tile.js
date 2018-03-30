//If tile class grows too large, migrate here
class Tile {
    constructor(coordinates, value, factors, index) {
        this.index = index;
        this.value = value;
        this.factors = factors;
        this.position = coordinates;
        this.visible = true;
        this.highlighted = false;
        this.isSum = false;
        this.complete = false;
    }
}
export { Tile }