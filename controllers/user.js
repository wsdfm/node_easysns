const send = require('../utils/send')
const models = require('../models')
const multiparty = require("multiparty")
const joinPath = require("path").join

const uploadDir = joinPath(__dirname, '../data/upload')

exports.user = (req, res) => {
    models.user.get(req.userId, function (err, user) {
        if (err) {
            return send.sendError(err, res)
        }
        res.end(JSON.stringify(user))
    })
}

exports.myavator = function (req, res) {
    if (!req.userId) {
        return send.sendError(new Error('not_login'), res)
    }
    var form = new multiparty.Form({
        uploadDir: uploadDir
    })
    form.parse(req, (err, fields, files) => {
        if (err) {
            return send.sendError(err, res)
        }

        // {
        //     file:[ 
        //         { 
        //             fieldName: 'file',
        //             originalFilename: 'avatar.jpg',
        //             path: '/root/node_easysns/data/upload/1nuPan0MIPb8C_2lm5Lnrgyz.jpg',
        //             headers: [Object],
        //             size: 9929
        //         } 
        //     ] 
        // }
        var newPath = files.file[0].path.replace(uploadDir, '')
        var url = 'http://localhost:3000/upload' + newPath
        models.user.updataPart(req.userId, {avatar: url}, (err, info) => {
            if (err) {
                send.sendError(err, res)
            }
            res.end(JSON.stringify({avatar: url}))
        })
    })
}