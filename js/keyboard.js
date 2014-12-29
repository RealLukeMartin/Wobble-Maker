(function(){

// Create audio container
var context = new AudioContext();
var oscillator, gain, lfo;
var qualify = 0;
var freqRange = document.getElementById('freq');
var modFreqRange = document.getElementById('modFreq');
var modRange = document.getElementById('mod');


function playKey(freq) {
	if (qualify === 1) {
		  	off();
	}
	$('#freq, label[for="freq"]').removeClass('hide');
	$('#mod, label[for="mod"], #modFreq, label[for="modFreq"]').removeClass('show');
		// Create OscillatorNode
		oscillator = context.createOscillator(); // Sound Source
		oscillator.type = 'sawtooth'; // Sawtooth Wave
		oscillator.frequency.value = freq;
		oscillator.start(0);

		// Create GainNode
		gain = context.createGain();
		gain.gain.value = 1; // Set gain to full volume

		// Connect the Nodes
		oscillator.connect(gain);
		gain.connect(context.destination);

		//Limit the Oscillator to only one instance
		qualify = 1;
}
//Set frequency value for each piano key
function setKeys(el) {
	var keyboard = [['c',0],['cs',0],['d',0],['ds',0],
	                ['e',0],['f',0],['fs',0],['g',0],
	                ['gs',0],['a',0],['as',0],['b',0]];
	var a = (Math.pow(2, 1/12));
	var f0 = 65.41;
    liFreq = 0;
    for (i=0; i<keyboard.length; i++) { 
		keyboard[i][1] = f0 * Math.pow(a,i);
	    if (el == keyboard[i][0]) {
			console.log(keyboard[i][1]);
			liFreq = keyboard[i][1];
		}
	}
	if (mod == 1) {
		modulate(liFreq);
	}
	else {
		playKey(liFreq);
	}
}
// Stop sound of oscillator
function off() {
	oscillator.stop(0);
	oscillator.disconnect();
    // Zero instances of Oscillator at this point
	qualify = 0;
}

// Modulate with an LFO on the gainNode
function modulate(freq) {
    if (qualify === 1) {
    	off();
    }
    $('#mod, label[for="mod"]').addClass('show');
    oscillator = context.createOscillator();
	lfo = context.createOscillator();
	gain = context.createGain();

    console.log(freq);  
	oscillator.frequency.value = freq;
	oscillator.type = 'sawtooth';
    lfo.frequency.value = parseInt(modRange.value) * 0.08;
	oscillator.connect(gain);
	lfo.connect(gain.gain);
	gain.connect(context.destination);
	oscillator.start(0);
	lfo.start(0);
	qualify = 1;
}
// ---- Event Listeners ---- //
$('li').click(function() {
  targetKey = this.id;
  setKeys(targetKey);
});
$('#modulate').click(function() {
    mod = 1;
	console.log(liFreq);
	
	if ($(this).hasClass('modded')) {
		$(this).removeClass('modded');
		playKey(liFreq);
		mod = 0;
	} else {
	  $(this).addClass('modded');
	  	modulate(liFreq);
	}
});
$('#mod').change(function() {
  modulate(liFreq);
});
$('#offToggle').click(function() {
    off();
});

})();