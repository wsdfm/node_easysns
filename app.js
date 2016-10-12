const http = require('http')
const controllers = require('./controllers')
const parseUrl = require('url').parse
const authorize = require("./middlewares/authorize")

const rules = [
    {path: '/', controller: controllers.home},
    {path: '/user', controller: controllers.user.user},
    {path: '/my/avatar', controller: controllers.user.myavator},
    {path: '/auth/register', controller: controllers.auth.register, method: 'post'},
    {path: '/auth/login', controller: controllers.auth.login, method: 'post'},
    {path: /^\/static(\/.*)/, controller: controllers.static},
    {path: /^\/upload(\/.*)/, controller: controllers.static.upload}
]

function notFoundController (req, res) {
    res.writeHead(404);
    res.end('Not Found');
}

function find (ary, match) {
    for (let i = 0, length = ary.length; i < length; i++) {
        if (match(ary[i])) return ary[i]
    }
}

const server = http.createServer( (req, res) => {
    //解析URL
    var urlInfo = parseUrl(req.url);
    //返回匹配的规则对象
    var rule = find(rules, rule => {
        if(rule.method) {
            if (rule.method.toLowerCase() !== req.method.toLowerCase()){
                return false
            }
        }

        //如果规则的匹配条件是一个正则的话
        if (rule.path instanceof RegExp) {
            var matchResult = urlInfo.pathname.match(rule.path);
            if (matchResult) {
                req.params = matchResult;
            }
            return matchResult;
        }
        return rule.path === urlInfo.pathname;
    })
    var controller = rule && rule.controller || notFoundController;
    controller = authorize(controller)
    controller(req, res);
});

server.listen(3000);