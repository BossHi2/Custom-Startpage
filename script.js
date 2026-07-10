const wave = document.getElementsByClassName("ascii-wave-bg")[0].getElementsByTagName("h1")[0]
const codingModeBtn = document.getElementsByClassName("coding-mode")[0]
const trackerText = document.getElementsByClassName("tracker")[0]
const basePattern = "⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅";


var waveArray = Array.from(basePattern);
if(localStorage.getItem("isInCodingMode")){

} else{
    localStorage.setItem("isInCodingMode", false)
}
var startTime = 0
var shouldResetTracker = false
var today = new Date().toDateString()
var waveInterval = null

if(localStorage.getItem("savedDate")){
    
    if(localStorage.getItem("savedDate") !== today){
        shouldResetTracker = true
        localStorage.setItem("savedDate", new Date().toDateString())
    }
} else{
    localStorage.setItem("savedDate", today)
    shouldResetTracker = true
}

if(localStorage.getItem("currCodingTime")){
    if(shouldResetTracker){
        localStorage.setItem("currCodingTime", 0)
    }
    trackerText.innerHTML = (Math.round((localStorage.getItem("currCodingTime")/60) * 10) / 10) + " / 2 hrs";
    wave.style.bottom = -55 + (2.5 * localStorage.getItem("currCodingTime")) + "px"
} else{
    localStorage.setItem("currCodingTime", 0)
}

function animateWave() {
    let lastChar = waveArray.pop();
    waveArray.unshift(lastChar);
    
    const currentWaveString = waveArray.join('');
    wave.innerHTML = currentWaveString
    
}
waveInterval = setInterval(animateWave, 2000);






if(localStorage.getItem("isInCodingMode") == true){
    codingModeBtn.getElementsByTagName("h1")[0].innerHTML = "Exit Coding Mode"
    document.body.style.backgroundColor = "#4A4A4A";
    clearInterval(waveInterval)
    wave.style.color = "#FE7F2D"
} else{
    document.body.style.backgroundColor = "#233D4D";
    codingModeBtn.getElementsByTagName("h1")[0].innerHTML = "Enter Coding Mode"
    waveInterval = setInterval(animateWave, 500);
    wave.style.color = "#EAECF0"
}


function toggleCodingMode(){
    if(localStorage.getItem("isInCodingMode") == true){
        localStorage.setItem("isInCodingMode", false)
    } else{
        localStorage.setItem("isInCodingMode", true)
    }

    if(localStorage.getItem("isInCodingMode") == true){
        codingModeBtn.getElementsByTagName("h1")[0].innerHTML = "Exit Coding Mode"
        document.body.style.backgroundColor = "#4A4A4A";
        window.open('https://codeforces.com', '_blank');
        window.open('https://ide.usaco.guide', '_blank');
        startTime = Date.now()
        clearInterval(waveInterval)
        wave.style.color = "#FE7F2D"
    } else{
        document.body.style.backgroundColor = "#233D4D";
        codingModeBtn.getElementsByTagName("h1")[0].innerHTML = "Enter Coding Mode"
        waveInterval = setInterval(animateWave, 500);
        var minutesPassed = Math.floor((Date.now()-startTime) / 60000); 
        localStorage.setItem("currCodingTime", Number(localStorage.getItem("currCodingTime")) + minutesPassed)
        trackerText.innerHTML = (Math.round((localStorage.getItem("currCodingTime")/60) * 10) / 10) + " / 2 hrs";
        wave.style.bottom = -55 + (2.5 * localStorage.getItem("currCodingTime")) + "px"
        wave.style.color = "#EAECF0"
        startTime = 0
    }
}

const searchParent = document.getElementsByClassName("search-bar")[0]
const searchInput = document.getElementsByClassName("search-input")[0]
const searchForm = document.getElementsByClassName("search-form")[0]

document.addEventListener('keydown', (e) => {
      if (searchParent.classList.contains('active')) return;

      if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Shift' || e.key === "Space") return;

      if (e.key.startsWith('F') && !isNaN(e.key.substring(1))) return;

      if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'Enter') return;

      searchParent.classList.add('active');

      searchInput.value = e.key;

      
      requestAnimationFrame(() => {
        searchInput.focus();
      });
});

document.addEventListener('keydown', (e) => {
    if (!searchParent.classList.contains('active')) return;
    

    if (e.key === 'Escape') {
        closeSearch();
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if(searchInput.value.substring(0,1) != "/"){
        window.location.href="https://www.google.com/search?q=" + encodeURIComponent(searchInput.value);
      } else{
        window.location.href = "https://" + searchInput.value.substring(1).trim().toLowerCase() + ".com"
      }

    setTimeout(closeSearch, 100);
});

function closeSearch() {
    searchParent.classList.remove('active');
    searchInput.value = '';
    searchInput.blur();
}