import axios from 'axios';

const base  = `https://kanjihanziremake.onrender.com/api`

const getAll = () => {
  return axios.get(`${base}/all`)
}
const getLike = (str) => {
  console.log('got', str)
  return axios.get(`${base}/`, {
    params: {
      string: str
    }
  }
  )
}
const postPair = (str) => {
  console.log('routing: ', str)
  return axios.post(`${base}/`, {
    data: str
  })
}

export default {getAll, getLike, postPair};

