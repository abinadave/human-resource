define([
	'vue',
	'vue-resource',
	'text!templates/temp_modal_update_user.html'], function(Vue, VueResource, template) {
    
    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: ['namess','email','password','id'],
    	methods: {
    		submitForm(event){
    			event.preventDefault();
    			var self = this;
    			var obj = {
                    id: self.id,
    				name: self.name,
    				email: self.email,
    				password: self.password
    			};
                self.$http.put('/account', obj).then((resp) => {
                    var json = JSON.parse(resp.body);
                    var found = self.findModel(self.id);
                    if (found.length) {
                        var first = found[0];
                        first.name = obj.name;
                        first.email = obj.email;
                        $('#modal-update-used').modal('hide');
                    }
                }, (errorResp) => {
                    console.log(errorResp); 
                });
    		},

            findModel(id){
                var self = this;
                return self.$parent.accounts.filter(function(model) {
                    return Number(model.id) === Number(id);
                });
            },

    		decryptPassword(pass){
    			var self = this;
    			self.$http.post('/decrypt_pass', { password: pass }).then((resp) => {
    				var json = JSON.parse(resp.body);
    				self.password = json.value;
    			}, (errorResp) => {
    				console.log(errorResp);
    			});
    		}

    	}
    });
   
    return Component; 
});