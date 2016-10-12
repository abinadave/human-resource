define([
	'vue',
	'vue-resource',
	'text!templates/payroll/payrollemp/temp_modal_update_payrollemp.html'
	], function(Vue, VueResource, template) {
   
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Vue = Vue.extend({
    	template: template,
    	
        data: function(){
    		return {
    			payrollemp: {}
    		}
    	},
    	
        props: ['fullname'],

    	methods: {
    		updatePayrollemp(event){
    			event.preventDefault();
    			var self = this;
                var $modal = $('#modal-update-payrollemp');

                $modal.find(':submit').prop('disabled', true);
    			self.$http.put('/payrollemps', self.payrollemp).then((response)=> {
    				var json = JSON.parse(response.body);
    				if (json.success) {
                        var emp_id = json.emp_id;
                        self.afterSave();
                    }
    			}, (errorResp) => {
    				console.log(errorResp);
    			});

                setTimeout(function() {
                    $modal.find(':submit').prop('disabled', false);
                }, 7000);
    		},

            afterSave(){
                $('#modal-update-payrollemp').modal('hide');
                require(['alertify'], function(alertify){
                    alertify.success('process completed');
                })
            }

    	}
    });
   
    return Vue; 
});