<template>
  <v-layout column>
    <v-flex md10 sm12 offset-md1>
      <panel :title="latin" class="my-panel-read">
        <p class="text-arabic ma-0">{{ arabic }}</p>
        <p class="caption mb-4">{{ translation }}</p>
        <v-toolbar flat dense light>
          <v-toolbar-title class="dark--text">Opening</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-0 pb-2 mb-5">
          <p class="opening" v-html="opening"></p>
        </div>
        <v-toolbar flat dense light>
          <v-toolbar-title class="dark--text">Closing</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-0 pb-2">
          <p class="opening" v-html="closing"></p>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'
export default {
  data: () => ({
    arabic: '',
    latin: '',
    translation: '',
    totalAyah: '',
    opening: '',
    closing: ''
  }),
  async mounted () {
    const idSurah = this.$store.state.route.params.idSurah
    const { data } = await (await SurahsService.show(idSurah)).data
    const [{arabic, latin, translation, opening, closing}] = data
    this.arabic = arabic
    this.latin = latin
    this.translation = translation
    this.totalAyah = data[0].ayah_count
    this.opening = opening
    this.closing = closing
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
.opening {
  text-align: left;
}
</style>
