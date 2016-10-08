const http = require("http");
const controllers = require("./controllers");//加载目录的时候会优先加载目录中的index文件
const parseUrl = require("url").parse;


const rules = [
    {path: "/", controller: controllers.home},
    {path: "/user", controller: controllers.user},
    {path: /^\/static(\/.*)/, controller: controllers.static}
];

function notFoundController (req, res){
    res.writeHead(404);
    res.end("Not Found");
}

function find (ary, match){
    for (let i = 0, length = ary.length; i < length; i++){
        if (match(ary[i])) return ary[i]
    }
}

const server = http.createServer( (req, res) => {
    //解析URL
    var urlInfo = parseUrl(req.url);
    //返回匹配的规则对象
    var rule = find(rules, rule => {
        //如果规则的匹配条件是一个正则的话
        if (rule.path instanceof RegExp) {
            var matchResult = urlInfo.pathname.match(rule.path);
            if (matchResult) {
                req.params = matchResult;
            }
            return matchResult;
        }
        return rule.path == urlInfo.pathname;
    })
    var controller = rule && rule.controller || notFoundController;
    controller(req, res);
});

server.listen(3000);