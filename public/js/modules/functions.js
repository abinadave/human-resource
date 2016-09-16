define(
	[
		'underscore',
		'backbone',
		'moment'
	],  function(_, Backbone, moment) {
   
    var Functions = {

        //Reusable codes..

		escapeRegExp: function(string) {
		    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		},

		replaceAll: function(string, find, replace) {
		 	return string.replace(new RegExp(Functions.escapeRegExp(find), 'g'), replace);
		},

		zeroPad: function(num, places){
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        },

        getDate: function() {
           return moment().format('MMMM DD, YYYY HH:mm:ss');
        },

        clearObject: function(form){
        	var obj = router.getQueryParameters(form);
        	$.each(obj, function(key) {
               var newValue = Functions.replaceAll(obj[key],'+',' ');
               obj[key] = newValue;
            });
            return obj;
        },

        datatablePlugin: function(table){
            $(function() {
                require(['DT-bootstrap','datatable','css!libs/dataTables/dataTables.bootstrap.css'], 
                    function(dt1, dt2, css){
                      $(table).dataTable();
                });
            });
        },

        datepickerPlugin: function(id){
            require(['libs/jquery-ui/jquery-ui.min'], function(){
                $(id).datepicker();
            });
        },

        noDataWasFound: function(id, cs, msg){
            var output = '<tr><td colspan=\''+cs+'\'>'+msg+'</td></tr>';
            $(id).html(output);
        },

        playSound: function(dir){
            require(['libs/sound-player/jquery.playSound'], function(playSound){
                $.playSound(dir);
            });
        },

        validateEmail: function(email){
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        },

        getFormValues: function(self) {
            var obj = {};
            self.$el.find('input[type="text"], select, input[type="date"], input[type="number"]').each(function(index, el) {
                obj[$(this).attr('name')] = ($(this).val() !== null) ? $(this).val() : "";
            });
            return obj;
        },

        printArea: function(elem) {
            require(['libs/print-area/demo/jquery.PrintArea',
                'css!libs/print-area/demo/PrintArea.css'], function(){
                $.printArea(elem);
            });
        }

		
    }
   
    return Functions; 
});