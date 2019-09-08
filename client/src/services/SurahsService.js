import Api from '@/services/Api'

export default {
  index () {
    return Api().get('surah')
  },
  read (surahId) {
    return Api.get(`surah/ayahs/${surahId}`)
  }
}
