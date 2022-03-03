import axios, { AxiosInstance } from 'axios'

import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from '../constants/statusCode'
import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SIGNATURE_EXCEPTION,
  ACCESS_TOKEN_MALFORMED,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SIGNATURE_EXCEPTION,
  REFRESH_TOKEN_MALFORMED,
} from '../constants/statusMessage'

// import { GoToLoginPage } from '../utils/GoToLoginPage'
import { getCookie, setCookie } from '../utils/cookie'
import { GoToLoginPage } from '../utils/GoToLoginPage'


const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
})

instance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전 수행할 로직
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'A-AUTH-TOKEN': getCookie('habit-A-Token'),
      },
    }
  },
  (error) => {
    // 요청 에러 발생시 수행할 로직
    console.error(error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  // 터미널에서 export NODE_ENV = development를 치면 개발모드로,
  // export NODE_ENV=development 를 치면 프로덕션모드로 전환됩니다.
  async (error) => {
    const { data: responseData, config: originalRequest } = error.response

    if (
      responseData.responseMessage === null &&
      responseData.statusCode === null
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error.response)
      }
      GoToLoginPage()
      return Promise.reject(error)
    }

    if (responseData.status === INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      GoToLoginPage()
      return Promise.reject(error)
    }

    if (responseData.statusCode === UNAUTHORIZED) {
      if (responseData.responseMessage === ACCESS_TOKEN_SIGNATURE_EXCEPTION) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
        GoToLoginPage()
        return Promise.reject(error)
      }

      if (responseData.responseMessage === ACCESS_TOKEN_MALFORMED) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
        GoToLoginPage()
        return Promise.reject(error)
      }
    }

    if (
      responseData.statusCode === BAD_REQUEST &&
      responseData.responseMessage === ACCESS_TOKEN_EXPIRED
    ) {
      if (process.env.NODE_ENV === 'development') {
        console.error(responseData)
      }

      try {
        const { data } = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_BASE_URL}/user/loginCheck`,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'R-AUTH-TOKEN': getCookie('habit-R-Token'),
          },
        })

        if (data.statusCode === OK) {
          setCookie('habit-A-Token', data.accessToken)
          originalRequest.headers['A-AUTH-TOKEN'] = `${data.accessToken}`
          return axios(originalRequest)
        }
      } catch (error) {
        if (
          error?.response?.data?.statusCode === BAD_REQUEST &&
          error?.response?.data?.responseMessage === REFRESH_TOKEN_EXPIRED
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.error(error)
          }
          GoToLoginPage()
          return Promise.reject(error)
        }
        if (error?.response?.data?.statusCode === UNAUTHORIZED) {
          if (
            error?.response?.data?.responseMessage ===
            REFRESH_TOKEN_SIGNATURE_EXCEPTION
          ) {
            GoToLoginPage()
            return Promise.reject(error)
          }
          if (
            error?.response?.data?.responseMessage === REFRESH_TOKEN_MALFORMED
          ) {
            if (process.env.NODE_ENV === 'development') {
              console.error(error)
            }
            GoToLoginPage()
            return Promise.reject(error)
          }
        }
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
          GoToLoginPage()
        }
        return Promise.reject(error)
      }
    }

    if (error.response.data.statusCode === NOT_FOUND) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      return Promise.reject(error)
    }

    if (error.response.data.statusCode === INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      GoToLoginPage()
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default instance
