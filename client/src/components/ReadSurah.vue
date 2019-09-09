<template>
  <v-layout column>
    <v-flex md12 sm12 offset-sm0>
      <panel title="Read Surah" class="my-panel-read">
        <div class="text-arabic" v-for="verse in verses" :key="verse.id">
          {{ verse.text_madani }}
           <v-divider></v-divider>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'
export default {
  data: () => ({
    page: 1,
    verses: []
  }),
  async mounted () {
    const idSurah = this.$store.state.route.params.idSurah
    const { data } = await (await SurahsService.getAyahs(idSurah, 1))
    console.log(data)
    this.verses = data.verses
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>
.text-arabic {
  font-size: 35px;
  font-weight: 700;
  font-family: 'Scheherazade', serif;
  text-shadow: 1px 1px 1px #aaa;
}
</style>
