import axios from 'axios'
export default () =>
  axios.create({
    baseURL: `http://staging.quran.com:3000/api/v3`
  })
