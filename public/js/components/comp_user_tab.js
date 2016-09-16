define(
	[
		'vue',
		'text!templates/temp_user_tab.html',
		'components/comp_user_form',
		'components/comp_account_table',
        'components/comp_modal_update_user',
	], function(Vue, template, CompUserForm, CompAccoutTbl, CompModalUpdateUser) {
    
    var Component = Vue.extend({
    	
    	template: template,

    	components: {
            'user-form': CompUserForm,
            'user-comp': CompAccoutTbl,
            'user-updatemodal': CompModalUpdateUser
        },

    	created(){
    		var self = this;
            self.fetchAccounts();
    	},

    	data: function () {
		    return {
                accounts: []
		    }
		},
        
    	methods: {
    		fetchAccounts(){
                var self = this;
                self.$http.get('/account').then( (data) => {
                    var json = JSON.parse(data.body);
                    self.accounts = json;
                }, (error) => {
                    console.log('error in fetching accounts');
                    console.log(error);
                });
            }
    	}

    });
        
    return Component; 
});