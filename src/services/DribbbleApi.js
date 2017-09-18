'use strict'

import axios from 'axios'

const BASE_URL = 'https://api.dribbble.com/v1/'
const AUTH_TOKEN = '6362b8938ec2518f41f54002820e9fa5731de4a98685b2e29c94953fcd6d0c84'

class DribbbleApi {
  constructor () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN
  }

  get (route, params) {
    // params['access_token'] = TOKEN
    return axios.get(BASE_URL + route, {
      params: params
    }).then((result) => {
      return result
    })
  }

  post (route) {
    return axios.post(BASE_URL + route, {

    }).then((result) => {
      return result
    })
  }

  delete (route) {
    return axios.delete(BASE_URL + route).then((result) => {
      return result
    })
  }

  authentication () {
    return axios.post('https://dribbble.com/oauth/token', {
      client_id: 'ef75213e5d7a13af44d8d051caa3ffad77d4c8bd0a9cbec80fdda4621b98799a',
      client_secret: '21ccc932d596c326b291ac1aab64804107434bf1f44c73971fd4833d0bbfc5fe',
      code: '30564',
      redirect_uri: 'http://localhost:3000'
    }).then((result) => {
      return result
    })
  }
}

export const dribbbleApi = new DribbbleApi()
