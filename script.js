// --- GAME DATA ---

const scenes = {
  start: {
    text: "You wake up in a dark forest. Two paths lie ahead.",
    choices: [
      { text: "Take the left path", next: "leftPath" },
      { text: "Take the right path", next: "rightPath" }
    ]
  },

  leftPath: {
    text: "The left path leads to a quiet river. The water glows faintly.",
    choices: [
      { text: "Drink the water", next: "drinkWater" },
      { text: "Follow the river", next: "followRiver" }
    ]
  },

  rightPath: {
    text: "The right path leads to an abandoned cabin. The door is slightly open.",
    choices: [
      { text: "Enter the cabin", next: "cabin" },
      { text: "Walk past it", next: "pastCabin" }
    ]
  },

  drinkWater: {
    text: "The glowing water gives you strange visions. You feel powerful.",
    choices: [
      { text: "Continue", next: "start" }
    ]
  },

  followRiver: {
    text: "You follow the river until it disappears underground.",
    choices: [
      { text: "Go back", next: "start" }
    ]
  },

  cabin: {
    text: "Inside the cabin, you find a dusty journal and a locked chest.",
    choices: [
      { text: "Read the journal", next: "journal" },
      { text: "Try to open the chest", next: "chest" }
    ]
  },

  pastCabin: {
    text: "You walk past the cabin and vanish into the mist. Your adventure ends.",
    choices: [
      { text: "Restart", next: "start" }
    ]
  },

  journal: {
    text: "The journal speaks of a hidden treasure beneath the forest.",
    choices: [
      { text: "Search for treasure", next: "start" }
    ]
  },

  chest: {
    text: "The chest is locked tight. You need a key.",
    choices: [
      { text: "Go back", next: "cabin" }
    ]
  }
};

// --- ENGINE ---

function showScene(name) {
  const scene = scenes[name];
  document.getElementById("story").textContent = scene.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => showScene(choice.next);
    choicesDiv.appendChild(btn);
  });
}

// Start the game
showScene("start");
