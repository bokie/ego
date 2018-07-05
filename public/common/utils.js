
/* 工具函数 */
let utils = (function () {
	
	return {

		log: function () {
			console.log.apply(console, arguments);
		},

		/**
		 * @param opts {object}
		 * opts: {
		 *     - method: (default: 'GET')
		 *     - url: (default: 'GET')
		 *     - data: (default: null) {string}
		 *     - success:
		 *     - error:
		 *     - dataType:
		 *     - headers: 
		 *     - async: (default: true)
		 *     url, method, success, error, header
		 * }
		 */
		ajax: function (opts) {
			const default = {
				// default type of request
				type: 'GET',
				dataStringify: true,
			};
			const options = Object.assign({},opts, default);
			console.log(opts);
			if (options.data && options.dataStringify) options.data = JSON.stringify(options.data); 
			const xhr = new XMLHttpRequest();
			xhr.onreadystate = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
						console.log(xhr);
						const data = JSON.parse(xhr.responseText);
						// options.success(data);
					}
				}
			};
			xhr.open(options.method, options.url);
			// setRequestHeader
			if (options.data && options.method.toUpperCase !== 'GET') {
				xhr.setRequestHeader('Content-type', 'application/json');
			}

			xhr.send(options.data ? options.data : null);
		},

		html2Node: function (str) {
			var container = document.createElement('div');
			container.innerHTML = str;
			return container.children[0];
		},

	    // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
	    extend: function(o1, o2){
	    	for(var i in o2) if (o1[i] == undefined ) {
	    		o1[i] = o2[i]
	    	}
	    },

	    hasClass: function (node, clsname) {
	    	let classes = node.className.toLowerCase().split(' ');
	    	return (classes.indexOf(clsname.toLowerCase()) >= 0);
	    },

	    addClass: function (node, clsname) {
	    	if (this.hasClass(node, clsname)) return;
	    	let classArr = node.className.toLowerCase().split(' ');
	    	classArr.push(clsname);
	    	let classes = classArr.join(' ');
	    	node.className = classes;
	    },

	    removeClass: function (node, clsname) {
	    	if (!this.hasClass(node, clsname)) return;
	    	let classArr = node.className.toLowerCase().split(' ');
	    	let i = classArr.indexOf(clsname.toLowerCase());
	    	classArr.splice(i, 1);
	    	let classes = classArr.join(' ');
	    	node.className = classes;
	    },

	}
	
})();



window.utils = utils;
window._ === undefined && (window._ = utils);
