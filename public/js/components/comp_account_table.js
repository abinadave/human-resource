define([
	'vue',
	'vue-resource',
	'text!templates/temp_account_table.html',
	'moment'
	], function(Vue, VueResource, template, moment){
	
	Vue.use(VueResource);
	Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

	var Component = Vue.extend({
		template: template,
		props: ['search'],
		methods: {
			removeAccount(model){
				var self = this;
				var ok = confirm('Would you like to remove: ' + model.name + ' ?');
				if (ok) {
					var resource = self.$resource('/account{/id}');
					resource.delete({id: model.id}).then( (resp)=> {
						var json = JSON.parse(resp.body);
						if (json.success > 0) {
							self.$parent.accounts.$remove(model);
						}
					}, (resp) => {
						console.log(resp);
					});
				}
			},

			updateAccount(model){
				var self = this;
				$('#modal-update-used').modal('show');
				var modalComp = self.$parent.$children[2];
				modalComp.name = model.name;
				modalComp.email = model.email;
				modalComp.id = model.id;
				modalComp.decryptPassword(model.password);
			}

		},

		computed: {
			
		}

	});

	return Component;

});