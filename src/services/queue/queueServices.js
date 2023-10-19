import axios from '@/axios'

export default {
  fetchAll(params){
    return axios.get(`/queues/all`, {params})
  },
  fetchLimit(params){
    return axios.get(`/queues`, {params})
  },  
  fetchById(id){
    return axios.get(`/queues/${id}`)
  },
  create(payload){
    return axios.post(`/queues`, payload)
  },
  update(id, payload){
    return axios.post(`/queues/${id}`, payload)
  },
  delete(id){
    return axios.delete(`/queues/${id}`)
  }, 
  deleteMultiple(payload){
    return axios.delete(`/queues`, payload)
  },
  nextQueue(){
    return axios.post(`/queues/next-queue`)
  }  
}