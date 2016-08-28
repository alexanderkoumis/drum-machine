class Sequencer {

    constructor(tempo, rowSampleMap) {

        this.loaded = false;
        this.playing = false;
        this.currentCol = 0;
        this.tempo = 0;
        this.cellStates = [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ];

        this.setTempo(tempo);

        loadSounds(rowSampleMap).then(rowBufferMap => {
            this.loaded = true;
            this.rowBufferMap = rowBufferMap;
        });

    }

    toggleCell(id) {
        let idSplit = id.split('-');
        let row = parseInt(idSplit[0]);
        let col = parseInt(idSplit[1]);
        this.cellStates[row][col] =! this.cellStates[row][col];
        console.log(this.cellStates[row][col]);
    }

    setTempo(tempo) {
        this.tempo = typeof tempo === 'string' ? parseInt(tempo) : tempo;
    }

    play() {

        return new Promise((resolve, reject) => {

            let startTime = context.currentTime;
            let tempo = this.tempo; // BPM (beats per minute)
            let eighthNoteTime = (60 / tempo) / 2;

            let bar = 0;

            while (true) {
                console.log('cool');
                if (this.loading) {
                    console.log(bar);
                    var time = startTime + bar * 8 * eighthNoteTime;
                    // Play the bass (kick) drum on beats 1, 5
                    playSound(this.kick, time);
                    playSound(this.kick, time + 4 * eighthNoteTime);

                    // Play the snare drum on beats 3, 7
                    playSound(this.snare, time + 2 * eighthNoteTime);
                    playSound(this.snare, time + 6 * eighthNoteTime);

                    // Play the hi-hat every eighthh note.
                    for (var i = 0; i < 8; ++i) {
                      playSound(this.hihat, time + i * eighthNoteTime);
                    }

                    bar++;
                }
            }

        });
    }
    
}