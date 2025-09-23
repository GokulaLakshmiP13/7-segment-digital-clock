const digitMap = {
  0: ["a", "b", "c", "d", "e", "f"],        
  1: ["b", "c"],
  2: ["a", "b", "d", "e", "g"],
  3: ["a", "b", "c", "d", "g"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "e", "d", "c", "g"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"]
};

function createDigit(elemId) {
  const digitContainer = document.getElementById(elemId);
    if (!digitContainer) {
      console.error(`Element with id ${elemId} not found.`);
      return;
    }           
  const segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    digitContainer.innerHTML = segments.map(seg => 
      `<div id="${elemId}${seg}" class="segment segment-${seg}"></div>`
    ).join('');
}         
            

function clearDigit(digitId) {
  ["a","b","c","d","e","f","g"].forEach(seg => {
  document.getElementById(digitId + seg).classList.remove("on");
  });
}


function setDigit(digitId, number) {
  clearDigit(digitId);
  digitMap[number].forEach(seg => {
  document.getElementById(digitId + seg).classList.add("on");
  });
}


function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  setDigit("h1", parseInt(hh[0]));
  setDigit("h2", parseInt(hh[1]));
  setDigit("m1", parseInt(mm[0]));
  setDigit("m2", parseInt(mm[1]));
  setDigit("s1", parseInt(ss[0]));
  setDigit("s2", parseInt(ss[1]));
}

setInterval(updateClock, 1000);
updateClock();
