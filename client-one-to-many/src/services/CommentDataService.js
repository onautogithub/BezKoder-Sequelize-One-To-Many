import http from '../http-common'

class CommentDataService {
  getAll () {
    return http.get(`comments`)
  }
  get (id) {
    return http.get(`/tutorials/comments/${id}`)
  }
  create (data) {
    return http.post('comments', data)
  }
  update (id, data) {
    return http.put(`/tutorials/comments/${id}`, data)
  }
  delete (id) {
    return http.delete(`/tutorials/comments/${id}`)
  }
  deleteAll () {
    return http.delete(`/tutorials/comments`)
  }
  findbyName (title) {
    return http.get(`/tutorials?name=${name}`)
  }
}

export default new CommentDataService()
