//Set frequency value for each piano key
function setKeys(el) {
	var keyboard = [['c',0],['cs',0],['d',0],['ds',0],['e',0],['f',0],['fs',0],['g',0],['gs',0],['a',0],['as',0],['b',0]];
	var a = (Math.pow(2, 1/12));
	var f = 0;

	for (i=0; i<keyboard.length; i++) { 
		keyboard[i][1] = 130.81 * Math.pow(a,i);
	    if (el == keyboard[i][0]) {
			console.log(keyboard[i][1]);
			f = keyboard[i][1];
		}
	}

	if (qualify === 1) {
		  	off();
	}
    $('#freq, label[for="freq"]').removeClass('hide');
    $('#mod, label[for="mod"], #modFreq, label[for="modFreq"]').removeClass('show');
		// Create OscillatorNode
		oscillator = context.createOscillator(); // Sound Source
		oscillator.type = 0; // Sine Wave
		oscillator.frequency.value = f;
		oscillator.start(0);

		// Create GainNode
		gain = context.createGain();
		gain.gain.value = 1; // Set gain to full volume

		// Connect the Nodes
		oscillator.connect(gain);
		gain.connect(context.destination);

		//Limit the Oscillator to only one instance
		qualify = 1;
   
	return keyboard;
}


$('li').click(function() {
  targetKey = this.id;
  setKeys(targetKey)

});