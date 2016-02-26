/// <reference path="resourcePlugin.js"/>

var ResourcePlugin;
(function (ResourcePlugin) {
	ResourcePlugin.DatasourceController = function($scope, jolokia){
		ResourcePlugin.log.info(ResourcePlugin.CONTEXT.pluginName, " Datasource loaded");
		$scope.title = "Data Source";
		$scope.datasources = [];
		$scope.JMX_NAME = 'org.apache.commons.dbcp2';
		
		$scope.toggleUi = function(item){
			ResourcePlugin.log.info(item);
			item.uiVisible = !item.uiVisible;
		};
		
		jolokia.request({
	        type: 'list',
	      }, onSuccess(function(response){
	    	  
	    	  ResourcePlugin.log.info("LIST ... ");
	    	 // ResourcePlugin.log.info(JSON.stringify(response));
	    	  if(typeof response.value[$scope.JMX_NAME] != "undefined" ){
	    		  angular.forEach(response.value[$scope.JMX_NAME], function(item , key){
	    			  ResourcePlugin.log.info('looping 001 ');
	    			  $scope.datasources.push(new ResourcePlugin.entity.datasource($scope.JMX_NAME + ":" + key));
	    			  //$scope.datasources.push($scope.JMX_NAME + ":" + key);
		    	  });
	    	  }
	    	  
	    	  ResourcePlugin.log.info('looping 002 ');
	    	  angular.forEach($scope.datasources , function(item){
	    		  
	    		  Core.register(jolokia, $scope, {
	    		      type: 'read', mbean: item.mbean,
	    		      arguments: []
		    		}, onSuccess(function(response){
		    			ResourcePlugin.log.info(JSON.stringify(response));
		    			item.populate(response.value);
		    			//$scope.data.gcPsMarkSweep.populate(response.value.LastGcInfo);
		    			Core.$apply($scope);
		    		}));
	    	  });
	      }));
		
		
		/*
		 Core.register(jolokia, $scope, {
		      type: 'read', mbean: 'org.apache.commons.dbcp2:type=db-pool,name=sampleDatasource',
		      arguments: []
		}, onSuccess(function(response){
			ResourcePlugin.log.info(JSON.stringify(response));
			//$scope.data.gcPsMarkSweep.populate(response.value.LastGcInfo);
			Core.$apply($scope);
		}));
		 * 
		 * */
		
		
		
	};

})(ResourcePlugin || (ResourcePlugin = {}));