import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

export const auth = {
  get_Login: (socialName:string, code:number) =>
    instance.get(`/user/login/${socialName}?code=${code}`),
}
