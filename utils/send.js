const mime = require("mime");
const fs = require("fs");
const joinPath = require("path").join;


exports.sendFile = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            //如果没有找到文件
            if (err.code === "ENOENT"){
                res.writeHead(404);
                res.end("Not Found");
                return
            }
            res.writeHead(500);
            res.end(err.massage);
        }
        var mimetype = mime.lookup(path);
        var charset = mime.charsets.lookup(mimetype);
        res.setHeader("content-Type", mimetype + (charset ? "; charset=" + charset : ""))
        res.end(data);
    })
}

exports.redirect = (location, res, statusCode) => {
    var statusCode = statusCode || 302;
    res.writeHead(statusCode, {
        location: location
    })
    res.end();
}

exports.sendError = (er, res, statusCode) => {
    var statusCode = statusCode || 500;
    res.writeHead(statusCode);
    res.end(err.message);
}