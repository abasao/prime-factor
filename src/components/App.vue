<template>
  <div id="app">
    <div class="grid">
      <h1>New Vue App</h1>
    </div>
    <board class="grid"/>
    <div class='grid display-lg'>
      <h4>Here is how you play</h4>
    </div>
    <div class='display-sm'>
        <h4>Here is how you play mobile</h4>
    </div>
  </div>
</template>

<script>
import board from './game-board/board.vue'

export default {
  name: 'App',
  components: {
    board
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
