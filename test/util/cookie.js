const assert = require('assert')
const cookies = require('../../utils/cookies')

describe('cookies', function () {
    it('should parse cookie', function () {
        var C = cookies.parse('foo=bar; foo1=bar1')
        assert.equal(C.foo, 'bar')
        assert.equal(C.foo1, 'bar1')
    })
})



