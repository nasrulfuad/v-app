<template>
  <v-layout column>
    <v-flex md10 sm12 offset-md1 offset-sm0>
      <panel title="Surahs">
       <v-data-table
          v-bind:headers="headers"
          :items="items"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1 my-3"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.no }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center text-arabic">{{ props.item.nameArabic }}</td>
            <td class="text-xs-center">{{ props.item.translationInEnglish }}</td>
            <td class="text-xs-center">{{ props.item.revelationPlace }}</td>
            <td class="text-xs-center">{{ props.item.totalAyahs }}</td>
            <td class="text-xs-center">
              <v-btn outline class="primary--text">Read</v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SurahsService from '@/services/SurahsService'

export default {
  data: () => ({
    pagination: { rowsPerPage: 10 },
    headers: [
      {
        text: 'No',
        align: 'center',
        value: 'no'
      },
      {
        text: 'Name (Simple)',
        align: 'center',
        value: 'nameSimple',
        sortable: false
      },
      {
        text: 'Name (Arabic)',
        align: 'center',
        value: 'nameArabic',
        sortable: false
      },
      {
        text: 'Translation in English',
        align: 'center',
        value: 'translationInEnglish',
        sortable: false
      },
      {
        text: 'Revelation Place',
        align: 'center',
        value: 'revelationPlace',
        sortable: false
      },
      {
        text: 'Total Ayahs',
        align: 'center',
        value: 'totalAyahs'
      },
      {
        text: 'Action',
        align: 'center',
        sortable: false,
        value: 'action'
      }
    ],
    items: []
  }),
  async mounted () {
    const { data } = await (await SurahsService.index())
    const surahs = data.data.map(surah => (
      {
        no: surah.chapter_number,
        name: surah.name_simple,
        nameArabic: surah.name_arabic,
        translationInEnglish: surah.englishNameTranslation,
        revelationPlace: surah.revelation_place === 'makkah' ? 'Mekkah' : 'Madinah',
        totalAyahs: surah.verses_count
      }
    ))
    this.items = surahs
  },
  components: {
    Panel: () => import('@/components/Panel')
  },
  methods: {
    showDetails: id => {
      console.log('id')
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
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
    font-size: 20px;
    font-weight: 700;
    font-family: 'Scheherazade', serif;
    text-shadow: 2px 2px 2px #aaa;
  }
</style>
