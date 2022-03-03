import { removeCookie } from './cookie'

export const GoToLoginPage = () => {
  removeCookie('a-token')
  removeCookie('b-token')
  window.location.href = '/login'
}
