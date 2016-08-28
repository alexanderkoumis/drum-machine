
// Start off by initializing a new context.
context = new (window.AudioContext || window.webkitAudioContext)();

if (!context.createGain)
  context.createGain = context.createGainNode;
if (!context.createDelay)
  context.createDelay = context.createDelayNode;
if (!context.createScriptProcessor)
  context.createScriptProcessor = context.createJavaScriptNode;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
  window.setTimeout(callback, 1000 / 60);
};
})();


function loadSounds(soundMap) {
    return new Promise((resolve, reject) => {
        let names = [];
        let paths = [];
        let result = {};
        for (let name in soundMap) {
            let path = soundMap[name];
            names.push(name);
            paths.push(path);
        }
        let bufferLoader = new BufferLoader(context, paths, bufferList => {
            for (let i = 0; i < bufferList.length; i++) {
                let buffer = bufferList[i];
                let name = names[i];
                result[name] = buffer;
            }
            resolve(result);
        });
        bufferLoader.load();
    });
}


function playSound(buffer, time) {
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source[source.start ? 'start' : 'noteOn'](0);
}
