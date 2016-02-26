var WebUtil = {
		convertToMb : function(value){
			return (value / (1024*1024)).toFixed(2);
		}
};

var ResourcePlugin = (function(ResourcePlugin){
	ResourcePlugin.CONTEXT = {
			pluginName : 'resource_plugin',
			contextPath : "/resource-plugin/",
			templatePath : "/resource-plugin/plugin/html/"
	};
	ResourcePlugin.log = Logger.get('Resource');
	
	ResourcePlugin.directive = {
		garbageCollector : function(){
			return {
				restrict : 'E',
				templateUrl: ResourcePlugin.CONTEXT.templatePath + '/include/gc_directive.html',
				scope : {data: '='}
			};
		},
		heap : function(){
			return {
				restrict : 'E',
				templateUrl: ResourcePlugin.CONTEXT.templatePath + '/include/heap_directive.html',
				scope : {
			            data: '='
			        }
			};
		},
		datasource : function(){
			return {
				restrict : 'E',
				templateUrl: ResourcePlugin.CONTEXT.templatePath + '/include/datasource_directive.html',
				scope : {
			            data: '=',
			            toggle : '&'
			        }
			};
		}
	};
	
	
	
	ResourcePlugin.entity = {
			heap : function(title) {
				var self = this;
				self.title = title;
				self.content = {datas : [0,0] , labels : ['Used', 'Available']};
				self.max = 0;
				self.committed = 0;
				self.init = 0;
				self.used= 0;
				self.populate = function(val){
					self.max = WebUtil.convertToMb(val.max);
					self.committed = WebUtil.convertToMb(val.committed);
					self.init = WebUtil.convertToMb(val.init);
					self.used = WebUtil.convertToMb(val.used);
					self.content.datas[0] = self.used;
					self.content.datas[1] = (self.committed - self.used).toFixed(2);
				};
			},

			garbageCollector : function(title){
				var self = this;
				self.title =title;
				self.content = {datas : [[0,0,0,0,0],[0,0,0,0,0]] , labels : ['PS Survivor Space' , 'PS Eden Space' , 'PS Old Gen' , 'Code Cache' , 'PS Perm Gen']};
				self.populate = function(val){
					self.content.datas[0][0] = WebUtil.convertToMb(val.memoryUsageAfterGc['PS Survivor Space'].used);
					self.content.datas[0][1] = WebUtil.convertToMb(val.memoryUsageAfterGc['PS Eden Space'].used);
					self.content.datas[0][2] = WebUtil.convertToMb(val.memoryUsageAfterGc['PS Old Gen'].used);
					self.content.datas[0][3] = WebUtil.convertToMb(val.memoryUsageAfterGc['Code Cache'].used);
					self.content.datas[0][4] = WebUtil.convertToMb(val.memoryUsageAfterGc['PS Perm Gen'].used);
					self.content.datas[1][0] = WebUtil.convertToMb(val.memoryUsageBeforeGc['PS Survivor Space'].used);
					self.content.datas[1][1] = WebUtil.convertToMb(val.memoryUsageBeforeGc['PS Eden Space'].used);
					self.content.datas[1][2] = WebUtil.convertToMb(val.memoryUsageBeforeGc['PS Old Gen'].used);
					self.content.datas[1][3] = WebUtil.convertToMb(val.memoryUsageBeforeGc['Code Cache'].used);
					self.content.datas[1][4] = WebUtil.convertToMb(val.memoryUsageBeforeGc['PS Perm Gen'].used);
				};
			},
			datasource : function(mbean){
				
				var self = this;
				self.uiVisible = true;
				self.mbean = mbean;
				self.driverClassName = null;
				
				self.url = '';
				self.password = null;
				self.username = null;

				self.closed = false;
				self.initialSize = 0;
				self.maxTotal = 0;
				self.numActive = 0;
				self.defaultAutoCommit = false;
				self.maxIdle = 0;
				self.numIdle = 0;
				self.maxWaitMillis = 0;
				self.maxConnLifetimeMillis = 0;
				self.maxOpenPreparedStatements = 0;
				self.softMinEvictableIdleTimeMillis = 0;
				self.MinEvictableIdleTimeMillis = 0;
				
				self.poolPreparedStatements = false;
				self.testOnCreate = false;
				self.testWhileIdle = false;
				self.testOnBorrow = false;
				
				self.validationQuery = null;
				self.validationQueryTimeout = 0;

				self.numTestsPerEvictionRun = 0;
				self.DefaultReadOnly = null;

				self.removeAbandonedOnBorrow = false;
				self.abandonedUsageTracking = false;
				self.removeAbandonedTimeout = 0;
				self.defaultCatalog = null;
				self.accessToUnderlyingConnectionAllowed = false;
				self.logAbandoned = false;
				self.disconnectionSqlCodesAsArray = [];
				self.logExpiredConnections = true;
				self.fastFailValidation = false;
				self.timeBetweenEvictionRunsMillis = 0;
				self.removeAbandonedOnMaintenance = false;
				self.lifo = true;
				self.connectionInitSqlsAsArray = [];
				self.cacheState = null;
				self.defaultTransactionIsolation = -1;
				
				
				self.populate = function(item){
					
					angular.forEach(item , function(value,key){
						var lowerKey = key.substr(0, 1).toLowerCase() + key.substr(1);
						if(self.hasOwnProperty(lowerKey))
							self[lowerKey]  = value;
					});
					
				};
				
				
				
			}
	};
	
	
	return ResourcePlugin;
	
})(ResourcePlugin || {});


