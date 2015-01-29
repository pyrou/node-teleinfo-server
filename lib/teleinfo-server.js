var teleinfoParser = require("./teleinfo-parser");
var events = require('events');
var dgram = require("dgram");

UDPTeleinfoServer = function(port, host, wait) {
	var self = new events.EventEmitter();

	self.port = (port || 10000);
	self.host = (host || "0.0.0.0")
	self.wait_delay = (wait || 0);

	var _server = dgram.createSocket("udp4");
	var _last = 0;

	_server.on("error", function (err) {
		console.error(err);
		// self.emit('error', err);
	});

	_server.on("message", function (msg, rinfo) {
		var timestamp = parseInt((new Date()).getTime() / 1000);

		if(self.wait_delay > 0 && timestamp - _last < self.wait_delay) {
			// console.log('Skipping datagram');
			return;
		}

		var data = teleinfoParser.parse(msg);
		data['timestamp'] = _last = timestamp;
		self.emit('data', data);
	});

	_server.on("listening", function () {
		self.emit('listening', _server);
	});

	_server.bind(self.port, self.host);

	return self;
}

module.exports = UDPTeleinfoServer;
