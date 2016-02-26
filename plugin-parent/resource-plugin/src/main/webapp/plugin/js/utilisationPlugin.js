/// <reference path="resourcePlugin.js"/>

var ResourcePlugin;
(function (ResourcePlugin) {
	
	ResourcePlugin.UtilisationController = function($scope, jolokia){
		
		ResourcePlugin.log.info(ResourcePlugin.CONTEXT.pluginName, " Utilisation loaded");
		$scope.title = "Utilisation";
		
		$scope.data = {
	    		heap : new ResourcePlugin.entity.heap('JVM - HEAP Space') , 
	    		nonHeap : new ResourcePlugin.entity.heap('JVM - NON HEAP Space'),
	    		gcPsScavage : new ResourcePlugin.entity.garbageCollector('PS Scavage'),
	    		gcPsMarkSweep : new ResourcePlugin.entity.garbageCollector('PS Mark Sweep')
	    };
		
		
		Core.register(jolokia, $scope, {
		      type: 'read', mbean: 'java.lang:type=Memory',
		      arguments: []
	    }, onSuccess(function(response){
	    	$scope.data.heap.populate(response.value.HeapMemoryUsage);
	    	$scope.data.nonHeap.populate(response.value.NonHeapMemoryUsage);
	    	Core.$apply($scope);
	    }));

	    Core.register(jolokia, $scope, {
		      type: 'read', mbean: 'java.lang:type=GarbageCollector,name=PS Scavenge',
		      arguments: []
		}, onSuccess(function(response){
			$scope.data.gcPsScavage.populate(response.value.LastGcInfo);
			Core.$apply($scope);
		}));
	    
	    Core.register(jolokia, $scope, {
		      type: 'read', mbean: 'java.lang:type=GarbageCollector,name=PS MarkSweep',
		      arguments: []
		}, onSuccess(function(response){
			$scope.data.gcPsMarkSweep.populate(response.value.LastGcInfo);
			Core.$apply($scope);
		}));
		
	};
	
	
})(ResourcePlugin || (ResourcePlugin = {}));