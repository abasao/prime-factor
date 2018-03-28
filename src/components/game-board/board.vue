<template>
    <div>
        <!-- :class='factorize()' -->
        <div class='menu grid-center ' :class='sumSelected()'>
            <!-- <button @click='evaluateExpression'>Eval Button Here</button> -->
            <div class='btn-container'>
                <div class="btn" @click='buttonClicked'><p>2</p></div>
                <div class="btn" @click='buttonClicked'><p>3</p></div>
                <div class="btn" @click='buttonClicked'><p>5</p></div>
                <div class="btn" @click='buttonClicked'><p>7</p></div>
                <div class="btn" @click='buttonClicked'><p>9</p></div>
                <div class="btn" @click='buttonClicked'><p>11</p></div>
            </div>

            <div class="factor-row grid-center">
                <div class='factors flex-center'>
                    <div class='factor-tile flex-center' 
                    v-for='(factor, factor_index) in this.factors' 
                    @click='removeFactor(factor)' :key='factor_index'>
                        <p>
                        {{factor.value}}
                        </p>
                    </div>
                </div>
                <div class='result-col flex-center'>
                    <div class='result flex-center'>
                        <p>
                            {{results}}
                        </p>
                    </div>
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
            factors: [],

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
        sumSelected(){
            return this.board.isSum() ? '' : 'hidden'
        },
        selectionHandler(payload){
            this.board.select(payload);
        },
        evaluateExpression(){
            this.board.evaluate();
        },
        buttonClicked(e){
            let btnValue = e.target.innerText;
            this.factors.push({value: btnValue, show: true});

        },
        removeFactor(factor){
            factor.show = false;
            let ind = this.factors.indexOf(factor);
            this.factors.splice(ind,1)
        }
    },
    computed: {
        results(){
            if (this.factors.length > 0){
                return this.factors.reduce((acc, factor) => acc*factor.value, 1)
            }else{
                return 0
            }
        }
    },
    components: {
        tile
    }
}
</script>

<style>

</style>
