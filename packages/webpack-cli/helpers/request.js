const axios = require('axios')

const BASE_URL = 'https://mock.presstime.cn/mock/6302e664870a85006347d036/micro/'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
    return null
  },
  (error) => {
    Promise.reject(error)
  }
)

module.exports = request
