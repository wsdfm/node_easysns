module.exports = function runTests (fns, done){
    var index = 0;
    //依次调用异步函数的数组
    function next(err) {
        if (err) {
            return done(err)
        }
        if (index >= fns.length) {
            return done()
        }
        console.log("index", index, fns[index].name);
        fns[index++](next)
    }
    next()
}
