import axios from '@/axios'

export default { 
  fetchById(id){
    return axios.get(`/company/${id}`)
  },    
  save(payload){
    return axios.post(`/company`, payload)
  },
  delete(id){
    return axios.delete(`/company/${id}`)
  }
}