define([
	'vue',
    'vue-resource',
	'text!templates/department/temp_cbo_for_employee_table.html'], 
	function(Vue, VueResource, template) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	
        data: function(){
    		return {
    			selected: 'All'
    		}
    	},

    	methods: {
            
    	},

        watch: {
            'selected': function(val, oldVal){
                var self = this;
                if (val === 'All') {
                    self.$parent.fetchDatas();
                }else {
                    var resource = self.$resource('emps_with_department{/id}');
                    resource.get({id: val}).then( (resp) => {
                        self.$parent.employees = JSON.parse(resp.body);
                    }, (errorResp) => {
                        console.log(errorResp);
                    });
                }
            }
        }
    });
   
    return Component; 
});