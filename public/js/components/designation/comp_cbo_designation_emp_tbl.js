define([
	'vue',
	'vue-resource',
	'text!templates/designation/temp_cbo_designation_emp_tbl.html'], 
	function(Vue, VueResource, template) {
    
    Vue.use(VueResource);

    var Vue = Vue.extend({
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
                    var resource = self.$resource('get_emps_with_desig{/id}');
                    resource.get({id: val}).then((resp)=> {
                        self.$parent.employees = JSON.parse(resp.body);
                    }, (errorResp) => {
                        console.log(errorResp);
                    });
                }
    			
    		}
    	}
    });
   
    return Vue; 
});