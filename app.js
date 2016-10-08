const http = require("http");
const parseUrl = require("url").parse;

function homeController (req, res){
    res.end("home");
}
function userController (req, res){
    res.end("user");
}
function notFoundController (req, res){
    res.writeHead(404);
    res.end("Not Found");
}

const rules = [
    {path: "/", controller: homeController},
    {path: "/user", controller: userController}
];

function find (ary, match){
    for (let i = 0, length = ary.length; i < length; i++){
        if (match(ary[i])) return ary[i]
    }
}

const server = http.createServer( (req, res) => {
    var urlInfo = parseUrl(req.url);
    var rule = find(rules, rule => {
        return rule.path == urlInfo.pathname;
    })
    var controller = rule && rule.controller || notFoundController;
    controller(req, res);
});

server.listen(3000);