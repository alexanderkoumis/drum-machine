// Enables button toggle behavior
$('.ui.button.toggle').state();

let recording = false;
let playing = false;

let samplePlayer = new SamplePlayer({
    'y': 'wav/hihat.wav',
    'g': 'wav/kick.wav',
    'h': 'wav/snare.wav'
});

let tempo = document.getElementById('tempo').value;
let sequencer = new Sequencer(tempo, {
    0: 'wav/hihat.wav',
    1: 'wav/kick.wav',
    2: 'wav/snare.wav',
    3: 'wav/snare.wav'
});

function updateControlDisplay() {
    let controlStatus = playing ? 'Playing' : 'Paused';
    controlStatus += recording ? '/Recording' : '/Not recording';
    document.getElementById('control-status').innerHTML = controlStatus;
}

function controls(button) {
    switch (button) {
        case 'play': playing = true; break;
        case 'pause': playing = false; break
        case 'record': recording =! recording; break
    }

    sequencer.playing = playing;
    if (playing) {
        sequencer.play();
    }
    updateControlDisplay();
}



updateControlDisplay();

sequencer.play();

