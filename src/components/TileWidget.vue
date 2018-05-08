<template>
<div class="tile" :class="getTileClass()">
    <div class="tile-inner">{{ tile.value }}</div>
</div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tile', 'x', 'y'],
  data () {
    return {

    }
  },
  methods: {
    getTileClass() {
      return 'tile-' + this.tile.value + ' tile-position-' + (this.x + 1) + '-' + (this.y + 1)
    }
  }
}
</script>



