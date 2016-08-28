
class SamplePlayer {

    constructor(keySampleMap) {

        this.loaded = false;

        loadSounds(keySampleMap).then(keyBufferMap => {
            this.loaded = true;
            this.keyBufferMap = keyBufferMap;
        });

        window.addEventListener('keypress', (event) => {
            this.play(event.key);
            console.log(event);
        }, false);

    }

    play(key) {

        if (this.loaded == false) {
            console.log('Error[play]: Buffers are not loaded yet');
            return;
        }

        if (!(key in this.keyBufferMap)) {
            console.log(`Error[play]: ${key} is not a valid key`);
            return;
        }

        let buffer = this.keyBufferMap[key];
        playSound(buffer, time);

    }

}