define([
	'vue',
	'vue-resource',
	'text!templates/payroll/temp_payroll_table.html',
    'components/payroll/payrollemp/comp_modal_payrollemp',
	'moment',
	'underscore',
	], 
	function(Vue, VueResource, template, CompModalPayrollEmp, moment, _) {
    
    Vue.use(VueResource);

    var Vue = Vue.extend({

    	template: template,

    	created(){
    		this.fetchAllPayroll();
    	},

        components: {
            'modal-payrollemp': CompModalPayrollEmp
        },

    	data: function () {
            return {
               payrolls: [],
               payrollemps: []
            }
        },

        props: ['search','current_payroll','current_total_net'],

        watch: {
            'current_payroll': function (val, oldVal) {
                var self = this;
                var child = self.$children[0];
                var emps = _.where(self.payrollemps, {pid: val}, false);
                var total = 0;
                emps.forEach(function(emp) {
                    total += child.getNetOfEmp(emp);
                });
                self.current_total_net = total;
            }
        },

    	methods: {

            getFullname(i){
                var self = this;
                var model = _.where(self.employees, {id: i});
            },

            showModalOpenPayroll(payroll){
                var self = this;
                self.current_payroll = payroll.id;
                $('#modal-payrollemp').modal('show');
                var emps = _.where(self.payrollemps, {pid: payroll.id}, false);
                var child = self.$children[0];
                child.emps = emps;
                child.payroll = payroll;
            },

    		setDate(payroll){
    			var date = moment(payroll.created_at).format('MMM DD, YYYY');
    			payroll.date = date;
    		},

    		formatDate(date){
    			return moment(date).format('MMM DD, YYYY');
    		},

            getNet(payroll){
                var self = this;
                var net = 0, rph = 0;
                var emps = _.where(self.payrollemps, {pid: payroll.id}, false);
                emps.forEach(function(model) {
                    rph = Number(model.rpd) / 8;
                    net += (rph * Number(model.hrs_work)) - Number(model.sss) - Number(model.phil) - Number(model.advances);
                });
                payroll.net = net;
                return net;
            },

    		payrollTotal(payroll, key){
    			var self = this, total = 0;
    			var list = _.where(self.payrollemps, {pid: payroll.id});
    			list.forEach(function(model) {
    				total+= model[key]; 
    			});
    			payroll[key] = total;
    			return total;
    		},

    		fetchAllPayroll(){
    			var self = this;
    			self.$http.get('/payroll_list_route').then( (response) => {
    				var json = JSON.parse(response.body);
    				self.employees = json.employees;
    				self.payrollemps = json.payrollemps;
                    self.designations = json.designations;
    				setTimeout(function(){
	    				self.payrolls = json.payrolls;
                        self.afterFetch();
    				}, 200);
    			}, (errorResp) => {
                    console.log('there are some errors, trying to fetch payroll, employee');
    				console.log(errorResp);
    			});
    		},

            afterFetch(){
                var self = this;
                if(!self.payrolls.length){
                    $(self.$el).find('table').find('tbody').html('<tr><td colspan="8">No payroll was found in this table.</td></tr>')
                }
            },

            
    	}
    });
   
    return Vue; 
});