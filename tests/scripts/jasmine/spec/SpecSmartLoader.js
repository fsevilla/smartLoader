// smartLoader initialization testing
describe("smartLoader init methods", function() {

  beforeEach(function() {
    smartLoader.init({
      baseUrl : "scripts",
      // baseElement : "fontsStyle",
      noCache : true
    });
  });

  it("should initialize smartLoader",function(){
    expect(smartLoader.isInit).toBeTruthy();
  });

  it("should change the baseUrl to the scripts folder",function(){
    expect(smartLoader.options.baseUrl).toEqual("scripts");
  });

});

// Loading JavaScript files
describe("Loading individual JS files",function(){
  var isLoaded = false;

  beforeEach(function() {
    smartLoader.init();
    isLoaded = false;
  });

  afterEach(function(){
    isLoaded = false;
  });

  it("should load a local JS file (relative Url)",function(){

    runs(function(){
      smartLoader.loadScript("scripts/tests/localScriptFile.js",function(){
        isLoaded = true;
      });
    });

    waitsFor(function(){
      return isLoaded;
    },"local JavaScript file to be loaded",500);

    runs(function(){
      expect(isLoaded).toBe(true);
    });

  });

  it("should load jQuery min from Google APIs (absolute Url)",function(){

    runs(function(){
      smartLoader.loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",function(){
        isLoaded = true;
      });
    });

    waitsFor(function(){
      return isLoaded;
    },"jQuery min to be loaded",2000);

    runs(function(){
      expect(isLoaded).toBe(true);
    });

  });

});


// Loading CSS files
describe("Loading individual CSS files",function(){
  var isLoaded = false;
  beforeEach(function() {
    isLoaded = false;
    smartLoader.init({
    });
  });

  it("should load a local CSS file (relative Url)",function(){

    runs(function(){
      try{
        console.log("Loading: "+"styles/stress/1/cssForStressTesting1.css");
      }catch(e){}
      smartLoader.loadCSS("styles/stress/1/cssForStressTesting1.css",function(){
        isLoaded = true;
      });
    });

    waitsFor(function(){
      return isLoaded;
    },"local CSS file to be loaded",500);

    runs(function(){
      expect(isLoaded).toBe(true);
    });

  });


});

describe("Handling custom events",function(){


  it("should trigger onLoad event",function(){

    expect(smartLoader.isEventReady("load")).toBeTruthy();
  });

  it("should trigger onUserReady event (not automated. Move your mouse)",function(){
    var isUserReady = false;

    runs(function(){
      smartLoader.onUserReady("userReadyTestModule",function(){
        isUserReady = true;
      });
    });

    waitsFor(function(){
      return isUserReady;
    },"user to interact with the browser",1000);
    runs(function(){
      expect(isUserReady).toBeTruthy();
    });
  });

});

describe("Loading modules",function(){

  beforeEach(function(){
    smartLoader.loadModule("testModule1",function(){
      try{
        console.log("testModule1 loaded!");
      }catch(e){}
    });
  });

  it("should load a module with no dependencies",function(){
    expect(smartLoader.isModuleLoaded("testModule1")).toBeTruthy();
  });

  it("should load a module with a single dependency",function(){
    runs(function(){
      smartLoader.onModuleReady("testModule1","testModule2",function(){
        try{
          console.log("testModule2 loaded!");
        }catch(e){}
      });
    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testModule2");
    },"testModule2 to be loaded",100);

    runs(function(){
      expect(smartLoader.isModuleLoaded("testModule2")).toBeTruthy();
    });

  });

  it("should load a module with two dependencies",function(){
    runs(function(){
      smartLoader.onModuleReady(["testModule1","testModule2"],"testModule3",function(){
        try{
          console.log("testModule3 loaded!");
        }catch(e){}
      });
    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testModule3");
    },"testModule3 to be loaded",100);

    runs(function(){
      expect(smartLoader.isModuleLoaded("testModule3")).toBeTruthy();
    });

  });

  it("should load a module with three dependencies",function(){
    runs(function(){
      smartLoader.onModuleReady(["testModule1","testModule2","testModule3"],"testModule4",function(){
        try{
          console.log("testModule4 loaded!");
        }catch(e){}
      });
    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testModule4");
    },"testModule4 to be loaded",100);

    runs(function(){
      expect(smartLoader.isModuleLoaded("testModule4")).toBeTruthy();
    });

  });

  it("should load a module with ten dependencies",function(){
    runs(function(){
      //Load 6 remaining modules
      for (var i = 0; i < 6; i++) {
        var moduleName = "testModule"+(i+5);
        smartLoader.setScope(moduleName,{
          "name" : moduleName
        });

        smartLoader.onModuleReady("testModule"+(i+4),moduleName,function(module){
          try{
            console.log(module.name+" loaded!");
          }catch(e){}
        });
      }

      var dependencies = ["testModule1","testModule2","testModule3","testModule4","testModule5","testModule6","testModule7","testModule8","testModule9","testModule10"];

      smartLoader.onModuleReady(dependencies,"testModule11",function(){
        try{
          console.log("testModule11 loaded!");
        }catch(e){}
      });


    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testModule11");
    },"testModule11 to be loaded",1000);

    runs(function(){
      expect(smartLoader.isModuleLoaded("testModule11")).toBeTruthy();
    });

  });

});

describe("setting scope for modules",function(){
  beforeEach(function() {
    smartLoader.init({
      baseUrl : ""
    });
  });

  it("should send scoped param to module callback function",function(){
    smartLoader.setScope("testScopeModule1",function(){
        return true;
    });

    var flag = false;
    smartLoader.loadModule("testScopeModule1",function(scope){
      flag = scope;
    });

    expect(flag).toBeTruthy();
  });

  it("should detect scope of dependencies when calling setScope",function(){
    var flag = false;
    //Load module with a JS that calls setScope 
    runs(function(){
      smartLoader.loadModule("testScopeModule2",{
        "scripts" : "tests/getScopeModuleOfDependency.js",
        "dependency" : "testScopeModule1",
        "onComplete" : function(myScope){
          flag = myScope.value;
        }
      });
    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testScopeModule2");
    },"testScopeModule2 to be loaded",2000);

    runs(function(){
      expect(flag).toBeTruthy();
    });
  });

  it("should save scope of function only when return a value",function(){
    var returnedScope,
        expectedScope = {
          "key" : "testScopeModule3",
          "value" : true
        };
    //Load module with a JS that calls setScope 
    runs(function(){
      smartLoader.loadModule("testScopeModule3",{
        "scripts" : ["tests/getScopeModuleOfDependency2.js","tests/getScopeModuleOfDependency3.js"],
        "dependency" : ["testScopeModule1","testScopeModule2"],
        "async" : false,
        "onComplete" : function(myScope){
          returnedScope = myScope;
        }
      });
    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("testScopeModule3");
    },"testScopeModule3 to be loaded",2000);

    runs(function(){
      expect(expectedScope).toEqual(returnedScope);
    });
  });

  it("tries auto detect module from JS in execution to send param to callback function",function(){

    var returnedParams = [];
    runs(function(){
      //Load 3 scripts as 3 modules which setScope for each
      for (var i = 0; i < 3; i++) {
        smartLoader.loadModule("autoDetectScopeModule"+i,{
          "scripts" : "tests/setScopeModule"+(i+1)+".js",
          "onComplete" : function(myScope){
            if(myScope && returnedParams.indexOf(myScope.name)===-1)
              returnedParams.push(myScope.name);
          }
        });
      }
    });

    waitsFor(function(){
      //Return true when the 3 modules are loaded
      return (smartLoader.isModuleLoaded("autoDetectScopeModule0") && smartLoader.isModuleLoaded("autoDetectScopeModule1") && smartLoader.isModuleLoaded("autoDetectScopeModule2"));
    },"autoDetect modules to load",1000);

    //Set expectation for each module
    runs(function(){
      expect(returnedParams.length).toBe(3);
    });
  });

  it("should pass a parameter for each dependency including current module",function(){

    var dependencyParams = {}; //Obj to be tested

    //Set scope for each module and load them
    runs(function(){
      smartLoader.setScope("dependencyScopeModule1",{ id : 1 });
      smartLoader.setScope("dependencyScopeModule2",{ id : 2 });
      smartLoader.setScope("dependencyScopeModule3",{ id : 3 });
      smartLoader.setScope("dependencyScopeModule4",{ id : 4 });


      smartLoader.onModuleReady(["dependencyScopeModule1","dependencyScopeModule2","dependencyScopeModule3"],"dependencyScopeModule4",function(d4,d1,d2,d3){
        dependencyParams = {
          'self' : d4.id,
          'first' : d1.id,
          'second' : d2.id,
          'last' : d3.id
        };
        try{
          console.log("dependencyScopeModule4 loaded");
        }catch(e){}
      });

      smartLoader.loadModule("dependencyScopeModule1",function(){
        try{
          console.log("dependencyScopeModule1 loaded");
        }catch(e){}
      });

      smartLoader.onModuleReady("dependencyScopeModule1","dependencyScopeModule2",function(){
        try{
          console.log("dependencyScopeModule2 loaded");
        }catch(e){}
      });

      smartLoader.onModuleReady(["dependencyScopeModule1","dependencyScopeModule2"],"dependencyScopeModule3",function(){
        try{
          console.log("dependencyScopeModule3 loaded");
        }catch(e){}
      });

    });

    waitsFor(function(){
      return smartLoader.isModuleLoaded("dependencyScopeModule4");
    },"dependencyScopeModule4 to be loaded",500);

    runs(function(){
      var expectedParams = {
        'self' : 4,
        'first' : 1,
        'second' : 2,
        'last' : 3
      };

      expect(dependencyParams).toEqual(expectedParams);
    });

  });

});
