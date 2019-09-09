<template>
  <v-layout column v-scroll="onScroll">
    <v-flex md12 sm12 offset-md0>
      <panel
        id="scroll-target"
        :title="title"
      >
        <div class="text-arabic text-arabic-title">
         بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <div>
          <div class="ma-0 pb-2 mt-3 my-ayah py-3" v-for="(ayah, i) in ayahs" :key="ayah" left>
            <p class="text-arabic">{{ ayah }}</p>
            <p class="text-translate"><span class="number">{{ i }}.</span> {{ translation[i] }}</p>
            <v-divider v-if="+i !== Object.keys(ayahs).length"></v-divider>
          </div>
        </div>
      </panel>
    </v-flex>
    <v-fab-transition>
      <v-btn
        fixed
        dark
        fab
        bottom
        right
        class="primary mb-0"
        v-show="!hidden"
        @click="scrollToTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'
export default {
  data () {
    return {
      title: '',
      ayahs: [],
      translation: [],
      hidden: true,
      offsetY: 0
    }
  },
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
  },
  methods: {
    scrollToTop () {
      // document.documentElement.scrollTop = 0
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    onScroll () {
      this.offsetY = window.pageYOffset || document.documentElement.scrollTop
      this.hidden = this.offsetY > 400 ? !true : true
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: lpmq;
  src: url("../assets/lpmq.otf") format("opentype");
}
.text-arabic-title {
  text-align: center !important;
  margin-bottom: 50px;
  margin-top: 20px;
}
.text-arabic {
  font-size: 25px;
  font-family: lpmq, serif;
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
  font-size: 18px;
  font-weight: 400;
}
</style>
