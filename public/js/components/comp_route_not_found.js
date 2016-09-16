define(['vue',
	'vue-resource','text!templates/temp_route_not_found.html'], 
	function(Vue, VueResource, theTemplate) {
   	Vue.use(VueResource);
    var Component = Vue.extend({
    	temlate: '<p>Url not found</p>'
    });
   
    return Component; 
});