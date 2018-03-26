<template>
  <div :class='classBind()' @click='toggleDisplay'>
      <p>
          {{num}}
      </p>
  </div>
</template>

<script>
export default {
    props:{
        num: Number
    },
    data(){
        return {
            display: true
        }
    },
    methods: {
        classBind(){
            return this.display ? '' : 'tile-hide'
        },
        toggleDisplay(){
            console.log('clicked')
            this.display = !this.display;
        }
    }
}
</script>

