<template>
<div class="tile" :class="[{ dark: this.darkTheme.reactive},getTileClass()]">
    <div class="tile-inner">{{ `${tile.value}` }}</div>
</div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tile', 'x', 'y'],
  inject: ['darkTheme'],
  data () {
    return {
      darkTheme: this.darkTheme
    }
  },
  methods: {
    getTileClass () {
      return `tile-${this.tile.value} tile-position-${this.x + 1}-${this.y + 1}`
    }
  }
}
</script>
