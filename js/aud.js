// Create audio container with webkit prefix
var context = new webkitAudioContext();
var oscillator, gain, lfo;
var qualify = 0;
var freqRange = document.getElementById('freq');
var modFreqRange = document.getElementById('modFreq');
var modRange = document.getElementById('mod');

// Create function that routes an OscillatorNode through a GainNode and then to Output
function startOsc() {
	if (qualify === 1) {
	  	off();
    }
    $('#freq, label[for="freq"]').removeClass('hide');
    $('#mod, label[for="mod"], #modFreq, label[for="modFreq"]').removeClass('show');
		// Create OscillatorNode
		oscillator = context.createOscillator(); // Sound Source
		oscillator.type = 0; // Sine Wave
		oscillator.frequency.value = parseInt(freqRange.value) * 8.8;
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

// Stop sound of oscillator
function off() {
	oscillator.stop(0);
	oscillator.disconnect();
    // Zero instances of Oscillator at this point
	qualify = 0;
}

// Modulate with an LFO on the gainNode
function modulate() {
    if (qualify === 1) {
    	off();
    }
    $('#freq, label[for="freq"]').addClass('hide');
    $('#mod, label[for="mod"], #modFreq, label[for="modFreq"]').addClass('show');

    oscillator = context.createOscillator();
	lfo = context.createOscillator();
	gain = context.createGain();

	oscillator.frequency.value = parseInt(modFreqRange.value) * 8.8;
    lfo.frequency.value = parseInt(modRange.value) * 0.08;
	oscillator.connect(gain);
	lfo.connect(gain.gain);
	gain.connect(context.destination);
	oscillator.start(0);
	lfo.start(0);
	qualify = 1;
}


// ---- Event Listeners ---- //

document.getElementById('onToggle').addEventListener('click', function() {
  startOsc();
});
document.getElementById('freq').addEventListener('input', function() {
  startOsc();
});
document.getElementById('offToggle').addEventListener('click', function() {
  off();
});
document.getElementById('modulate').addEventListener('click', function() {
  modulate();
});
modRange.addEventListener('input', function() {
  modulate();
}); 
modFreqRange.addEventListener('input', function() {
  modulate();
}); 