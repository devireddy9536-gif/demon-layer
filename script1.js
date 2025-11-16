const bgm = document.getElementById("bgm");

const commenceBtn = document.getElementById("commenceBtn");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");

const mainImage = document.getElementById("mainImage");
const roomTitle = document.getElementById("roomTitle");
const roomText = document.getElementById("roomText");
const choiceButtons = document.getElementById("choiceButtons");
const exitBtn = document.getElementById("exitBtn");

const wrongOverlay = document.getElementById("wrongOverlay");
const wrongOk = document.getElementById("wrongOk");

const endOverlay = document.getElementById("endOverlay");
const playAgain = document.getElementById("playAgain");

const rooms = [
  {
    title: "Room 1 — The Ember Passage",
    img: "img1.jpg",
    text: "Three doors breathe as cold wind blows.\nWhich path holds your fate?",
    correct: "C",
    choices: [
      { key: "A", label: "A) Burning iron gate" },
      { key: "B", label: "B) Frost-lined doorway" },
      { key: "C", label: "C) Silent glass corridor" }
    ]
  },
  {
    title: "Room 2 — The Glass Crucible",
    img: "img2.jpg",
    text: "Mirrors split the future thin.\nWhich reflection tells truth?",
    correct: "B",
    choices: [
      { key: "A", label: "A) Cracked silver" },
      { key: "B", label: "B) Blackened glass" },
      { key: "C", label: "C) Smoky pane" }
    ]
  },
  {
    title: "Room 3 — The Mainframe Cry",
    img: "img3.jpg",
    text: "Three pulses hum.\nWhich frees the path?",
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
    text: "Echoes carry numbers.\nWhich total breaks the curse?",
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
    text: "You reach the altar.\nChoose your final fate.",
    correct: "A",
    choices: [
      { key: "A", label: "A) Claim the prize and escape" },
      { key: "B", label: "B) Inspect the altar" },
      { key: "C", label: "C) Sit and wait" }
    ]
  }
];

let current = 0;

function startBgm() {
  try {
    bgm.currentTime = 0;
    bgm.play();
  } catch (e) {}
}

commenceBtn.addEventListener("click", () => {
  startBgm();
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  loadRoom(0);
});

function loadRoom(i) {
  current = i;

  const r = rooms[i];
  mainImage.src = r.img;
  roomTitle.textContent = r.title;
  roomText.textContent = r.text;

  choiceButtons.innerHTML = "";

  r.choices.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "choiceBtn";
    btn.textContent = c.label;

    btn.onclick = () => {
      if (c.key === r.correct) {
        if (i === rooms.length - 1) {
          showEnd();
        } else {
          loadRoom(i + 1);
        }
      } else {
        wrongOverlay.classList.remove("hidden");
        bgm.pause();
      }
    };

    choiceButtons.appendChild(btn);
  });
}

wrongOk.addEventListener("click", () => {
  wrongOverlay.classList.add("hidden");
  bgm.play();
});

function showEnd() {
  endOverlay.classList.remove("hidden");
  bgm.pause();
}

playAgain.addEventListener("click", () => {
  endOverlay.classList.add("hidden");
  loadRoom(0);
  bgm.play();
});

exitBtn.addEventListener("click", () => {
  gameContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
  bgm.pause();
  bgm.currentTime = 0;
});
