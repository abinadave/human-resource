define(['underscore','backbone',
    'libs/backbone.obscura'], function(_, Backbone, Obscura) {
   
    var Module = {

        doneFetch: function(colmod) {
            this.appendList(employees);
            $.when(payrollemps.fetch({silent: true, url: 'api.php/payrollemp/partial'})).then(function() {
                payrolls.fetch({silent: true, url: 'api.php/get/payrolls'});
            });
        },

        getEmployeesWithIds: function(ids) {
            var models = new Backbone.Collection(), rs = '';
            ids.forEach(function(i) {
                rs = employees.where({id: i});
                if (rs.length) {
                    models.add(employees.get(i));
                }
            });
            return models;
        },

        setEmployeeNumber: function(model, envelopeNumber) {
            var rs = employees.where({id: model.emp_id});
            if (rs.length) {
                var emp = employees.get(model.emp_id);
                emp.set({numbering: envelopeNumber.toString()}, {silent: true});
            }
        },

        getProperty: function(empId, prop) {
            var rs = employees.where({id: empId});
            if (rs.length) {
                return employees.get(empId).get('numbering');
            }
        },


        coTruckWorkers: function(truck_no) {
            var proxy = new Obscura(employees);
            return proxy.filterBy('truck_no', {truck_no: truck_no});
        },

        calculateSalary: function(ton, employee) {
            if (employee.designation.substr(0,1).toUpperCase() === 'D') {
                return (ton / 1000) * Number(rate.get('driver'));
            }else {
                return (ton / 1000) * Number(rate.get('helper'));
            }
        },

        calculateSalaryDriver: function(ton) {
            return (ton / 1000) * Number(rate.get('driver'));
        },

        calculateSalaryHelper: function(ton) {
            return (ton / 1000) * Number(rate.get('helper'));
        },

        getSelectedEmps: function() {
            var proxy = new Obscura(employees);
            return proxy.filterBy('selected', {selected: true});
        },
        
    	appendTable: function(arguments) {
    		require(['views/employee/view_table_employee'], function(Subview){
    		    var view = new Subview();
    		});
    	},

        appendList: function(list) {
            require(['views/employee/view_list_of_employees'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

        appendListOfSelectedEmps: function(list) {
            require(['views/employee/view_list_of_selected_emp'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

    	modalAddEmp: function() {
    		require(['views/employee/view_modal_add_new_emp'], function(Subview){
    		    var view = new Subview();
    		});
    	}

    };
   
    return Module;
});