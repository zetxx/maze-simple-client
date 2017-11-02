const Joi = require('joi')
const path = require('path')
const fs = require('fs')
const files = require('./model.js')
const config = require('../../config/server')
const Boom = require('boom')
const jimp = require('jimp')
const baseDir = path.dirname(require.main.filename)
const filesDirectory = {
  storeDir: path.join.apply(null, [baseDir].concat(config.upload.storeDir))
}

function fileCreator(req) {
  return (r) => {
    if (!r) {
      throw Boom.notFound('missing resource')
    }
    var originFileName = path.join(filesDirectory.storeDir, r.itemId.toString(), r.id.toString())
    var fileName = path.join(
      filesDirectory.storeDir,
      r.itemId.toString(),
      [r.id.toString(), '_', req.params.width.toString(), 'x', req.params.height.toString()].join('')
    )
    console.log('will create: ', fileName)
    return new Promise((resolve, reject) => {
      fs.stat(fileName, (err, stats) => {
        if (err) {
          if (err.errno !== -2) {
            return reject(err)
          }
          console.log('will create because: ', err)
          jimp
            .read(originFileName)
            .then((img) => {
              console.log('image resource created')
              img.resize(req.params.width, req.params.height)
                .quality(90)
                .getBuffer(img.getMIME(), (err, buffer) => {
                  if (err) {
                    return reject(err)
                  }
                  console.log('buffer received with size: ', buffer.length)
                  fs.open(fileName, 'w', (err, fd) => {
                    if (err) {
                      return reject(err)
                    }
                    console.log('write to file')
                    fs.write(fd, buffer, 0, buffer.length, 0, function(err) {
                      if (err) {
                        return reject(err)
                      }
                      console.log('file writen!')
                      console.log({contentType: r.contentType, fileName})
                      resolve({contentType: r.contentType, fileName})
                    })
                  })
                })
            })
            .catch(reject)
        } else {
          console.log('return directly!')
          resolve({contentType: r.contentType, fileName})
        }
      })
    })
  }
}

module.exports = function(registrar) {
  registrar({
    method: 'GET',
    path: '/api/files/image/{fileId}/{width}x{height}',
    config: {
      handler: function (req, resp) {
        files.find({where: {id: req.params.fileId}})
          .then(fileCreator(req))
          .then((f) => {
            resp(fs.createReadStream(f.fileName))
              .type(f.contentType)
          })
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Get image',
      notes: 'Get image',
      tags: ['api', 'image', 'get'],
      validate: {
        params: {
          fileId: Joi.number().min(1).required().description('File Id'),
          width: Joi.number().min(1).required().description('width'),
          height: Joi.number().min(1).required().description('height')
        }
      }
    }
  })

  registrar({
    method: 'GET',
    path: '/api/files/{fileId}',
    config: {
      handler: function (req, resp) {
        files.find({where: {id: req.params.fileId}})
          .then((r) => {
            if (!r) {
              throw Boom.notFound('missing resource')
            }
            var fileName = path.join(filesDirectory.storeDir, r.itemId.toString(), r.id.toString())
            if (r.contentType.indexOf('image') >= 0) {
              return resp(fs.createReadStream(fileName))
                .type(r.contentType)
            }
            return resp(fs.createReadStream(fileName))
              .type(r.contentType)
              .header('Content-Disposition', `attachment; filename=${r.name}`)
          })
          .catch((e) => {
            console.error(e)
            resp(e)
          })
      },
      description: 'Get file',
      notes: 'Get file',
      tags: ['api', 'file', 'get'],
      validate: {
        params: {
          fileId: Joi.number().min(1).required().description('File Id')
        }
      }
    }
  })
}
