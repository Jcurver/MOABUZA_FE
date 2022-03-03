import Instance from '../axios/axios'

export const mainApis = {
  get_MainInfo: () => Instance.get('/mainpage'),
  get_DetailInfo: () => Instance.get('/detail'),
}
