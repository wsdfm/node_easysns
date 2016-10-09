const send = require("../utils/send");
const parseBody = require("../utils/parseBody");
const qs = require("querystring");

exports.login = (req, res) => {
    parseBody(req, (err, body) => {
        if (err) {
            send.sendError(err,res)
            return
        }
        //login(body.email, body.password)
        send.redirect("/", res);
    })
}

exports.register = (req, res) => {
    parseBody(req, (err, body) => {
        if (err) {
            send.sendError(err,res)
            return
        }
        var user = {
            email: body.email,
            password: body.password,
            nickname: body.nickname
        }
        // save(user);
        send.redirect("/", res);
    })
}