<template>
  <v-layout column>
    <v-flex md10 sm12 offset-md1 offset-sm0>
      <panel title="Surahs">
        <v-expansion-panel inset class="my-3">
          <v-expansion-panel-content v-for="surah in surahs" :key="surah.id">
            <div slot="header">{{ surah.chapter_number }} - {{ surah.name_simple }}</div>
            <v-card class="grey lighten-3">
              <div class="right mr-3 mt-3">
                  <v-icon>beenhere</v-icon> {{ surah.revelation_place === 'makkah' ? 'Makkah' : 'Madinah' }}
                </div>
              <v-card-title primary-title>
                <h3 class="display-1 text-arabic mb-1 position-title">{{ surah.name_arabic }}</h3>
                <h3 class="body-1 mb-0 mt-1 position-title">{{ surah.englishNameTranslation }}</h3>
              </v-card-title>
              <v-card-text>
                <div>
                  <p class="grey--text">Total ayahs {{ surah.verses_count }}</p>
                  <p>{{ surah.InfoSurah.short_text }}</p>
                  <v-divider></v-divider>
                  <p class="caption grey--text">{{ surah.InfoSurah.source }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'

export default {
  data: () => ({
    surahs: null,
    surahDetails: null
  }),
  async mounted () {
    const { data } = await (await SurahsService.index())
    this.surahs = data.data
    console.log(data.data)
  },
  components: {
    Panel: () => import('@/components/Panel')
  },
  methods: {
    showDetails: id => {
      console.log('id')
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Scheherazade:400,700&subset=arabic');
  .position-title {
    width: 100%;
    text-align: center;
    line-height: 0;
  }
  .text-arabic {
    font-size: 16px;
    font-weight: 700;
    font-family: 'Scheherazade', serif;
    text-shadow: 2px 2px 2px #aaa;
  }
</style>
