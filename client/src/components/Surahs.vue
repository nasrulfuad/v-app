<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Surahs">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>

</style>
