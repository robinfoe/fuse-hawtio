/// <reference path="resourcePlugin.js"/>

var ResourcePlugin;
(function (ResourcePlugin) {
	
	ResourcePlugin.NavBarController = function($scope, workspace){
		ResourcePlugin.log.info(ResourcePlugin.CONTEXT.pluginName, " Nav bar Loaded");
		$scope.hash = workspace.hash();
		$scope.isScrEnabled = Karaf.getSelectionScrMBean(workspace);
        $scope.$on('$routeChangeSuccess', function () {
            $scope.hash = workspace.hash();
        });
        $scope.isActive = function (nav) {
            return workspace.isLinkActive(nav);
        };
        $scope.isPrefixActive = function (nav) {
            return workspace.isLinkPrefixActive(nav);
        };
	};
	
	
	
})(ResourcePlugin || (ResourcePlugin = {}));
