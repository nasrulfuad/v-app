import Api from '@/services/Api'

export default {
  index () {
    return Api().get('surah')
  },
  show (id) {
    return Api().get(`surah/${id}`)
  }
}
