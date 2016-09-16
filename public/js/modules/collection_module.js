define(
	[
		'underscore',
		'backbone'
	],  function(_, Backbone) {
   
    var module = {

    	fetchData: function(tbl, str_collection, thismodule){
    		if (window[str_collection].length) {
                if (thismodule.hasOwnProperty('doneFetch')) {
                    thismodule.doneFetch(module);
                };

                // require(['modules/functions'], function(fn){
                //     fn.refreshData(tbl, thismodule, str_collection);
                // });

    		}else {
    			$.getJSON('ajax/select/select.php', {table: tbl}, function(json, textStatus, xhr) {
    				/*optional stuff to do after success */
    			}).success(function(json){
    				module.saveModel(json, 1, str_collection);
                    if (thismodule.hasOwnProperty('doneFetch')) {
                        thismodule.doneFetch(module);
                    };
    			}).fail(function(xhr){
    				alert('error type: '+xhr.status);
    			});
    		}
    	},

        fetchWhere: function(str_collection, where, value, thismodule){
            if (window[str_collection].length) {
                if (thismodule.hasOwnProperty('doneFetch')) {
                    thismodule.doneFetch(module);
                    // module.saveModel(json, 'false', str_collection);
                    console.log('has length');
                };
            }else {
                $.getJSON('ajax/select/select_all_where.php', 
                    {
                        table: str_collection,
                        where: where,
                        value: value
                    },function(json, textStatus, xhr) {
                    /*optional stuff to do after success */
                }).success(function(json){
                    // engineer_items.add(json);
                    module.saveModel(json, 'false', str_collection);
                    if (thismodule.hasOwnProperty('doneFetch')) {
                        thismodule.doneFetch(module);
                    };
                }).fail(function(xhr){
                    alert('error type: '+xhr.status);
                });
            }
        },

    	saveDB: function(form, str_collection, thismodule){
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var json = $.parseJSON(data);
                module.saveModel(json, 0, str_collection);
                if (_.has(thismodule,'afterSave')) {
                    //if you have other process to do.
                    //this is optional
                    thismodule.afterSave(json);     
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        justSave: function(form, str_collection, thismodule){
            $.post('ajax/save/save.php', form, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var json = $.parseJSON(data);
                if (_.has(thismodule,'afterSave')) {
                    //if you have other process to do.
                    //this is optional
                    thismodule.afterSave(json);     
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        saveModel: function(json, type, str_collection){
        	window[str_collection].add(json, {silent: type});
        },

        removeDB: function(tbl, i, property, thismodule){
            $.post('ajax/delete/delete.php', { table: tbl, id: i, prop: property }, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
               if (_.has(thismodule,'afterRemove')) {
                    //if you have other process to do.
                    //this is optional
                    thismodule.afterRemove(json);     
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        updateDB: function(obj, str_collection, thismodule){
            $.post('ajax/update/update.php', $.param(obj), function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                if (thismodule.hasOwnProperty('afterUpdate')) {
                    thismodule.afterUpdate(obj);
                }
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
        },

        search: function(str_collection, value){
            var list = new Backbone.Collection();
            window[str_collection].forEach(function(model) {
                $.each(model.attributes, function(index, val) {
                    if (typeof model.get(index) !== 'boolean') {
                        if (model.get(index).toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                            list.add(model);
                        };
                    }
                });
            });
            return list;
        },

        sortBy: function(Obscura, BackboneCollection, attr, type){
            var proxy = new Obscura(BackboneCollection);
            return proxy.setSort(attr, type);
        }
        
    }
   
    return module; 
});