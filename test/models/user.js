const MemStore = require("../../store/memstore")
const UserModel = require("../../models/user")
const assert = require("assert")
const runner = require("../runner")

const store = new MemStore()
const model = new UserModel(store)

// runner([testEmail], err => {
//     if (!err) {
//         console.log("All done")
//     }
// })

//使用mocha测试模块
describe("UserModel", function (){
    it("could get by Email", testEmail)
})

function testEmail (done) {
    const testUser = {
        email: "tom@test.com", 
        nickname: "Tom",
        password: "1234"
    }
    model.create(testUser, err => {
        assert(!err)
        model.getByEmail("tom@test.com", (err, user) => {
            assert(!err);
            assert.equal(user.email, testUser.email)
            assert.equal(user.nickname, testUser.nickname)
            assert.equal(user.password, testUser.password)
            done()
        })
    })
}