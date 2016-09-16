define([
	'vue',
    'vue-resource',
	'text!templates/employee/picture/temp_add_employee_picture.html'
	], 
	function(Vue, VueResource, template) {

    Vue.use(VueResource);
    Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

    var Component = Vue.extend({
    	template: template,
    	props: ['name'],
        created(){
             require(['fileuploader'], function(fileuploader){
                new qq.FileUploader({
                    element: $('#photo-upload')[0],
                    action: 'upload',
                    allowedExtensions: ['jpg','gif','jpeg','png'],
                    onComplete: function(id, filename, json){
                        console.log(filename);
                    }
                });
            });
            
        },
    	methods: {
    		submitForm(event){
                event.preventDefault();
                var $form= $('#form-upload-emp').serialize();
                console.log($form);
            }
    	}
    });
   
    return Component; 
});