var Board = function(size = 4){
    this.size = size;
    this.View = [];
    for (let i = 0; i < this.size*this.size; i++) {
        this.View.push(i*i);
    }
}

Board.prototype.getView = function() {
    return this.View    
}

export {Board}