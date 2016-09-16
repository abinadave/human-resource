define(['vue','text!templates/temp_nav.html'], function(Vue, template) {
   
	var Component = Vue.extend({
		template: template
	});
   
    return Component; 
});