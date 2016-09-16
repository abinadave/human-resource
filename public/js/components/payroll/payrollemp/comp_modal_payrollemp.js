define([
	'vue',
	'text!templates/payroll/payrollemp/temp_modal_payrollemp.html'
	], function(Vue, template) {
   
    var Vue = Vue.extend({
    	template: template,
    	created(){
    		
    	},

    	data: function(){
    		return {
    			emps: [],
    			payroll: {}
    		}
    	},

        methods: {

            getNetOfEmp(emp){
                var self = this;
                var rph = emp.rpd / 8;
                var total = (rph * emp.hrs_work) - emp.sss - emp.phil - emp.advances;
                return total;
            },

            getFullname(i){
                var self = this;
                var found = self.findEmp(i);
                if (found.length) {
                    return found[0].fullname;
                }
            },

            getDesignation(emp_id){
                var self = this;
                var found = self.findEmp(emp_id);
                if (found.length) {
                    var employee = found[0];
                    var arr = _.where(self.$parent.designations, {id: employee.designation}, false);
                    if (arr.length) {
                        return arr[0].name;
                    }
                }
                return emp_id;
            },

            findEmp(i){
                var self = this;
                return self.$parent.employees.filter(function(model) {
                    return Number(model.id) === Number(i);
                });
            }
        }

    });
   
    return Vue; 
});