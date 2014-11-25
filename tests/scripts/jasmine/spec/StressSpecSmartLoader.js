// Stress test smartLoader

/*
 * Modules as function
 * with dependencies
 * No files
 */

if(stressTest.group=="modules-as-function"){ //Modules as function testing

describe("Dependency modules-as-function",function(){

  beforeEach(function(){
    smartLoader.init({
      baseUrl: ""
    });

    smartLoader.loadModule("testModule1",{
      "scripts" : "tests/localScriptFile.js",
      onStart: function(){
        console.log(smartLoader.options.baseUrl);
      },
      "onComplete" : function(){
        try{
          console.log("Loaded dependency module[testModule1]");
        }catch(e){}
      }
    });
  });


  if(stressTest.test=="singleDependency"){// Load 10,000 modules single dependency
    it("should load 10,000 modules as function w/ single dependency",function(){
      var numberOfModules = 10000;
      var myTimer = new Timer(numberOfModules+"FnMod1Dep");

      runs(function(){
        //Suscribe 10000 modules to a single dependency
       for (var i = 1; i <= numberOfModules; i++) {
        var modName = "FnModule1Dep"+i+"of"+numberOfModules;
        smartLoader.setScope(modName,modName);
        smartLoader.onModuleReady("testSubModule1",modName,function(moduleName){
          if(moduleName=="FnModule1Dep"+numberOfModules+"of"+numberOfModules){
            try{
              console.log("Loaded "+numberOfModules+" modules as function with single dependency");
            }catch(e){}
            myTimer.stop(false);
            getTimerResult(myTimer);
            return;
          }
        });
       }

      });

      waitsFor(function(){ // Waits for the 10000th module to be suscribed to start timer
        var onQueue = smartLoader.isModuleOnQueue("FnModule1Dep"+numberOfModules+"of"+numberOfModules);
        if(onQueue){
            try{
              console.log("FnModule1Dep"+numberOfModules+"of"+numberOfModules + " has been suscribed");
            }catch(e){}
        }
        return onQueue;
      },"FnModule1Dep"+numberOfModules+"of"+numberOfModules + " to be suscribed",1000);

      runs(function(){
        //Load dependency module to trigger the loadModule events
        smartLoader.loadModule("testSubModule1",{
          "dependency" : "testModule1", //to make sure this is loaded after testModule1
          onStart : function(){
            myTimer.start(); //Start timer when module starts loading
          }
        });
      });

    });
  }


 if(stressTest.test=="twoDependencies"){// Load 10,000 modules with 2 dependencies
  it("should load 10,000 modules as function w/ two dependencies",function(){
    var numberOfModules = 10000;
    var myTimer = new Timer(numberOfModules+"FnMod2Dep");

    runs(function(){
      //Suscribe 10000 modules to 2 dependencies
     for (var i = 2; i <= numberOfModules; i++) {
      var modName = "FnModule2Dep"+i+"of"+numberOfModules;
      smartLoader.setScope(modName,modName);
      smartLoader.onModuleReady(["testModule1","testSubModule2"],modName,function(moduleName){
        if(moduleName=="FnModule2Dep"+numberOfModules+"of"+numberOfModules){
          try{
            console.log("Loaded "+numberOfModules+" modules as function with 2 dependencies");
          }catch(e){}
          myTimer.stop(false);
          getTimerResult(myTimer);
          return;
        }
      });

     }
    });

    waitsFor(function(){ // Waits for the 10000th module to be suscribed to start timer
      var onQueue = smartLoader.isModuleOnQueue("FnModule2Dep"+numberOfModules+"of"+numberOfModules);
      if(onQueue){
          try{
            console.log("FnModule2Dep"+numberOfModules+"of"+numberOfModules + " has been suscribed");
          }catch(e){}
      }
      return onQueue;
    },"FnModule2Dep"+numberOfModules+"of"+numberOfModules + " to be suscribed",1000);

    runs(function(){
      //Load dependency module to trigger the loadModule events
      smartLoader.loadModule("testSubModule2",{
        "dependency" : "testModule1", //to make sure this is loaded after testModule1
        onStart : function(){
          myTimer.start(); //Start timer when module starts loading
        }
      });
    });

  });
}

if(stressTest.test=="threeDependencies"){// Load 10,000 modules with 3 dependencies
  it("should load 10,000 modules as function w/ three dependencies",function(){
    var numberOfModules = 10000;
    var myTimer = new Timer(numberOfModules+"FnMod3Dep");

    runs(function(){
      //Suscribe 10000 modules to 3 dependencies
     for (var i = 3; i <= numberOfModules; i++) {
      var modName = "FnModule3Dep"+i+"of"+numberOfModules;
      smartLoader.setScope(modName,modName);
      smartLoader.onModuleReady(["testModule1","testSubModule2","testSubModule3"],modName,function(moduleName){
        if(moduleName=="FnModule3Dep"+numberOfModules+"of"+numberOfModules){
          try{
            console.log("Loaded "+numberOfModules+" modules as function with 3 dependencies");
          }catch(e){}
          myTimer.stop(false);
          getTimerResult(myTimer);
          return;
        }
      });

     }
    });

    waitsFor(function(){ // Waits for the 10000th module to be suscribed to start timer
      var onQueue = smartLoader.isModuleOnQueue("FnModule3Dep"+numberOfModules+"of"+numberOfModules);
      if(onQueue){
          try{
            console.log("FnModule3Dep"+numberOfModules+"of"+numberOfModules + " has been suscribed");
          }catch(e){}
      }
      return onQueue;
    },"FnModule3Dep"+numberOfModules+"of"+numberOfModules + " to be suscribed",1000);

    runs(function(){
      //Load dependency module to trigger the loadModule events
      smartLoader.loadModule("testSubModule2",{
        "dependency" : "testModule1", //to make sure this is loaded after testModule1
        onStart : function(){
          // myTimer.start(); //Start timer when module starts loading
        }
      });
      smartLoader.loadModule("testSubModule3",{
        "dependency" : "testModule1", //to make sure this is loaded after testModule1
        onStart : function(){
          myTimer.start(); //Start timer when module starts loading
        }
      });
    });


  });
}

});

}

/*
 * Modules with
 * JavaScript files
 */

if(stressTest.group=="javascript-modules"){ //Modules with JavaScript files only
  describe("Modules with JavaScript files",function(){

   beforeEach(function(){
    window.scriptsCount=0; //Declares scriptsCount for first use
    smartLoader.init({
      "loadFramework" : false,
      "loadHeaderFooter" : false,
      // "baseUrl" : "../scripts",
      "noCache" : false
    });
  });

  afterEach(function(){ //Reset scriptsCount
    scriptsCount = 0;
  });

  if(stressTest.test=="100Modules1Script"){// Load 100 modules single dependency
  it("should load 100 modules with a JavaScript file",function(){
    //Suscribe modules
    // alert(smartLoader.options.baseUrl);
    var modulesToLoad = 100;
    var myTimer = new Timer("100Mod1Script");
    runs(function(){
        myTimer.start();
        for(var i=1;i<=modulesToLoad;i++){
         var moduleName = "1ScriptModule"+i+"of"+modulesToLoad;
          smartLoader.loadModule(moduleName,{
            "scripts" : "tests/stress/1/scriptForStressTesting"+i+".js",
            "timeout" : 5000
          });
        }
    });

    waitsFor(function(){
      if(scriptsCount==modulesToLoad){
        try{
          console.log("Loaded "+scriptsCount+" JavaScript files");
        }catch(e){}
        myTimer.stop(false);
        getTimerResult(myTimer);
      }
      return scriptsCount==modulesToLoad;
    },modulesToLoad+" modules with 1 script to load",10000);

    runs(function(){
      expect(scriptsCount).toEqual(modulesToLoad);
    });

  });


  }

   if(stressTest.test=="1000Modules1Script"){// Load 1000 modules single dependency
  it("should load 1000 modules with a JavaScript file",function(){
    //Suscribe modules
    // alert(smartLoader.options.baseUrl);
    var modulesToLoad = 1000;
    var myTimer = new Timer("1000Mod1Script");
    runs(function(){
        myTimer.start();
        for(var i=1;i<=modulesToLoad;i++){
         var moduleName = "1ScriptModule"+i+"of"+modulesToLoad;
          smartLoader.loadModule(moduleName,{
            "scripts" : "tests/stress/"+i+"/scriptForStressTesting1.js",
            "timeout" : 10000
          });
        }
    });

    waitsFor(function(){
      if(scriptsCount==modulesToLoad){
        try{
          console.log("Loaded "+scriptsCount+" JavaScript files");
        }catch(e){}
        myTimer.stop(false);
        getTimerResult(myTimer);
      }
      return scriptsCount==modulesToLoad;
    },modulesToLoad+" modules with 1 script to load",20000);

    runs(function(){
      expect(scriptsCount).toEqual(modulesToLoad);
    });

  });


  }

  });
}

/*
 * Modules with
 * CSS files
 */

if(stressTest.group=="css-modules"){ //Modules with JavaScript files only
  describe("Modules with CSS files",function(){

   beforeEach(function(){
    smartLoader.init({
      "loadFramework" : false,
      "loadHeaderFooter" : false,
      "baseUrl" : "../styles",
      "noCache" : false
    });
  });

  if(stressTest.test=="30Modules1CSS"){// Load 100 modules with 1 CSS
    it("should load 30 modules with a CSS file",function(){
      //Suscribe modules
      // alert(smartLoader.options.baseUrl);
      var modulesToLoad = 30;
      var myTimer = new Timer("100Mod1CSS");
      var allLoaded = false;
      runs(function(){
          myTimer.start();
          for(var i=1;i<=modulesToLoad;i++){
           var moduleName = "1CSSModule"+i+"of"+modulesToLoad;
            smartLoader.loadModule(moduleName,{
              "styles" : "stress/1/cssForStressTesting"+i+".css",
              "timeout" : 5000
            });
          }
      });

      waitsFor(function(){
        allLoaded = smartLoader.isModuleLoaded("1CSSModule"+modulesToLoad+"of"+modulesToLoad);
        if(allLoaded){
          try{
            console.log("Loaded "+modulesToLoad+" CSS files");
          }catch(e){}
          myTimer.stop(false);
          getTimerResult(myTimer);
        }
        return allLoaded;
      },modulesToLoad+" modules with 1 css to load",10000);

      runs(function(){
        expect(allLoaded).toBeTruthy();
      });

    });

  }

  if(stressTest.test=="100Modules1CSS"){// Load 100 modules with 1 CSS
    it("should load 100 modules with a CSS file",function(){
      //Suscribe modules
      // alert(smartLoader.options.baseUrl);
      var modulesToLoad = 100;
      var myTimer = new Timer("100Mod1CSS");
      var allLoaded = false;
      runs(function(){
          myTimer.start();
          for(var i=1;i<=modulesToLoad;i++){
           var moduleName = "1CSSModule"+i+"of"+modulesToLoad;
            smartLoader.loadModule(moduleName,{
              "styles" : "stress/1/cssForStressTesting"+i+".css",
              "timeout" : 5000
            });
          }
      });

      waitsFor(function(){
        allLoaded = smartLoader.isModuleLoaded("1CSSModule"+modulesToLoad+"of"+modulesToLoad);
        if(allLoaded){
          try{
            console.log("Loaded "+modulesToLoad+" CSS files");
          }catch(e){}
          myTimer.stop(false);
          getTimerResult(myTimer);
        }
        return allLoaded;
      },modulesToLoad+" modules with 1 css to load",10000);

      runs(function(){
        expect(allLoaded).toBeTruthy();
      });

    });

  }

   if(stressTest.test=="1000Modules1CSS"){// Load 1000 modules single dependency
  it("should load 1000 modules with a CSS file",function(){
    //Suscribe modules
    // alert(smartLoader.options.baseUrl);
    var modulesToLoad = 200;
      var myTimer = new Timer("100Mod1CSS");
      var allLoaded = false;
      runs(function(){
          myTimer.start();
          for(var i=1;i<=modulesToLoad;i++){
           var moduleName = "1CSSModule"+i+"of"+modulesToLoad;
            smartLoader.loadModule(moduleName,{
              "styles" : "stress/"+i+"/cssForStressTesting1.css",
              "timeout" : 50000
            });
          }
      });

      waitsFor(function(){
        allLoaded = smartLoader.isModuleLoaded("1CSSModule"+modulesToLoad+"of"+modulesToLoad);
        if(allLoaded){
          try{
            console.log("Loaded "+modulesToLoad+" CSS files");
          }catch(e){}
          myTimer.stop(false);
          getTimerResult(myTimer);
        }
        return allLoaded;
      },modulesToLoad+" modules with 1 css to load",20000);

      runs(function(){
        expect(allLoaded).toBeTruthy();
      });

  });


  }

  });
}