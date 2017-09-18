'use strict'

import axios from 'axios'

class DribbbleApi {
  constructor () {
    // default config from axios
    axios.defaults.baseURL = 'https://api.dribbble.com/v1/'
    axios.defaults.headers.common['Authorization'] = 'Bearer de7970dafed989201a01d7d35972df43fbecb1f9cb27450b76fdb24f19961253'
  }

  get (route, params) {
    return axios.get(route, {
      params: params
    }).then((result) => {
      return result
    })
  }

  post (route) {
    return axios.post(route, {

    }).then((result) => {
      return result
    })
  }

  delete (route) {
    return axios.delete(route).then((result) => {
      return result
    })
  }
}

export const dribbbleApi = new DribbbleApi()
