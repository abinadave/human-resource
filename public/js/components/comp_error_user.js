define([
	'vue',
	'text!templates/temp_error_user.html'
	], function(Vue, template) {
   
    var Component = Vue.extend({
    	template: template
    });
   
    return Component; 
});