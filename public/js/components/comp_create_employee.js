define(
    [
    'vue',
	'vue-resource',
	'text!templates/temp_create_employee.html'
    ], 
    function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: ['employees','departments','designations','fullname','department','rpd','designation','add_department','add_designation'],
        created(){
            this.fetchDepartments();
            this.fetchDesignations();
        },
    	methods: {

            removeDesignation(model){
                var self = this;
                var ok = confirm('Are you sure ?');
                if (ok) {
                    var resource = self.$resource('designation{/id}');
                    resource.delete({id: model.id}).then( (resp) => {
                       var json = $.parseJSON(resp.body);
                       if (json.removed === true) {
                          self.designations.$remove(model);
                       }
                    }, (errorResp) => {
                        console.log(errorResp);
                    });
                }
            },

            removeDepartment(model){ 
               var self = this;               
               // self.departments.$remove(model);
               var deleteOk = confirm('Are you sure ?');
               if (deleteOk) {
                  var resource = self.$resource('department{/id}');
                  resource.delete({id: model.id}).then( (resp) => {
                      var json = $.parseJSON(resp.body);
                      if (json.deleted > 0) {
                          self.departments.$remove(model);
                      }
                  }, (resp) => {

                  });
               }
            },

            editDesignation(model){
                var self = this;
                var value = prompt('Enter new designation name', model.name);
                
                self.$http.put('/designation', {
                    id: model.id,
                    name: value.toUpperCase()
                }).then((data) => {
                    model.name = value.toUpperCase();
                }, (data) => {
                    var json = $.parseJSON(data.body);
                    
                });

            },

            editDepartment(model){
                var self = this;
                var value = prompt('Enter new department name', model.name);
                if (self.checkForDuplicateDeptName(value) === 0) {
                    self.$http.put('/department', model).then((data) => {
                        var json = JSON.parse(data.body);
                        if (json.response) {
                            model.name = value;
                        }
                    }, (data) => {
                        alert('Error connection. error type: ' + data.body);
                    });
                }else {
                    alert('Incorrect department name, Please verify if the name you entered has a duplicate  department name');
                }
            },

            checkForDuplicateDeptName(value){
                var error = 0;
                var self = this;
                self.departments.forEach(function(model) {
                    if (model.name.toLowerCase() === value.toLowerCase()) {
                        ++error;
                    }
                });
                if (value === '') {
                    ++error;
                }
                return error;
            },

            checkForDuplicateDesigName(value){
                var error = 0;
                var self = this;
                self.designations.forEach(function(model) {
                    if (model.name.toLowerCase() === value.toLowerCase()) {
                        ++error;
                    }
                });
                if (value === '') {
                    ++error;
                }
                return error;
            },

            fetchDepartments(){
                var self = this;
                this.$http.get('/department').then( (response) => {
                    var json = $.parseJSON(response.body);
                    self.departments = json;
                }, (response) => {
                    //if some error happened.
                    console.log(response);
                });
            },

            fetchDesignations(){
                var self = this;
                this.$http.get('/designation').then( (response) => {
                    var json = $.parseJSON(response.body);
                    // console.log(json);
                    self.designations = json;
                }, (response) => {
                    //if some error happened.
                    console.log(response);
                });
            },

    		submitForm(event){
    			event.preventDefault();
                var self = this;
    			var obj = {
    				fullname: this.fullname,
    				rpd: this.rpd,
    				department: this.department,
    				designation: this.designation
    			};
    			  this.$http.post('/employee', obj).then((response) => {
                     var json = $.parseJSON(response.body);
                     if (json.id > 0) {
                        self.fullname = '';
                        self.rpd = '';
                        self.department = '0';
                        self.designation = '';
                    }
                     
			      }, (response) => {
			          // error callback
			      });
    		},

            saveDepartment(event){
                event.preventDefault();
                var self = this;
                var obj = {
                    name: this.add_department.toUpperCase()
                };
                this.$http.post('/department', obj).then( (response) => {
                    var json = $.parseJSON(response.body);
                    if (json.saved) {
                        obj.id = json.lastInsertId;
                        self.departments.push(obj);
                        self.add_department = '';
                    }
                }, (response) => {
                    console.log(response);
                });
            },

            saveDesignation(event){
                event.preventDefault();
                var self = this;
                if (self.validateDesignation() > 0) {
                    alert('Designation name already exist');
                }else {
                    var obj = { name: this.add_designation.toUpperCase() };
                    this.$http.post('/designation', obj).then((response) => {
                        console.log(response)
                        var json = $.parseJSON(response.body);
                        if (json.saved) {
                            obj.id = json.lastInsertId;
                            self.designations.push(obj);
                            self.add_designation = '';
                        }
                    }, (response) => {
                        console.log('error in saving designation.', response.body);
                    });
                }                
            },

            validateDesignation(){
                var self = this;
                var name = self.add_designation.toLowerCase();
                var duplicates = 0;
                self.designations.forEach(function(model) {
                    if (model.name.toLowerCase() === self.add_designation) {
                        ++duplicates;
                    }
                });
                return duplicates;
            }
    	}

    });
   
    return Component; 
});