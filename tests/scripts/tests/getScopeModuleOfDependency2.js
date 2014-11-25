smartLoader.setScope("testScopeModule3",function(scope1,scope2){
	try{
		console.log("testScopeModule3 first script gets scope of dependencies and assign scope for module's callback");
	}catch(e){}
	return {
		"key" : "testScopeModule3",
		"value" : true
	};
});
