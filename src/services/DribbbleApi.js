'use strict'

import axios from 'axios'

const BASE_URL = 'https://api.dribbble.com/v1/'
const TOKEN = '866a1e581a4c03c8b923399a6257289419616b86754425fc227c621ac1f80e89'

class DribbbleApi {
  get (route, params) {
    params['access_token'] = TOKEN
    return axios.get(BASE_URL + route, {
      params: params
    }).then((result) => {
      return result
    })
  }
}

export const dribbbleApi = new DribbbleApi()
