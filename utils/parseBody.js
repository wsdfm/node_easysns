const getRawBody = require("./getRawBody")
const qs = require("querystring")

module.exports = (req, callback) => {
    getRawBody(req, (err, rawBody) => {
        if (err) return callback(err);
        var type = req.headers["content-type"] || "";
        type = type.split(";")[0];
        if(type === "application/x-www-form-urlencoded") {
            var body = qs.parse(rawBody);
            callback(null, body);
            return
        }
        callback()
    })
}