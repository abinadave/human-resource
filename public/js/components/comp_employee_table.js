define([
	'vue',
	'vue-resource',
	'underscore',
	'moment',
	'text!templates/temp_employee_table.html',
	'components/department/comp_cbo_for_employee_table',
	'components/designation/comp_cbo_designation_emp_tbl',
	'components/employee/attendance/comp_modal_create_attendance',
	'components/employee/picture/comp_add_employee_picture',
	'components/contract/comp_modal_update_contract',
	'css!libs/css/style.css'
	], function(Vue, VueResource, _, moment, template, CompCboForEmployeeTbl,
		CompCboDesigEmpTbl, CompModalCreateAttndnce, CompAddEmpPic,
		CompModalUpdateContract, CssStyle1
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
    			contracts: [],
    			photoEmployees: []
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
			'modal-picemp': CompAddEmpPic,
			'update-contract': CompModalUpdateContract
		},

    	props: [
    		'employees','departments','designations','search','update_fullname',
    		'update_rpd','update_department','update_designation','update_hidden_id',
    		'updateStartContract','updateEndContract'],
    	
    	template: template,

    	created(){
			var self = this;
			self.fetchDatas();
		},
		
		methods: {

			displayProfilePicture(emp_id){
				
			},

			showPhotoEmployee(emp){
				var self = this;
				var $img = $('#img-employee');
				clearTimeout(self.timer);
				self.timer = setTimeout(function() {
					var rs = _.where(self.photoEmployees, {emp_id: emp.id});
					if (rs.length) {
						var model = _.first(rs);
						var file = model.emp_id + '-' + model.filename;
						$img.attr('src','app/uploads/employees/'+file);						
					}else {
						$img.attr('src','assets/images/default.png');						
					};
				}, 500);
			},

			getContractExpiration(emp){
				var self = this;
				var latestContract = self.getLatestContract(emp);
				if (latestContract) {
					var end = $.trim(latestContract.split('-')[1]);
					var str = end.split(' ');
					var date = str[0] +' '+ str[1] +' '+ str[2];
					return moment(date).fromNow();
				}
			},

			udpateEmpContract(){
				var self = this;
				var emp = self.getEmp(self.currentId);
				if (typeof emp === 'object') {
					var latestContract = self.getLatestContract(emp);
					if (latestContract !== undefined) {
						var contract = latestContract.split('-');
						self.updateStartContract = $.trim(contract[0]);
						self.updateEndContract = $.trim(contract[1]);
						$('#modal-update-contract').modal('show');
					}else {
						self.updateStartContract = '';
						self.updateEndContract = '';
						$('#modal-update-contract').modal('show');
					}
					
				}
			},

			getEmp(emp_id){
				var rs = _.where(this.employees, {id: emp_id});
				if (rs.length) {
					return _.first(rs);
				}else {
					return null;
				}
			},

			getLatestContract(emp){
				var self = this;
				var rs = _.where(self.contracts, {emp_id: emp.id});
				if (rs.length) {
					var max_id = _.max(_.pluck(rs, 'id'));
					var rsContract = _.where(rs, {id: max_id});
					if (rsContract.length) {
						var model = _.first(rsContract);
						return moment(model.start).format('MMMM DD, YYYY') + ' - ' + moment(model.end).format('MMMM DD, YYYY dddd');
					}
				}
			},

			addPicure(){
				var self = this;
				window.location = '/upload_employee_image/'+self.currentId;
			},

			setCurretId(i){
				this.currentId = i;
				$('#tbl-emp').find('tr').removeClass('text-danger emp-tr-click');
				$('#emp-tr-'+i).addClass('text-danger emp-tr-click');
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
				var $modal = $('#modalUpdateEmployee');
				var self = this;
				var id = self.update_hidden_id;
				$modal.find(':submit').prop('disabled', true).text('updating please wait..');

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
						require(['alertify'], function(alertify){
						    alertify.success('Employee saved');
						});
					}
				}, (data) => {

				});

				setTimeout(function() {
					$modal.find(':submit').prop('disabled', false).text('Save changes');
				}, 5000);



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
				require([
					'alertify'
					], function(alertify){
					alertify.defaults.glossary.title = 'Confirmation';
				    alertify.confirm('Are you sure you want to delete <b class="text-info">'+ emp.fullname.toUpperCase() +'</b> ?', function(e){
				    	if (e) {
				    		var reason = prompt('Enter reason for resignation');
							self.saveReasonResignation(emp, reason);
				    	}
				    });
				});
			},

			saveReasonResignation(emp, reason){
				var self = this;
				if (reason) {
					self.$http.post('/resignation_reason', {
						emp_id: emp.id,
						reason: reason
					}).then((response) => {
						var json = JSON.parse(response.body);
						if (json.success) { self.removeEmp(emp); };
					}, (errorResp) => {
						console.log(errorResp);
					});
				}else {
					require(['alertify'], function(alertify){
					    alertify.warning('Reason for resignation is required');
					});
				}
				
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
					self.contracts = json.contracts;
					self.designations = json.designations;
					self.departments = json.departments;
					self.employees = json.employees;
					self.photoEmployees = json.photo_employees;
				}, (errResponse) => {
					console.log(errorResp);
				});
			}
		}	
    });
   
    return Component; 
});