let io;
module.exports = {
    init: function(server) {
        io = require('socket.io').listen(server);
        return io;
    },
    getio: function() {
        return io;
    }
}