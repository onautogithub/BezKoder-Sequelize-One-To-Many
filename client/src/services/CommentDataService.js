import http from '../http-common'

class CommentDataService {
  getAll () {
    return http.get('tutorials/comments')
  }
  get (id) {
    return http.get(`/tutorials/comments/${id}`)
  }
  create (data) {
    return http.post('/tutorials/comments', data)
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
  findbyTitle (title) {
    return http.get(`/tutorials/comments?title=${title}`)
  }
}

export default new CommentDataService()
