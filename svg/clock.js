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

const segmentPoints = {
  a: "15,20 25,10 75,10 85,20 75,30 25,30",
  b: "85,20 95,30 95,80 85,90 75,80 75,30",
  c: "85,90 95,100 95,150 85,160 75,150 75,100",
  d: "15,160 25,170 75,170 85,160 75,150 25,150",
  e: "15,90 5,100 5,150 15,160 25,150 25,100",
  f: "15,20 5,30 5,80 15,90 25,80 25,30",
  g: "15,90 25,80 75,80 85,90 75,100 25,100"
};

// --- All of your functions are perfectly fine ---

function createDigit(elemId) {
  const digitContainer = document.getElementById(elemId);
  if (!digitContainer) {
    console.error(`Element with id ${elemId} not found.`);
    return;
  }

  const segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  digitContainer.innerHTML = segments
    .map(seg => `<polygon id="${elemId}${seg}" points="${segmentPoints[seg]}" class="segment"/>`)
    .join('');
}

function clearDigit(digitId) {
  ["a", "b", "c", "d", "e", "f", "g"].forEach(seg => {
    const el = document.getElementById(digitId + seg);
    if (el) el.classList.remove("on");
  });
}

function setDigit(digitId, number) {
  clearDigit(digitId);
  if (digitMap[number]) {
      digitMap[number].forEach(seg => {
        const el = document.getElementById(digitId + seg);
        if (el) el.classList.add("on");
      });
  }
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

// --- The Fix: Wait for the HTML to load before running the clock ---

document.addEventListener('DOMContentLoaded', () => {
  // 1. Define all the digit IDs
  const digitIds = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];

  // 2. Create the segments for each digit (this was missing)
  digitIds.forEach(id => createDigit(id));

  // 3. Now that the digits are created, start the clock
  setInterval(updateClock, 1000);
  updateClock(); // Run once immediately
});
