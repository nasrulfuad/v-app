<template>
  <v-layout column>
    <v-flex md10 sm12 offset-md1>
      <panel :title="title" class="my-panel-read">
        <div class="text-arabic text-arabic-title">
         بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <div>
          <div class="ma-0 my-1 my-ayah" v-for="(ayah, i) in ayahs" :key="ayah" left>
            <p class="text-arabic">{{ ayah }}</p>
            <p class="text-translate"><span class="number">{{ i }}.</span> {{ translation[i] }}</p>
            <v-divider></v-divider>
          </div>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'
export default {
  data: () => ({
    title: '',
    ayahs: [],
    translation: []
  }),
  async mounted () {
    const idSurah = this.$store.state.route.params.idSurah
    const { results } = await (await SurahsService.readSurah(idSurah)).data
    const { text, translations } = results[idSurah]
    this.title = `Read Surah ${results[idSurah].name_latin}`
    this.ayahs = text
    this.translation = translations.id.text
  },
  components: {
    Panel: () => import('@/components/Panel')
  }
}
</script>

<style scoped>
.text-arabic-title {
  text-align: center !important;
}
.text-arabic {
  font-size: 35px;
  font-weight: 700;
  font-family: 'Scheherazade', serif;
  text-shadow: 1px 1px 1px #aaa;
}
.text-translate {
  font-size: 16px;
  text-align: left;
}
.my-ayah {
  text-align: right;
}
.number {
  font-size: 20px;
  font-weight: bold;
}
</style>
