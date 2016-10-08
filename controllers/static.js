const joinPath = require("path").join;
const publicPath = joinPath(__dirname, "../public");
const sendFile = require("../utils/send").sendFile;

module.exports = (req, res) => {
    var path = req.params[1];
    path = joinPath(publicPath, path)
    sendFile(path, res);
}