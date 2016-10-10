const assert = require("assert");
const runner = require("../runner");
const MemStore = require("../../store/memstore");

var memStore = new MemStore();

// runner([testSet, testGet, testIncr, testDel], err => {
//     if (err) {
//         console.log(`err ${err.stack}`)
//     } else {
//         console.log("All done")
//     }
// })

//使用mocha测试模块
describe("MemStore", function () {
    it("could set", testSet)
    it("could get", testGet)
    it("could incr", testIncr)
    it("could del", testDel)
})

function testSet (done){
    memStore.set("foo", "bar", (err, result) => {
        assert(!err, "shoule save without error");
        done()
    })
}

function testGet(done){
    memStore.get("foo", (err, result) => {
        assert(!err, "should get without error");
        assert.equal(result, "bar");
        done();
    })
}

function testIncr (done){
    memStore.incr("id", (err, result) => {
        assert(!err, "shoule incr without error");
        assert.equal(result, 1)
        memStore.incr("id", (err, result) => {
            assert(!err, "shoule incr without error");
            assert.equal(result, 2)
            done();
        })
    })
}

function testDel (done){
    memStore.del("foo", (err, result) => {
        assert(!err, "should del without error");
        memStore.get("foo", (err, result) => {
            assert(!err, "should del without error");
            assert.equal(result, null);
            done()
        })
    })
}