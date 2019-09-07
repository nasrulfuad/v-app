<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Surahs">
        <div v-for="surah in surahs" :key="surah.name">
          {{ surah.name }}
          {{ surah.verse }}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'
export default {
  data: () => ({
    surahs: null
  }),
  mounted: async () => {
    this.surahs = await SurahsService.index()
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>

</style>
