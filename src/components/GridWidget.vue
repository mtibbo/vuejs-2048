<template>
<div>
    <div class="above-game">
      <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
      <a class="restart-button">New Game</a>
    </div>
    <div class="app-notice">
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
