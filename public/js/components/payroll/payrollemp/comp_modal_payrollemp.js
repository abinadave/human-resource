define([
	'vue',
	'text!templates/payroll/payrollemp/temp_modal_payrollemp.html',
    'components/payroll/payrollemp/comp_modal_update_payrollemp'
	], function(Vue, template, CompModalUpdatePayrollemp) {
   
    var Vue = Vue.extend({
    	template: template,
    	
    	data: function(){
    		return {
    			emps: [],
    			payroll: {},
                numbering: 0,
                current_emp: {}
    		}
    	},

        components: {
            'update-payrollemp': CompModalUpdatePayrollemp
        },

        created(){
           
        },

        computed: {
            getTotalNet(){
                var self = this;
                var net = 0;
                var rph = 0;
                self.emps.forEach(function(model) {
                    rph = model.rpd / 8;
                    net += rph * model.hrs_work - model.sss - model.phil - model.advances;
                });
                return net;
            },

            getTotalAdvances(){
                var self = this;
                var arr = _.pluck(self.emps, 'advances');
                return _.reduce(arr, function(a, b){
                    return Number(a) + Number(b);
                });
            },

            getTotalPhil(){
                var self = this;
                var arr = _.pluck(self.emps, 'phil');
                return _.reduce(arr, function(a, b){
                    return Number(a) + Number(b);
                });
            },

            getTotalSss(){
                var self = this;
                var arr = _.pluck(self.emps, 'sss');
                return _.reduce(arr, function(a, b){
                    return Number(a) + Number(b);
                });
            }
        },

        methods: {

            updatePayrollemp(){
                var self = this;
                var child = self.$children[0];
                var payrollemp = _.where(self.emps, {id: self.current_emp.id});
                child.payrollemp = payrollemp[0];
                child.fullname = self.current_emp.fullname;
                $('#modal-update-payrollemp').modal('show');
            },

            setCurrentId(emp){
                var self = this;
                var model = _.where(self.$parent.employees, {id: emp.id});
                if (model.length) {
                    var employee = model[0];
                    self.current_emp = employee;
                }
            },

            getNumbering(){
                return this.numbering + 1;
            },

            printModal(){
                require(['printarea'], function(printArea){
                    $('#print-this').printArea();
                });
            },

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