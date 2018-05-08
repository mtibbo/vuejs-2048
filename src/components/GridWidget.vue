<template>
<div>
    <div class="above-game">
      <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
      <a class="restart-button">New Game</a>
    </div>
    <div class="app-notice">
      <span class="notice-close-button">x</span>
      <p><strong class="important">New:</strong> Get the new 2048 app for <a href="https://itunes.apple.com/us/app/2048-by-gabriele-cirulli/id868076805" target="_blank">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048" target="_blank">Android!</a></p>
    </div>
    <div class="grid-container">
       <div v-for="yTile in grid.tiles" class="grid-row">
            <div class="grid-cell" v-for="xTile in yTile"></div>
        </div>
    </div>
    <div class="tile-container">
       <div v-for="yTile, indexY in grid.tiles">
            <tile v-for="xTile, indexX in yTile" v-if="xTile.value > 0" :tile="xTile" :x="indexX" :y="indexY"></tile>
        </div>
    </div>
</div>
</template>
<script>
import Tile from './TileWidget'
import { EventBus } from './../event-bus'
import Grid from './../models/grid'

export default {
  name: 'Grid',
  props: ['xDim', 'yDim'],
  components: {'tile': Tile},
  data () {
    return {
      grid: []
    }
  },
  created () {
    this.createGrid()
    EventBus.$on('move', this.move)
  },
  beforeDestroy () {
    EventBus.$off('move', this.move)
  },
  methods: {
    createGrid () {
      this.grid = Grid.init(this.yDim, this.xDim)
    },
    move (direction) {
       if (this.grid.canMove() !== true) {
        alert('Perdu !')
      } else {
        switch (direction) {
          case this.$UP:
            this.grid.up()
            break
          case this.$DOWN: 
            this.grid.down()
            break
          case this.$RIGHT: 
            this.grid.right()
            break
          case this.$LEFT: 
            this.grid.left()
            break
        }
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style scoped>

.line {
    width: 100%;
    display: flex;
    justify-content: center;
}

</style>
