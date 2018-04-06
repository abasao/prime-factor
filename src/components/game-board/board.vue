<template>
    <div>
        <!-- the menu should be own component, one of the buttons should be 
        a selector with primes above 11 and below 97 -->
        <div class='menu grid-center ' :class='sumSelected()'>
            <div class='btn-container'>
                <div class="btn" @click='buttonClicked'><p>2</p></div>
                <div class="btn" @click='buttonClicked'><p>3</p></div>
                <div class="btn" @click='buttonClicked'><p>5</p></div>
                <div class="btn" @click='buttonClicked'><p>7</p></div>
                <div class="btn" @click='buttonClicked'><p>9</p></div>    
                <div class="btn" @click='buttonClicked'><p>11</p></div>    
                <!-- <select v-model='selected' class="btn">
                    <option 
                    v-for='(prime, index) in primes' :key='index'
                    :value="prime">
                        {{prime}}
                    </option>
                </select> -->

                <!-- <div class="btn" @click='buttonClicked'><p>11</p></div> -->
            </div>

            <div class="factor-row grid-center">
                <div class='factors flex-center' id='myTarget'>
                    <div class='factor-tile flex-center' 
                    v-for='(factor, factor_index) in this.factors' 
                    :key='factor_index'>
                        <div class='factor-value flex-center' @click='removeFactor(factor)'>
                            <p>
                            {{factor.value}}
                            </p>
                        </div>
                        <div class='operator flex-center'>
                            <p>
                                ×
                            </p>
                        </div>
                    </div>
                </div>
                <div class='result-col flex-center' :class="equalFactorClass">
                    <div class='result flex-center'>
                        <p>
                            {{results}}
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div class='submission flex-center'>
            <button @click='evaluateExpression'>
                + Add 
            </button>
            <button disabled='disabled' style='pointer-events: none;'>Score: {{score}}</button>
            <button :class="{hidden: !equalFactor()}"  @click='addScore'> <!-- :class='sumSelected()' -->
                Factor 
            </button>
        </div>
        <div class='grid-center' id='board' :none='style()'>
            <tile class='tile flex-center' v-for="(viewTile, index) in this.board.View" :tile='viewTile' 
            @hoverSelection='hoverSelect' :key='index' 
            @startGroupSelection='groupSelect' @endGroupSelection='groupSelect("end")'
            />            
            <!-- <div class="game-over" style='grid-column: span 5'> -->
                <game-over style='grid-column: span 5'
                :board="board" :restart="resetGame"></game-over>
            <!-- </div> -->
        </div>
        <div class="grid-center">
            <button class="submission" style='font-size: 1.3em;' @click='resetGame'> Reset Game </button>
        </div>
    </div>
</template>

<script>
import tile from "./tile.vue";
import gameOver from "./game-over.vue"
import { Board } from "./board.js";

export default {
    props: {

    },
    data(){
        return {
            board: new Board(5),
            msg: 'A message from Data',
            factors: [],
            tileGroup: [],
            score: 0,
            startSelecting: false,
            removeSelection: false
        }
    },
    methods: {
        style (){
            let size = this.board.size;
            return {gridTemplate: `repeat(${size}, minmax(30px, 85px)) / repeat(${size}, minmax(30px, 85px))`}
        },
        sumSelected (){
            //just bind class hidden to truth value of isSum
            return this.board.isSum().status ? '' : 'hidden'
        },
        groupSelect (payload){
            if(typeof payload.value === 'number') {
                //add tile, enable group-selection, save or remove 
                //based on target selection state, toggle target selection state
                this.tileGroup.push(payload);
                this.startSelecting = true;     
                this.removeSelection = payload.highlighted ? true : false;
                this.board.select(payload)
            }else if (payload === 'end'){
                //reset
                this.removeSelection = false;
                this.startSelecting = false;
                this.tileGroup = [];
            }
        },
        hoverSelect (payload){
            if(this.startSelecting){
                if(this.tileGroup.includes(payload)){

                }else{
                    this.tileGroup.push(payload);
                    //if remove
                    if (this.removeSelection) {
                        //if selected, un-select, if un-selected don't do anything
                        if (payload.highlighted){ 
                            this.board.select(payload)
                        }
                    }else{ //if not remove
                        //if not selected, then select, else don't do anything
                        if (!payload.highlighted){
                            this.board.select(payload)
                        }
                    }
                }
            }
        },
        evaluateExpression (){
            //wasted method, go directly to this
            let headTile = this.board.evaluate();
            if(headTile){
                this.groupSelect(headTile);
                this.groupSelect('end');
            }
        },
        buttonClicked (e){
            let btnValue = e.target.innerText;
            this.factors.push({value: btnValue, show: true});
        },
        removeFactor (factor){
            factor.show = false;
            let ind = this.factors.indexOf(factor);
            this.factors.splice(ind,1)
        },
        equalFactor(){
            let target = this.board.isSum();
            if(target.status && this.results === target.value){
                console.log('factor successful!!')
                return true
            }
        },
        addScore (){
            this.score += this.setScore(this.factors);
            let completeTile = this.board.isSum().Tile;
            completeTile.complete = true;
            this.board.select(completeTile);
            this.factors = [];
        },
        setScore (factor){
            var len = factor.length;
            console.log('my factor')
            console.log(factor)
            let m = factor.reduce( (accum, val) => {
                accum += val.value > 2 ? 3 : 2;
                return accum
            }, 0)
            console.log('my reduction' + m)
            return m + Math.floor(len/3)*len
        },
        resetGame (){
            this.board = new Board(5);
            this.msg = 'A message from Data';
            this.factors = [];
            this.tileGroup = [];
            this.startSelecting = false;
            this.removeSelection = false;

        },  
    },
    computed: {
        results (){
            if (this.factors.length > 0){
                return this.factors.reduce((acc, factor) => acc*factor.value, 1)
            }else{
                return 0
            }
        },
        equalFactorClass(){
            //another place where you can bind class to truthiness of object method
            if(this.equalFactor()){
                return 'greenlight'
            }else{
                return ''
            }
        },
        primes (){
            return 
            [
                11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,
                71,73,79,83,89,91,101,103,107,109,113,127,131
            ]
        },        
    },
    components: {
        tile,
        gameOver
    }
}
</script>

<style>

</style>
