<template>
    <div>
        <div class='menu'>
            <!-- <button @click='evaluateExpression'>Eval Button Here</button> -->
            <div class='btn-container'>
                <div class="btn"><p>0</p></div>
                <div class="btn"><p>2</p></div>
                <div class="btn"><p>4</p></div>
                <div class="btn"><p>6</p></div>
                <div class="btn"><p>8</p></div>
            </div>
            <div class='btn-container'>            
                <div class="btn"><p>1</p></div>
                <div class="btn"><p>3</p></div>
                <div class="btn"><p>5</p></div>
                <div class="btn"><p>7</p></div>
                <div class="btn"><p>9</p></div>
            </div>
            <div class='input-container'>
                <input type="text">
            </div>
        </div>
        <div id='board' :style='style()'>
            <div class='board-tiles' v-for="(viewTile, index) in this.board.View" :key='index'>
                    <tile class='tile' :tile='viewTile' 
                    @selected='selectionHandler'/>
            </div>
        </div>
        <div class='submission'>
            <button @click='evaluateExpression'>Submit</button>
        </div>
    </div>
</template>

<script>
import tile from "./tile";
import { Board } from "./board-logic";
export default {
    props: {

    },
    data(){
        return {
            board: new Board(5),
            msg: 'A message from Data'
        }
    },
    methods: {
        display(){
            return this.board.View
        },
        style(){
            let size = this.board.size;
            return {gridTemplate: `repeat(${size}, minmax(50px, 85px)) / repeat(${size}, minmax(50px, 85px))`}
        },
        selectionHandler(payload){
            // console.log('clicked: ' + payload.value)
            this.board.select(payload);
        },
        evaluateExpression(){
            console.log('eval express')
            this.board.evaluate();
        }
    },
    components: {
        tile
    }
}
</script>

<style>

</style>
