smartLoader.setScope("testScopeModule3",function(scope1,scope2){
	try{
		console.log("testScopeModule3 second script only getting scope of dependencies but not assigning scope to module");
	}catch(e){}
	// return true;
});
