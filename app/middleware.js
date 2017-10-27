import rq from 'superagent'
import Promise from 'bluebird'

export const request = (store) => (next) => (action) => {
  if (action.httpRequest && typeof (action.httpRequest) === 'object') {
    action.status = 'sent'
    var p = new Promise((resolve, reject) => {
      var isUpload = action.httpRequest.method === 'UPLOAD'
      var rqPrepare = rq(
        (isUpload ? 'POST' : action.httpRequest.method),
        action.httpRequest.url
      )
      if (isUpload) {
        (action.httpRequest.filesData || [])
          .map((file) => {
            rqPrepare.attach(file.name, file)
          })
      } else {
        rqPrepare
          .set('Content-Type', 'application/json')
          .send(action.httpRequest.body)
      }
      rqPrepare
        .end((err, resp) => {
          if (err) {
            return reject(err)
          }
          return resolve(resp)
        })
    })

    p
      .then((res) => {
        if (res.body.error) {
          action.err = res.body
        } else {
          action.data = res.body
        }
      })
      .catch((err) => {
        action.err = err
      })
      .finally(() => {
        action.status = 'received'
        next(action)
      })
  }
  next(action)
}
