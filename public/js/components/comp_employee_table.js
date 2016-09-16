define([
	'vue',
	'vue-resource',
	'underscore',
	'text!templates/temp_employee_table.html',
	'components/department/comp_cbo_for_employee_table',
	'components/designation/comp_cbo_designation_emp_tbl',
	'components/employee/attendance/comp_modal_create_attendance',
	'components/employee/picture/comp_add_employee_picture',
	'css!libs/css/style.css'
	], function(Vue, VueResource, _, template, CompCboForEmployeeTbl,
		CompCboDesigEmpTbl, CompModalCreateAttndnce, CompAddEmpPic,
		CssStyle1
	) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');
    
    var Component = Vue.extend({

    	el: function(){
    		return '#app'
    	},

    	data: function () {
    		return {
    			checkedEmps: [],
    			currentId: '',
    			checkAll: false,
    		};
		},

		watch: {
			'checkAll': function(val, oldVal){
				var self = this;
				if (val) {
					/* checked */
					self.checkedEmps = self.employees;
				}else {
					/* unchecked */
					self.checkedEmps = [];
				}
			}
		},

		components: {
			'cbo-department': CompCboForEmployeeTbl,
			'cbo-designation': CompCboDesigEmpTbl,
			'modal-attendance': CompModalCreateAttndnce,
			'modal-picemp': CompAddEmpPic
		},

    	props: ['employees','departments','designations','search','update_fullname','update_rpd','update_department','update_designation','update_hidden_id'],
    	
    	template: template,

    	created(){
			var self = this;
			this.fetchDatas();
		},
		
		methods: {

			displayProfilePicture(emp_id){
				
			},

			addPicure(){
				var self = this;
				var model = self.findModel(self.currentId)[0];
				window.location = '/upload_employee_image/'+model.id;
			},

			setCurretId(i){
				this.currentId = i;
				$('#tbl-emp').find('tr').removeClass('emp-tr-click');
				$('#emp-tr-'+i).addClass('emp-tr-click');
			},

			changeChk(event){
				var $chk = $(event.target);
				var is = $chk.is(':checked');
				var emp_id = $chk.val();
				var model = this.findModel(emp_id)[0];
				if (is) {
					this.checkedEmps.push(model);
				}else {
					this.checkedEmps.$remove(model);
				}
			},

			createAttendance(){
				var self = this;
				if (!self.checkedEmps.length) {
					alert('Please select employee to create attendance');
				}else {
					var child3 = self.$children[3];
					var selected = parseInt(child3.selected);
					var model = _.where(self.departments, {id: selected});
					
					$('#modal-create-attendanced').modal('show');
				}
			},

			updateEmployee(event){
				event.preventDefault();
				var self = this;
				var id = self.update_hidden_id;
				var obj = {
					fullname: self.update_fullname,
					department: self.update_department,
					designation: self.update_designation,
					rpd: self.update_rpd,
				};

				self.$http.put('employee/'+id, obj).then((data) => {
					var json = $.parseJSON(data.body);
					if (json.updated === true) {
						var found = self.findModel(id);
						require(['underscore'], function(_){
						    var model = _.first(found);
						    model.fullname = self.update_fullname; model.department = self.update_department; model.designation = self.update_designation; model.rpd = self.update_rpd;						    
						});	
						$('#modalUpdateEmployee').modal('hide');
					}
				}, (data) => {});

			},

			findModel(id){
				var self = this;
				return self.employees.filter(function(model) {
					return Number(model.id) === Number(id);
				});
			},

			showModalUpdate(emp){
				var self = this;
				$('#modalUpdateEmployee').modal('show');   
				self.update_fullname = emp.fullname;
				self.update_rpd = emp.rpd;
				self.update_department = emp.department;
				self.update_designation = emp.designation;
				self.update_hidden_id = emp.id;
			},

			deleteEmployee(emp){
				var self = this;
				var ok = confirm('Are you sure ?');
				if (ok) {
					var reason = prompt('Enter reason for resignation');
					self.saveReasonResignation(emp, reason);
				}
			},

			saveReasonResignation(emp, reason){
				var self = this;
				self.$http.post('/resignation_reason', {
					emp_id: emp.id,
					reason: reason
				}).then((response) => {
					var json = JSON.parse(response.body);
					if (json.success) { self.removeEmp(emp); };
				}, (errorResp) => {
					console.log(errorResp);
				});
			},

			removeEmp(emp){
				var self = this;
				var obj = { id: emp.id };
				var resource = self.$resource('employee{/id}');
				resource.delete({id: emp.id}).then( (resp) => {
					var json = $.parseJSON(resp.body);
					if (json.deleted === true) {
						self.employees.$remove(emp);
					}
				}, (resp) => {
					console.log(resp);
				});
			},
			
			getDesignation(emp){
				var name = '';
				this.designations.forEach(function(model) {
					if(Number(model.id) === Number(emp.designation)){
						name = model.name;
					}
				});
				emp.desig_name = name;
				return name;
			},

			getDepartment(emp){
				var name = '';
				this.departments.forEach(function(model) {
					if(Number(model.id) === Number(emp.department)){
						name = model.name;
					}
				});
				emp.dp_name = name;
				return name;
			},

			fetchDatas(){
				var self = this;
				self.$http.get('/route_employee_tbl').then((response) => {
					var json = JSON.parse(response.body);
					self.designations = json.designations;
					self.departments = json.departments;
					self.employees = json.employees;
				}, (errResponse) => {
					console.log(errorResp);
				});
			}
		}	
    });
   
    return Component; 
});