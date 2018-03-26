var Board = function(size = 4){
    this.size = size;
    this.View = [];
    for (let i = 0; i < this.size*this.size; i++) {
        let obj = {
            index: i,
            value: this.RNG(),
            visible: true,
            highlighted: false
        }
        this.View.push(obj);
    }
    //Store index of selected tiles
    this.tileStore= [];
}

Board.prototype.RNG = function (min = 1, max = 10) {
    return min + Math.floor(Math.random() * max)
}

Board.prototype.select = function(tile) {
    if (!tile.highlighted) {
        //store selected tiles
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
        }
        //save accumulated value in last targeted Tile
        let lastIndex = this.tileStore.pop();
        this.View[lastIndex].value = accumulate;
        this.View[lastIndex].visible = true;
        //reset Store
        this.tileStore = [];
    }
    console.log('evaling');
}
export {Board}