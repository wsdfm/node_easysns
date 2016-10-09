module.exports = (stream, callback) => {
    var buffers = [];
    stream.on("data", data => {
        buffers.push(data)
    })

    stream.on("end", () => {
        callback(null, Buffer.concat(buffers).toString())
    })

    stream.on("error", err => {
        callback(err)
    })
}