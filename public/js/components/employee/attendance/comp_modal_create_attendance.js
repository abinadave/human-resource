define(
    [
        'vue',
        'vue-resource',
    	'text!templates/employee/attendance/temp_modal_create_attendance.html',
        'moment'
    ], 
	function(Vue, VueResource, template, moment) {

    var Component = Vue.extend({
    	
        template: template,

        data: function () {
            return {
                totalNet: 0,
                totalSss: 0,
                totalPhil: 0,
                totalAdvances: 0,
                date_from: '',
                date_to: ''
            }
        },

        created(){
            Vue.use(VueResource);
        },

        computed: {
            date_range(){
                var self = this;
                var from = moment(self.date_from).format('MMMM DD, YYYY');
                var to = moment(self.date_to).format('MMMM DD, YYYY');
                var a = moment(self.date_from).isValid();
                var b = moment(self.date_to).isValid();
                var y1 = moment(self.date_from).format('YYYY');
                var y2 = moment(self.date_to).format('YYYY');
                if (a === true && b === true) {
                    if (y1 === y2) {
                        return moment(self.date_from).format('MMMM DD') + ' - ' + moment(self.date_to).format('MMMM DD, YYYY'); 
                    }else {
                       return from + ' - ' + to;                        
                    }
                }
            }
        },

        methods: {

            getSalary(model){
                var hrs_work = (model.hrs_work === undefined) ? 0 : Number(model.hrs_work), 
                sss = (model.sss === undefined) ? 0 : Number(model.sss), 
                phil = (model.phil === undefined) ? 0 : Number(model.phil),
                advances = (model.advances === undefined) ? 0 : Number(model.advances), 
                rph = this.getRatePerHour(model);
                var salary = (rph * hrs_work) - sss - phil - advances;
                model.salary = salary;
                this.calculateAll();
                return salary;                
            },

            calculateAll(){
                var self = this;
                var net = 0, sss = 0, phil = 0, advances = 0;
                self.$parent.checkedEmps.forEach(function(model) {  net+= Number((model.salary === undefined) ? 0 : model.salary); sss+= Number((model.sss === undefined) ? 0 : model.sss); phil+= Number((model.phil === undefined) ? 0 : model.phil); advances+= Number((model.advances === undefined) ? 0 : model.advances); });
                self.totalNet = net;
                self.totalSss = sss;
                self.totalPhil = phil;
                self.totalAdvances = advances;
            },

            getRatePerHour(model){
                return Number(model.rpd) / 8;
            },

            getDesignation(model){
    			return this.$parent.getDesignation(model);
    		},

            inputClass(){
                return 'form-control text-center';
            },
           
            findModel(id){
                var self = this;
                return self.$parent.checkedEmps.filter(function(model) {
                    return Number(model.id) === Number(id);
                });
            },

            submitAttendance(event){
                var self = this;                

                var obj = {
                    date_from: self.date_from,
                    date_to: self.date_to                
                };

                if (moment(obj.date_from).isValid() === false || moment(obj.date_to).isValid() === false) {
                    alert('Invalid payroll date.');
                }else {                    
                    self.$http.post('/payroll', obj).then( (response) => {
                        var json = JSON.parse(response.body);
                        if (json.success) {
                            var pid = json.id;
                            self.savePayrollemps(pid, self.validateEmps());
                        }
                    }, (errorResp) => {
                        console.log(errorResp);
                    });                  
                }
            },

            validateEmps(){
                var self = this;
                var emps = self.$parent.checkedEmps;
                var props = ['hrs_work','phil','sss','advances'];
                emps.forEach(function(model) {
                    _.each(props, function(key){
                        if (model[key] === undefined) {
                            model[key] = 0;
                        }
                    });
                });
                return emps;
            },

            savePayrollemps(pid, emps){
                var self = this;
                // var emps = self.$parent.checkedEmps;
                self.$http.post('/payrollemps', { emps: emps, pid: pid }).then( (response) => {
                    var json = JSON.parse(response.body);
                    if (Number(json.saved) === Number(json.emp_length)) {
                        self.afterSave();
                        alert('payroll saved');
                    }
                }, (errorResp) => {
                    console.log(errorResp);
                });
            },

            afterSave(){
                var self = this;
                var $modal = $('#modal-create-attendanced');
                $modal.modal('hide');
                self.totalAdvances = 0;
                self.totalSss = 0;
                self.totalPhil = '';
                self.totalNet = '';
                self.date_from = '';
                self.date_to = '';
                self.$parent.checkedEmps = [];
                $modal.find('table').empty();
            }

    	}

    });
   
    return Component; 
});