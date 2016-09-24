define([
	'vue',
	'vue-resource',
	'text!templates/contract/temp_modal_update_contract.html'], 
	function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');
    
    var Component = Vue.extend({
    	template: template,
    	data: function(){
    		return {
    			current_start: '',
    			current_end: '',
    			contract: {
    				start: '',
    				end: ''
    			}
    		}
    	},
    	props: ['startContract','endContract','empId'],

    	methods: {
    		saveNewContract(event){
    			event.preventDefault();
    			var self = this;
                var parent = self.$parent;
    			var obj = self.contract;
    			obj.emp_id = self.empId;
    			self.$http.post('/contract', obj).then( (response) => {
                     var json = JSON.parse(response.body);
                     if (json.success) {
                        obj.id = json.id;
                        self.$parent.contracts.push(obj);
                        $('#modal-update-contract').modal('hide');
                     }
                }, (response_error) => {
                    console.log('error in updating contract, error was: '+response_error);
                });
    		}
    	}
    });
   
    return Component; 
});