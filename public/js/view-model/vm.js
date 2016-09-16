define(['vue','vue-resource'], function(Vue, VueResource) {
    Vue.use(VueResource);
    var ViewModel = new Vue({
		data: {
			employees: {}
		}
	});
   
    return ViewModel; 
});