<template>
  <div id='board' :style='style()'>
      <div class='board-tiles' v-for="(viewTile, index) in this.board.View" :key='index'>
            <tile class='tile' :num='viewTile'/>
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
            return this.board.getView()
        },
        style(){
            let size = this.board.size;
            return {gridTemplate: `repeat(${size}, minmax(50px, 85px)) / repeat(${size}, minmax(50px, 85px))`}
        }
    },
    components: {
        tile
    }
}
</script>

<style>

</style>
