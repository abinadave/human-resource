define(
	[
	  'vue',
	  'vue-resource',
	  'text!templates/temp_user_form.html'
	], function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: ['name','email','password','password_confirmation'],
        created(){
           
        },
    	methods: {  
    		submitForm(event){
    			event.preventDefault();
    			var self = this;
    			var obj = { 
                    name: self.name, 
                    email: self.email, 
                    password: self.password,
                    password_confirmation: self.password_confirmation
                };
                console.log(obj);
                self.$http.post('/account', obj).then( (data) => {
    				var json = JSON.parse(data.body);
    				if (json.id > 0) {
                        obj.id = json.id;
                        obj.password = json.password;
                        self.$parent.accounts.push(obj);
                        self.name = ''; 
                        self.email = ''; 
                        self.password = ''; 
                        self.password_confirmation = '';
                        setTimeout(function() {
                            $('#div-user-form').find('form').find('input:first').focus();
                        }, 500);
                    }
    			}, (data) => {
    				var json = JSON.parse(data.body);
                    console.log(json);
    			});
    		}
    	},
        validate(){

        }

    });
   
    return Component; 
});