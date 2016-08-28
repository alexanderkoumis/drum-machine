

class RhythmSample {

  play() {

    loadSounds(this, {
      kick: 'wav/kick.wav',
      snare: 'wav/snare.wav',
      hihat: 'wav/hihat.wav'
    }, () => {
        // We'll start playing the rhythm 100 milliseconds from "now"
      var startTime = context.currentTime + 0.100;
      var tempo = 80; // BPM (beats per minute)
      var eighthNoteTime = (60 / tempo) / 2;

      // Play 2 bars of the following:
      for (var bar = 0; bar < 2; bar++) {
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
      }
    });

  }

}