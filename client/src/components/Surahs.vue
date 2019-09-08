<template>
  <v-layout column>
    <v-flex md10 sm12 offset-md1 offset-sm0>
      <panel title="Surahs">
        <v-expansion-panel inset class="my-3">
          <v-expansion-panel-content v-for="surah in surahs" :key="surah.id">
            <div slot="header">{{ surah.id }} - {{ surah.englishName }}</div>
            <v-card class="grey lighten-3">
              <v-card-title primary-title>
                <h3 class="display-1 text-arabic mb-1 position-title">{{ surah.name }}</h3>
                <h3 class="body-1 mb-0 mt-1 position-title">{{ surah.englishNameTranslation }}</h3>
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quod quidem! Temporibus asperiores quam vel, cupiditate quae velit accusamus animi eum est enim itaque facilis nulla neque, dolore vitae iusto.
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
    surahs: null
  }),
  async mounted () {
    this.surahs = await (await SurahsService.index()).data.data
  },
  components: {
    Panel: () => import('@/components/Panel')
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
