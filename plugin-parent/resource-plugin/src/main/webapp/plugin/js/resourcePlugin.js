/// <reference path="pluginHelper.js"/>

var ResourcePlugin ;
(function(ResourcePlugin){
	
	ResourcePlugin.module = angular.module(ResourcePlugin.CONTEXT.pluginName, ['bootstrap','ngGrid', 'hawtio-ui' ,'hawtioCore','chart.js','ngResource'])
	.directive('graphHeap', function(){ return new ResourcePlugin.directive.heap(); })
	.directive('graphGarbageCollector', function(){ return new ResourcePlugin.directive.garbageCollector(); })
	.directive('dsInfo', function(){ return new ResourcePlugin.directive.datasource(); })
	.config(function($routeProvider) {
	      /**
	       * Here we define the route for our plugin.  One note is
	       * to avoid using 'otherwise', as hawtio has a handler
	       * in place when a route doesn't match any routes that
	       * routeProvider has been configured with.
	       */
	      $routeProvider
	          .when('/resource_plugin/utilisation', {templateUrl: ResourcePlugin.CONTEXT.templatePath + 'utilisation.html'})
	          .when('/resource_plugin/datasource', {templateUrl: ResourcePlugin.CONTEXT.templatePath + 'datasource.html'})
	          ;
	    });
	
	
	ResourcePlugin.module.run(function(workspace, viewRegistry, layoutFull) {
	    ResourcePlugin.log.info(ResourcePlugin.CONTEXT.pluginName, " loaded");
	    Core.addCSS(ResourcePlugin.CONTEXT.contextPath + "plugin/css/resource.css");
	    Core.addCSS(ResourcePlugin.CONTEXT.contextPath + "plugin/css/angular-chart.css");

	    viewRegistry[ResourcePlugin.CONTEXT.pluginName] = ResourcePlugin.CONTEXT.templatePath +"navbar.html";
	    
	    workspace.topLevelTabs.push({
	      id: ResourcePlugin.CONTEXT.pluginName,
	      content: "Resource",
	      title: "Resource plugin loaded dynamically",
	      isValid: function(workspace) { return true; },
	      href: function() { return "#/resource_plugin/utilisation"; },
	      isActive: function(workspace) { return workspace.isLinkActive(ResourcePlugin.CONTEXT.pluginName); }
	    });
	  });
	
	
	return ResourcePlugin;
	
})(ResourcePlugin || {});

// tell the hawtio plugin loader about our plugin so it can be
// bootstrapped with the rest of angular
hawtioPluginLoader.addModule(ResourcePlugin.CONTEXT.pluginName);


