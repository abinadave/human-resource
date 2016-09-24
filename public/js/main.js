// This set's up the module paths for underscore and backbone
require.config({
	waitSeconds : 20, 
    'paths': { 
		"vue": "libs/vue/vue",
		"vue-resource": "libs/vue/vue-resource",
		"vue-router": "libs/vue/vue-router",
		"domReady": "libs/requirejs/domReady",
		"moment": "libs/momentjs/moment.min",
		"css": "libs/require-css/css",
		'underscore': "libs/backbone/underscore-min",
		'fileuploader': 'libs/fileuploader/fileuploader',
		"jqueryui": "libs/jquery-ui/jquery-ui.min",
		"printarea": "libs/print-area/demo/jquery.PrintArea"
	},
	
	'shim': 
	{	
		"fileuploader": {
			'deps': ['css!libs/fileuploader/fileuploader.css']
		},

		"vue": {
			'exports': 'Vue'
		},
		
		"vue-resource": {
			'exports': 'VueResource'
		},

		"vue-router": {
			'exports': 'VueRouter'
		},

		"domeReady": {
			'exports': 'domeReady'
		},

		"underscore": {
			'exports':  '_'
		},

		"jqueryui": {
        	"deps": [
        		'css!libs/jquery-ui/jquery-ui.min.css'
        	]
        }

	},

	'map': {
        "*": {
            "css":  "libs/require-css/css"
        }
    }	

}); 

require(
	[
		'domReady',
		'app',
		'vue','routes/router',
		'components/comp_nav'
	],
	function(domReady, app, Vue, router, CompNav){
	domReady(function(){
		Vue.component('nav-component', CompNav);
		router.start({}, '#app');
		
	});
});

