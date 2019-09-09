<template>
  <v-layout column class="pa-0">
    <v-flex md10 sm12 offset-md1 offset-sm0>
      <panel title="Surahs">
       <v-data-table
          v-bind:headers="headers"
          :items="items"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1 my-2"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.index }}</td>
            <td class="text-xs-center">{{ props.item.latin }}</td>
            <td class="text-xs-center text-arabic">{{ props.item.arabic }}</td>
            <td class="text-xs-center">{{ props.item.translation }}</td>
            <td class="text-xs-center">{{ props.item.ayah_count }}</td>
            <td class="text-xs-center">
              <v-btn small outline class="primary--text" @click="navigateTo({ name: 'read', params: { idSurah: props.item.index } })">Read</v-btn>
              <v-btn small outline class="deep-orange--text" @click="navigateTo({ name: 'show', params: { idSurah: props.item.index } })">Detail</v-btn>
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
        text: 'Name (Latin)',
        align: 'center',
        value: 'nameLatin',
        sortable: false
      },
      {
        text: 'Name (Arabic)',
        align: 'center',
        value: 'nameArabic',
        sortable: false
      },
      {
        text: 'Translation in Indonesian',
        align: 'center',
        value: 'translationInIndonesian',
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
    this.$store.dispatch('setSurah', data.data)
    this.items = data.data
  },
  components: {
    Panel: () => import('@/components/Panel')
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
