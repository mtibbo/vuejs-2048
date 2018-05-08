<template>
  <div class="heading">
      <h1 class="title">2048</h1>
      <div class="scores-container"></div>
      <grid v-if="started" :xDim="x" :yDim="y"></grid>
  </div>
</template>

<script>
import GridWidget from './GridWidget'
import { EventBus } from './../event-bus.js'

export default {
  name: 'GameWidget',
  components: {'grid': GridWidget},
  data () {
     return {
         x: null,
         y: null,
         started: false
     } 
  },
  created () {
      this.start()
      this.assignKeys()
  },
  beforeDestroy () {
      this.eraseKeys()
  },
  methods: {
      start () {
          this.x = 4
          this.y = 4
          this.started = true
      },
      bindKeys (e) {
           var vm = this;
          switch (e.keyCode) {
                case vm.$DOWN:
                    vm.Down()
                    break
                case vm.$RIGHT:
                    vm.Right()
                    break
                case vm.$UP:
                    vm.Up()
                    break
                case vm.$LEFT:
                    vm.Left()
                    break
            }
      },
      assignKeys () {
        window.addEventListener('keydown', this.bindKeys)
      },
      eraseKeys () {
        window.removeEventListener('keydown', this.bindKeys)
      },
      Up () {
          EventBus.$emit('move', this.$UP)
      },
      Down () {
          EventBus.$emit('move', this.$DOWN)
      },
      Right () {
          EventBus.$emit('move', this.$RIGHT)
      },
      Left () {
          EventBus.$emit('move', this.$LEFT)
      }
  }
}
</script>

