<template>
  <div :class='classBind()' @click='selectNumber' 
  @mousedown.left="startGroupSelection" @mouseup.left="endGroupSelection"
  @mouseover="hoverSelection">
      <p>
          {{tile.value}}
      </p>
  </div>
</template>

<script>
export default {
    props:{
        tile: Object,
    },
    data(){
        return {
            classObj: ''
        }
    },
    methods: {
        classBind(){
            let styleClass = '';
            if (!this.tile.visible){
                styleClass = 'hidden' + ' ';
            }
            if (this.tile.highlighted){
                styleClass += 'tile-selected' + ' '
            }
            if (this.tile.isSum) {
                styleClass += 'is-sum'
            }
            return styleClass
        },
        selectNumber (){
            this.$emit('selected', this.tile);
        },
        startGroupSelection (){
            this.$emit('startGroupSelection', this.tile)
        },
        endGroupSelection (){
            this.$emit('endGroupSelection', this.tile)
        },
        hoverSelection (){
            this.$emit('hoverSelection', this.tile)
        }            
        // evaluate(){
        //     this.$emit('evaluate', this.tile)
        // }
    },
    computed: {

    }
}
</script>

