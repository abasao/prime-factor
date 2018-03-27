<template>
    <div>
        <div class='menu grid-center'>
            <!-- <button @click='evaluateExpression'>Eval Button Here</button> -->
            <div class='btn-container'>
                <div class="btn" @click='buttonClicked'><p>0</p></div>
                <div class="btn" @click='buttonClicked'><p>2</p></div>
                <div class="btn" @click='buttonClicked'><p>4</p></div>
                <div class="btn" @click='buttonClicked'><p>6</p></div>
                <div class="btn" @click='buttonClicked'><p>8</p></div>
            </div>
            <div class='btn-container'>            
                <div class="btn" @click='buttonClicked'><p>1</p></div>
                <div class="btn" @click='buttonClicked'><p>3</p></div>
                <div class="btn" @click='buttonClicked'><p>5</p></div>
                <div class="btn" @click='buttonClicked'><p>7</p></div>
                <div class="btn" @click='buttonClicked'><p>9</p></div>
            </div>
            <!-- <div class='input-container flex-center'>
                <input type="text">
            </div> -->
            <div class='factor-row flex-center'>
                <div class='factor flex-center' v-for='(factor, factor_index) in this.factors' :key='factor_index'
                @click='removeFactor(factor)'>
                    <p>
                        {{factor.value}}
                    </p>
                </div>
            </div>
        </div>
        <div class='grid-center' id='board' :style='style()'>
            <!-- <div class='board-tiles flex-center' v-for="(viewTile, index) in this.board.View" :key='index'>
                    <tile class='tile flex-center' :tile='viewTile' 
                    @selected='selectionHandler'/>
            </div> -->
                    <tile class='tile flex-center' v-for="(viewTile, index) in this.board.View" :tile='viewTile' 
                    @selected='selectionHandler' :key='index'/>            
        </div>
        <div class='submission grid-center'>
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
            msg: 'A message from Data',
            factors: []
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
        },
        buttonClicked(e){
            let btnValue = e.target.innerText;
            console.log(btnValue);
            this.factors.push({value: btnValue, show: true});

        },
        removeFactor(factor){
            console.log(this.factors)
            factor.show = false;
            let ind = this.factors.indexOf(factor);
            this.factors.splice(ind,1)
            console.log(this.factors);
        }
    },
    components: {
        tile
    }
}
</script>

<style>

</style>
