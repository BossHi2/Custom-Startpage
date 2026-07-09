const wave = document.getElementsByClassName("ascii-wave-bg")[0].getElementsByTagName("h1")[0]




const basePattern = "⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅";
        
let waveArray = Array.from(basePattern);
function animateWave() {
    let lastChar = waveArray.pop();
    waveArray.unshift(lastChar);
    
    const currentWaveString = waveArray.join('');
    wave.innerHTML = currentWaveString
    
}
setInterval(animateWave, 500);