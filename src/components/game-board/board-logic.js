/*
Create Board, fill it with tiles, assign random values to the tiles.
Give them index to make tracking them easy. Tiles have coordinates
to make row or column based mouse action simple to compute.
Visibility for live or dead tiles, highlight for selected tiles.

Find if a tile is a Sum of at least 2 tiles to allow factorization.
Uppon evaluate event, sum tile values and reset except the
head of the selection (first selected tile: tail, last selected tile: head)

Store holds index/indices of selected tiles. 
Find index, look for it in Board.View array and operate on it.

Tiles have factors, Sum-tiles can be factorized if user guesses their factors.
Look to see if factors are a part of tiles factors-array.

*/

var Tile = function(coordinates, value, factors, index){
    this.index = index;
    this.value = value;
    this.factors = factors;
    this.position = coordinates;
    this.visible = true;
    this.highlighted = false;
    this.isSum = false;
}
var Board = function(size = 4){
    this.size = size;
    this.View = [];
    for (let row = 0; row < this.size; row++) {
        for (let col = 0; col < this.size; col++) {            
            this.View.push( 
                this.addTile([row, col]) 
            );
        }
    }
    //Store index of selected tiles index
    this.tileStore= [];
    this.facto
}

Board.prototype.addTile = function (coords){
    let tile = new Tile;
    let index = this.View.length;
    let value = RNG();
    Tile.apply(tile, [coords, value, factorize(value), index])
    return tile
}
//Move all methods that have nothing to do with board
//onto their own module
let factorArray = [2, 3, 5, 7, 9, 11, 13, 17]

function isPrime(value){
    return factorArray.includes(value, 1) //(value, from index)
}

function findPrimes(value) {
    if (factorArray.indexOf(value) !== -1){
        console.log('found factor: ' + value)
        return [value]
    }else{
        for (let f of factorArray){
            if(value % f === 0){
                console.log('found factor: ' + f)
                return [f, ...findPrimes(value/f)]
            }
        }
    }
    return [value]
}
function factorize (value){
    return [...findPrimes(value)];
}

function RNG (min = 1, max = 10) {
    return min + Math.floor(Math.random() * max)
}

Board.prototype.select = function(tile) {
    if (!tile.highlighted) {
        //store selected tiles index
        this.tileStore.push(tile.index)
        tile.highlighted = true;
    }else {
        //on selecting highlighted tile, remove it's highlight
        //and then remove it from store
        tile.highlighted = false;
        let storedTile = this.tileStore.indexOf(tile.index);
        this.tileStore.splice(storedTile, 1);
    }

}

Board.prototype.evaluate = function(){
    //store all selected tile values
    if(this.tileStore.length > 1){
        let accumulate = 0;
        for (let i of this.tileStore) {
            let selectedTile = this.View[i];
            accumulate += selectedTile.value;
            //reset tiles
            selectedTile.visible = false;
            selectedTile.highlighted = false;
            selectedTile.isSum = false;
        }
        //save accumulated value in last targeted Tile
        let lastIndex = this.tileStore.pop();
        let headTile = this.View[lastIndex];
        headTile.value = accumulate;
        headTile.visible = true;
        headTile.isSum = true;
        //reset Store
        this.tileStore = [];
    }
}

Board.prototype.isSum = function (){
    //Only single tile selection of a sum
    //may be factorized
    if (this.tileStore.length === 1){
        let index = this.tileStore[0];
        let selection = this.View[index];
        let sum = selection.isSum ? true : false;
        return sum
    }
    return false
}
export {Board}