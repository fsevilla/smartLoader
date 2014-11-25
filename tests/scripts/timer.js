function Timer(id){
	this.id = id || "unknown";
	this.isRunning = false;
	this.times = [];

	var getTime = function(){
		return new Date().getTime();
	};

	this.getDifference = function(lapse){
		lapse = lapse || this.times.length-1;
		return this.times[lapse] - this.times[0];
	};

	var toSec = function(ms) {
		return Math.round(ms/1000);
	};

	this.start = function(){
		if(!this.isRunning){
			this.isRunning = true;
			this.times.push(getTime());
		}else{
			throw Error("[RuntimeException] Timer cannot start when already running");
		}
	};

	this.save = function(){
		this.times.push(getTime());
	};

	this.stop = function(report) {
		if(this.isRunning){
			this.save();
			this.isRunning = false;
			if(report!==false)
				this.report();
		}else{
			throw Error("[RuntimeException] Timer cannot be stopped if not running");
		}
	};

	this.report = function() {
		var msg;
		// Start time
		msg = "Timer report["+this.id+"]";
		msg += "\nStarted at: "+this.times[0];
		// Checkpoint - saved time
		for (var i = 1; i < this.times.length-1; i++) {
			msg += "\nCheckpoint #"+i+" at "+this.times[i]+": "+this.getDifference(i)+"ms";
		}
		msg += "\nStopped at: "+this.times[this.times.length-1];
		msg += "\nTotal time: "+this.getDifference()+"ms";
		try{
			console.log(msg);
		}catch(e){alert(msg);}
	};


}