define([
	'vue',
	'vue-router'
	], function(Vue, VueRouter) {
		
	Vue.use(VueRouter);
	var App = Vue.extend({});
    var router = new VueRouter();
    
	router.map({
		'/': {
			component: function(resolve){
				require(['components/comp_employee_table'], resolve);
			}
		},
		'/Manage': {
			component: function(resolve){
				require(['components/comp_create_employee'], resolve);
			}
		},
		'/Employees': {
			component: function(resolve){
				require(['components/comp_employee_table'], resolve);
			}
		},
		'/Users': {
			component(resolve){
				require(['components/comp_user_tab'], resolve);
			}
		},

		'/Payrolls': {
			component(resolve){
				require(['components/payroll/comp_payroll_table'], resolve);
			}
		},

		'*': {
			component: Vue.extend({
				template:'<div class="jumbotron text-center"><h2>Url you specified was not found!</h2></div>'
			})
		},
	});
	
    return router; 
});