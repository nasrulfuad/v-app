<template>
  <v-layout column>
    <v-flex md12 sm12 offset-md0>
      <panel
        id="scroll-target"
        :title="title"
      >
        <div class="text-arabic text-arabic-title">
         بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <div>
          <div class="text-arabic, ma-0 pb-2 mt-3 my-ayah py-3" v-for="(ayah, i) in ayahs" :key="ayah" left :data-ayah="i">
            <p class="text-arabic">{{ ayah }}</p>
            <p class="text-translate"><span class="number">{{ i }}.</span> {{ translation[i] }}</p>
            <v-divider v-if="+i !== Object.keys(ayahs).length"></v-divider>
          </div>
        </div>
      </panel>
    </v-flex>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      direction="top"
      hover
      transition="slide-y-reverse-transition"
    >
      <v-btn
        slot="activator"
        class="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>menu</v-icon>
        <v-icon>menu_open</v-icon>
      </v-btn>
      <v-btn
        v-tooltip:left="{ html: 'Scroll To Bottom' }"
        fab
        dark
        small
        class="cyan"
        @click="scrollToBottom"
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn
        v-tooltip:left="{ html: 'Jump to ayah number' }"
        fab
        dark
        small
        class="indigo"
        @click="openDialog"
      >
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn
        v-tooltip:left="{ html: 'Scroll To Top' }"
        fab
        dark
        small
        class="cyan"
        @click="scrollToTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline">Jump to number ayah :</v-card-title>
        <v-card-text>
          <v-text-field
            name="input-number-ayah"
            label="Number"
            v-model="jumpToAyahInput"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click="jumpToAyah">Jump</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      offsetY: 0,
      fab: false,
      dialog: true,
      jumpToAyahInput: 0
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
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollToBottom () {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    },
    openDialog () {
      this.dialog = true
    },
    jumpToAyah () {
      this.dialog = false
      if (this.jumpToAyahInput > 2) {
        const elem = document.querySelector(`[data-ayah='${this.jumpToAyahInput - 2}']`)
        return elem.scrollIntoView({ behavior: 'smooth' })
      }
      this.scrollToTop()
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
