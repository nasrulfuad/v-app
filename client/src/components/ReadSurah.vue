<template>
  <v-layout column>
    <v-flex md12 sm12 offset-sm0>
      <panel title="Read Surah" class="my-panel-read">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cupiditate a, praesentium asperiores neque quis fugiat voluptatum iure corrupti maiores? Beatae ea adipisci ullam odio mollitia veritatis illo magni quia!
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({

  }),
  async mounted () {
    const idSurah = this.$store.state.route.params.idSurah
    console.log(idSurah)
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>
.my-panel-read {
  height: 1000px;
}
</style>
