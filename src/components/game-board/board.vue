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
                    <tile class='tile flex-center' v-for="(viewTile, index) in this.board.View" :tile='viewTile' 
                    @hoverSelection='hoverSelect' :key='index' 
                    @startGroupSelection='groupSelect' @endGroupSelection='groupSelect("end")'
                    />            
        </div>
        <div class='submission grid-center'>
            <button @click='evaluateExpression'>Submit</button>
        </div>
    </div>
</template>

<script>
import tile from "./tile.vue";
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
            startSelecting: false,
            removeSelection: false
        }
    },
    methods: {
        display (){
            return this.board.View
        },
        style (){
            let size = this.board.size;
            return {gridTemplate: `repeat(${size}, minmax(50px, 85px)) / repeat(${size}, minmax(50px, 85px))`}
        },
        sumSelected (){
            return this.board.isSum() ? '' : 'hidden'
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
                    console.log('hovering after selection start')
                }
            }
        },
        evaluateExpression (){
            this.board.evaluate();
        },
        buttonClicked (e){
            let btnValue = e.target.innerText;
            this.factors.push({value: btnValue, show: true});
        },
        removeFactor (factor){
            factor.show = false;
            let ind = this.factors.indexOf(factor);
            this.factors.splice(ind,1)
        }
    },
    computed: {
        results (){
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
