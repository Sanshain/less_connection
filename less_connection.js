const fs = require("fs");
const sock = require('net');
const less = require('./_less')


var assign         = require('object-assign');

console.log('start listen for LESS by HAMLPY')

var options = {}


sock.createServer(function (socket) {
    console.log("connected");

    socket.on('data', async function(data) {
		 
console.time('Time');

		

		let src = data.toString();
		let is_path = !(src.slice(0,256).indexOf('\n') + 1)


		if (is_path){
		
			console.log('start render: ' + src);						
			var opts = assign({}, {
				 compress: false,
				 paths: [],
				 filename : data.toString()
			}, options);			
			var str = fs.readFileSync(opts.filename, "utf8");
			
			console.log(str.length + ' bytes')			
			res = await less.render(str, opts)	
			
		}
		else {		                         // is content
		
			console.log('Received content ' + src.length + ' b')	
			
			throw new Error('Not Implemented');
			
			res = await less.render(str, {})
			
		}
				
console.timeEnd('Time');

		socket.write(res);
			  
	});
	 
}).listen(9091, 'localhost');
//*/


/*

on else: (
	`requared filename for option. How can I compile without it?`
)

details:
`
(node:8168) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'replace' of undefined
    at Object.parse (D:\_virtualenv_main\node-less_connect\node_modules\less\dist\less.cjs.js:6732:23)
    at Object.parse (D:\_virtualenv_main\node-less_connect\node_modules\less\dist\less.cjs.js:10529:18)
    at Object.render (D:\_virtualenv_main\node-less_connect\node_modules\less\dist\less.cjs.js:10289:18)
    at Less._render (D:\_virtualenv_main\node-less_connect\node_modules\accord\lib\adapters\less\2.x - 3.x.js:39:19)
    at Less.Adapter.render (D:\_virtualenv_main\node-less_connect\node_modules\accord\lib\adapter_base.js:124:19)
    at Object.exports.render (D:\_virtualenv_main\node-less_connect\_less.js:13:20)
    at Socket.<anonymous> (D:\_virtualenv_main\node-less_connect\less_connection.js:46:21)
`
//*/




























/*
var s = require('net').Socket();
s.connect(8080, 'localhost');
s.write('Hello');
s.end();
//*/