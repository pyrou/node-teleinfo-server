/**
 * Return the checksum of a value and label
 */
var checksum = function (label, value) {
	var data = ('' + label + value);
	var sum = 32;
	for (var i=0,l=data.length; i<l; i++) {
		sum += data.charCodeAt(i);
	}
	return String.fromCharCode((sum & 63) + 32);
}
/**
 * Read and verify Teleinfo datagram and return it as an object
 */
var parse = function (message) {
	var line;
	var data = {};
	var lines = message.toString().replace(/^[\r\n\x03\x02]+|[\r\n\x03\x02]+$/g, '').split("\r\n");

	for(var i=0,l=lines.length; i<l; i++) {
		line = lines[i].split(' ');
		if(line.length !== 3) continue;

		if(checksum(line[0], line[1]) == line[2]) {
			data[line[0]] = line[1];
		}
	}
	return data;
}

module.exports.parse = parse;
