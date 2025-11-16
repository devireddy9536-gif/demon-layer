// --- UI refs
const bgm = document.getElementById('bgm');
const commenceBtn = document.getElementById('commenceBtn');
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');

const mainImage = document.getElementById('mainImage');
const roomTitle = document.getElementById('roomTitle');
const roomText = document.getElementById('roomText');
const choiceButtons = document.getElementById('choiceButtons');
const exitBtn = document.getElementById('exitBtn');

const wrongOverlay = document.getElementById('wrongOverlay');
const wrongOk = document.getElementById('wrongOk');
const wrongMsg = document.getElementById('wrongMsg');

const endOverlay = document.getElementById('endOverlay');
const playAgain = document.getElementById('playAgain');

// --- Rooms (5 rooms). Use 7 images: img6 for backstory, img7 for end decoration
const rooms = [
  {
    title: "Room 1 — The Ember Passage",
    img: "img1.jpg",
    text: `Through embered halls the whisper flows,\nThree doors breathe where cold wind blows.\nWhich path will bear the key you need?`,
    correct: "C",
    choices: [
      { key: "A", label: "A) The burning iron gate" },
      { key: "B", label: "B) The frost-lined doorway" },
      { key: "C", label: "C) The silent glass corridor" }
    ]
  },

  {
    title: "Room 2 — The Glass Crucible",
    img: "img2.jpg",
    text: `Mirrors split the future thin;\nOne reflection holds the medicine.\nWhich shard holds truth, and which is sin?`,
    correct: "B",
    choices: [
      { key: "A", label: "A) The cracked silver" },
      { key: "B", label: "B) The blackened glass" },
      { key: "C", label: "C) The smoky pane" }
    ]
  },

  {
    title: "Room 3 — The Mainframe Cry",
    img: "img3.jpg",
    text: `Wires hum a rhythm deep and old,\nThree pulses beat beneath the gold.\nWhich count will free the faithful fold?`,
    correct: "B",
    choices: [
      { key: "A", label: "A) Three pulses" },
      { key: "B", label: "B) Five pulses" },
      { key: "C", label: "C) Four pulses" }
    ]
  },

  {
    title: "Room 4 — The Howling Vault",
    img: "img4.jpg",
    text: `Wind carries numbers from the tomb,\nEchoes mark the moonlit loom.\nWhich total eases cursed gloom?`,
    correct: "C",
    choices: [
      { key: "A", label: "A) 18" },
      { key: "B", label: "B) 21" },
      { key: "C", label: "C) 24" }
    ]
  },

  {
    title: "Room 5 — The Mountain Altar",
    img: "img5.jpg",
    text: `You climb where iron meets the sky,\nThe gate breathes out, the grey winds die.\nThe lock unbinds — step free and fly.`,
    correct: "A",
    choices: [
      { key: "A", label: "A) Claim the prize and run (Finish)" },
      { key: "B", label: "B) Inspect the altar more" },
      { key: "C", label: "C) Sit and tempt the moon" }
    ]
  }
];

// current index
let current = 0;

// helper: play bgm (user click required for autoplay)
function startBgm(){
  try {
    bgm.currentTime = 0;
    bgm.play().catch(()=>{ /* ignore if blocked */ });
  } catch(e){}
}

// show start -> game
commenceBtn.addEventListener('click', () => {
  startBgm();
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  loadRoom(0);
});

// load a room
function loadRoom(idx){
  if(idx < 0) idx = 0;
  if(idx >= rooms.length){
    // reached after final; show ending overlay
    showEnd();
    return;
  }
  current = idx;
  const r = rooms[idx];
  mainImage.src = r.img;
  roomTitle.textContent = r.title;
  roomText.textContent = r.text;

  // clear choices
  choiceButtons.innerHTML = '';
  choiceButtons.style.textAlign = 'center';

  // build 3 centered buttons
  r.choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choiceBtn';
    btn.textContent = ch.label;
    btn.onclick = () => {
      if(ch.key === r.correct){
        // correct -> next room or end
        const nextIdx = current + 1;
        if(nextIdx >= rooms.length){
          showEnd();
        } else {
          loadRoom(nextIdx);
        }
      } else {
        // wrong -> show overlay
        showWrong("Wrong choice", "The demon hisses — you must choose again.");
      }
    };
    choiceButtons.appendChild(btn);
  });
}

// wrong overlay handlers
function showWrong(title, msg){
  wrongMsg.textContent = msg || 'Wrong choice';
  wrongOverlay.classList.remove('hidden');
  wrongOverlay.setAttribute('aria-hidden', 'false');
  // pause audio slightly for effect
  try{ bgm.pause(); }catch(e){}
}

wrongOk.addEventListener('click', () => {
  wrongOverlay.classList.add('hidden');
  wrongOverlay.setAttribute('aria-hidden', 'true');
  // resume audio
  try{ bgm.play().catch(()=>{}); }catch(e){}
});

// ending
function showEnd(){
  endOverlay.classList.remove('hidden');
  endOverlay.setAttribute('aria-hidden', 'false');
  try{ bgm.pause(); }catch(e){}
}

playAgain.addEventListener('click', () => {
  endOverlay.classList.add('hidden');
  endOverlay.setAttribute('aria-hidden', 'true');
  // reset and resume
  loadRoom(0);
  try{ bgm.play().catch(()=>{}); }catch(e){}
});

// exit button -> return to title
exitBtn.addEventListener('click', () => {
  gameContainer.classList.add('hidden');
  startScreen.classList.remove('hidden');
  try{ bgm.pause(); bgm.currentTime = 0; }catch(e){}
});
