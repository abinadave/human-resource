define(['vue'], function(Vue) {
   
    var Dave = {
    	loadData(arrOfCols, self){
    		var length = arrOfCols.length;
    		var fetched = 0;
    		arrOfCols.forEach(function(arrObj) {
    			var keys = Object.keys(arrObj);
    			self.$http.get('/'+keys[0]).then((data) => {
    				self[arrObj[keys[0]]] = $.parseJSON(data.body);
    			}, (data) => {
    				console.log('error in fetching: ' + keys[0])
    			});
    		});
    	}
    };
   
    return Dave; 
});