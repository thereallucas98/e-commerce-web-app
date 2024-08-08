import axios from 'axios'

export const pokeApi = axios.create({
  baseURL: `https://gist.githubusercontent.com/thiagossampaio`,
  headers: { 'Content-Type': 'application/json' },
})
