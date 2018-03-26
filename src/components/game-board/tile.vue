<template>
  <div :class='classBind()' @click='selectNumber'>
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
        // classBind(){
        //     this.classObj = this.tile.visible ? '' : 'tile-hide ';
        //     this.classObj += this.tile.highlighted ? ' selected' : '';
        //     return this.classObj
        // },
        classBind(){
            let styleClass = '';
            if(!this.tile.visible){
                styleClass = 'tile-hide'+' ';
            }
            if(this.tile.highlighted){
                styleClass += 'tile-selected'
            }
            return styleClass
        },
        selectNumber(){
            this.$emit('selected', this.tile);
        },
        evaluate(){
            this.$emit('evaluate', this.tile)
        }
    },
    computed: {

    }
}
</script>

