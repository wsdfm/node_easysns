const sendFile = require("../utils/send").sendFile;
const joinPath = require("path").join;
const viewPath = joinPath(__dirname, "../views");

module.exports = (req, res) => {
    var isLogin = false;//登陆状态
    var view = isLogin ? "home.html" : "welcome.html";
    sendFile(joinPath(viewPath, view), res);
}