const assert = require("assert");
const MemStore = require("../../store/memstore")
const BaseModule = require("../../models/base")
const runner = require("../runner")

const store = new MemStore()
const model = new BaseModule(store, "base:")
const obj = {foo: "bar"}

// runner([testCreate, testGet, testDel], err => {
//     if (!err) {
//         console.log("All done")
//     }
// })

//使用mocha测试模块
describe("BaseModel", function (){
    it("should create without error", testCreate)
    it("should get by id", testGet)
    it("should get nothing after delete", testDel)
})

function testCreate (done){
    model.create(obj, function (err) {
        assert(!err)
        assert(obj.id)
        done()
    })
}

function testGet (done){
    model.get(obj.id, (err, result) => {
        assert(!err)
        assert.equal(result.foo, "bar")
        done()
    })
}

function testDel (done){
    model.del(obj.id, err => {
        assert(!err)
        model.get(obj.id, (err, result) => {
            assert(!err)
            assert(!result)
            done()
        })
    })
}