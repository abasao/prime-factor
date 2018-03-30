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
import { myModule } from "./board-logic.js";
import { Tile } from "./tile.js"
let mod = myModule();

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
}

Board.prototype.addTile = function (coords){
    let index = this.View.length;
    let value = mod.RNG();
    return new Tile(coords, value, mod.factorize(value), index)
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
        headTile.factors = mod.factorize(accumulate);
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
        return [sum, selection.value, selection]
    }
    return [false]
}
export {Board}