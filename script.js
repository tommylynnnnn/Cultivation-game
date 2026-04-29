// =========================
// GAME STATE
// =========================
let game = {
  qi: 0,
  qps: 0,
  pills: 0,
  realmIndex: 0,
  insights: 0,

  realms: [
    { name: "Mortal", req: 100, success: 1.00, bonus: 1 },
    { name: "Qi Condensation", req: 500, success: 0.85, bonus: 2 },
    { name: "Foundation Establishment", req: 2000, success: 0.70, bonus: 3 },
    { name: "Core Formation", req: 10000, success: 0.55, bonus: 5 },
    { name: "Nascent Soul", req: 50000, success: 0.40, bonus: 8 },
    { name: "Soul Transformation", req: 200000, success: 0.30, bonus: 12 },
    { name: "Ascension", req: 1000000, success: 0.20, bonus: 20 }
  ],

  techniques: [
    { name: "Basic Breathing", cost: 50, qps: 1, bought: false },
    { name: "Qi Circulation", cost: 200, qps: 5, bought: false },
    { name: "Meridian Expansion", cost: 1000, qps: 20, bought: false },
    { name: "Golden Core Manual", cost: 5000, qps: 100, bought: false }
  ]
};

// =========================
// UI UPDATE
// =========================
function updateUI() {
  document.getElementById("qi").textContent = Math.floor(game.qi);
  document.getElementById("qps").textContent = game.qps;
  document.getElementById("realm").textContent = game.realms[game.realmIndex].name;
  document.getElementById("insights").textContent = game.insights;
  document.getElementById("pills").textContent = game.pills;
}

// =========================
// MEDITATION
// =========================
document.getElementById("meditateBtn").onclick = () => {
  game.qi += 1 + game.insights;
  updateUI();
};

// =========================
// PASSIVE GENERATION
// =========================
setInterval(() => {
  game.qi += game.qps;
  updateUI();
  saveGame();
}, 1000);

// =========================
// TECHNIQUES
// =========================
function loadTechniques() {
  const container = document.getElementById("techniques");
  container.innerHTML = "";

  game.techniques.forEach((t, i) => {
    if (!t.bought) {
      const btn = document.createElement("button");
      btn.textContent = `${t.name} — Cost: ${t.cost} Qi (+${t.qps}/s)`;
      btn.onclick = () => buyTechnique(i);
      container.appendChild(btn);
    }
  });
}

function buyTechnique(i) {
  const t = game.techniques[i];
  if (game.qi >= t.cost) {
    game.qi -= t.cost;
    game.qps += t.qps;
    t.bought = true;
    loadTechniques();
    updateUI();
  }
}

// =========================
// BREAKTHROUGH
// =========================
document.getElementById("breakBtn").onclick = () => {
  const realm = game.realms[game.realmIndex];
  const msg = document.getElementById("breakMsg");

  if (game.qi < realm.req) {
    msg.textContent = "Not enough Qi to attempt breakthrough.";
    return;
  }

  const roll = Math.random();
  if (roll <= realm.success) {
    game.realmIndex++;
    game.qps *= realm.bonus;
    msg.textContent = `Breakthrough successful! You reached ${game.realms[game.realmIndex].name}.`;
  } else {
    msg.textContent = "Breakthrough failed! Qi backlash!";
    game.qi *= 0.5;
  }

  updateUI();
};

// =========================
// ALCHEMY
// =========================
document.getElementById("pillBtn").onclick = () => {
  if (game.qi >= 100) {
    game.qi -= 100;
    game.pills++;
    updateUI();
  }
};

// =========================
// REBIRTH
// =========================
document.getElementById("rebirthBtn").onclick = () => {
  if (game.realmIndex < 2) {
    document.getElementById("rebirthMsg").textContent =
      "You must reach at least Foundation Establishment to reincarnate.";
    return;
  }

  const gained = Math.floor(game.realmIndex * 2 + game.pills);
  game.insights += gained;

  // Reset everything except insights
  game.qi = 0;
  game.qps = 0;
  game.pills = 0;
  game.realmIndex = 0;
  game.techniques.forEach(t => t.bought = false);

  loadTechniques();
  updateUI();

  document.getElementById("rebirthMsg").textContent =
    `You reincarnated and gained ${gained} Dao Insights.`;
};

// =========================
// SAVE SYSTEM
// =========================
function saveGame() {
  localStorage.setItem("cultivationSave", JSON.stringify(game));
}

function loadGame() {
  const data = localStorage.getItem("cultivationSave");
  if (data) {
    game = JSON.parse(data);
  }
  loadTechniques();
  updateUI();
}

loadGame();
