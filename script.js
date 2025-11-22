const crate = document.getElementById("crate");
const rollButton = document.getElementById("rollButton");
const emojiDisplay = document.getElementById("emojiDisplay");
const rarityDisplay = document.getElementById("rarityDisplay");
const rollCountDisplay = document.getElementById("rollCount");

const coinAmountEl = document.getElementById("coinAmount");
const bestEmojiIconEl = document.getElementById("bestEmojiIcon");
const bestEmojiIncomeEl = document.getElementById("bestEmojiIncome");
const crateButtons = document.querySelectorAll(".crate-option");
const inventoryListEl = document.getElementById("inventoryList");
const doubleCoinsButton = document.getElementById("doubleCoinsButton");
const resetCoinsButton = document.getElementById("resetCoinsButton");

// Mutation elements
const mutationStatusEl = document.getElementById("mutationStatus");
const mutSparkBtn = document.getElementById("mutSpark");
const mutRainBtn = document.getElementById("mutRain");
const mutStormBtn = document.getElementById("mutStorm");
const mutPrismBtn = document.getElementById("mutPrism");
const mutGreedBtn = document.getElementById("mutGreed");
const mutTimeBtn = document.getElementById("mutTime");
const mutOmegaBtn = document.getElementById("mutOmega");
const mutVoidBtn = document.getElementById("mutVoid");
const mutQuantumBtn = document.getElementById("mutQuantum");
const mutAscendBtn = document.getElementById("mutAscend");
const mutNovaBtn = document.getElementById("mutNova");
const mutRiftBtn = document.getElementById("mutRift");

// Admin elements
const adminCoins1kBtn = document.getElementById("adminCoins1k");
const adminCoins10kBtn = document.getElementById("adminCoins10k");
const adminCoins100kBtn = document.getElementById("adminCoins100k");
const adminCoins1mBtn = document.getElementById("adminCoins1m");
const adminCoins100mBtn = document.getElementById("adminCoins100m");
const adminCoins10bBtn = document.getElementById("adminCoins10b");
const adminEmojiSelect = document.getElementById("adminEmojiSelect");
const adminEmojiCountInput = document.getElementById("adminEmojiCount");
const adminGiveEmojiButton = document.getElementById("adminGiveEmojiButton");

// Dealer (trading) elements
const tradeTierSelect = document.getElementById("tradeTierSelect");
const tradeButton = document.getElementById("tradeButton");
const dealerStatusEl = document.getElementById("dealerStatus");

// Rebirth elements
const rebirthTokensEl = document.getElementById("rebirthTokens");
const rebirthCountEl = document.getElementById("rebirthCount");
const rebirthButton = document.getElementById("rebirthButton");
const rebirthStatusEl = document.getElementById("rebirthStatus");
const buyRebirthDivineButton = document.getElementById("buyRebirthDivineButton");
const buyRebirthOmegaButton = document.getElementById("buyRebirthOmegaButton");

let rollCount = 0;
const SAVE_KEY = "emojiCrateIdleSave";
const REBIRTH_BASE_COST = 1_000_000_000;

function getCurrentRebirthCost() {
  return REBIRTH_BASE_COST * Math.pow(2, rebirthCount);
}

/* ========= EMOJIS =========
   rarityIndex:
   0  = Common
   1  = Uncommon
   2  = Rare
   3  = Epic
   4  = Legendary
   5  = Mythic (75/sec)
   7  = Divine (300/sec)
   8  = Sacred & Holiday (180–5000/sec)
   9  = Prismatic (1000/sec)
   10 = Feast/Turkey Limited (250–2000/sec)
   11 = Evolved (7500/sec)
   12 = Omega (15,000/sec)
   13 = Secret (111,111/sec)
*/

const emojiDefs = {
  // COMMON (1/sec)
  smile: {
    id: "smile",
    emoji: "😃",
    label: "Common",
    rarityIndex: 0,
    incomePerSecond: 1,
    rarityClass: "rarity-common",
  },
  grin: {
    id: "grin",
    emoji: "😁",
    label: "Common",
    rarityIndex: 0,
    incomePerSecond: 1,
    rarityClass: "rarity-common",
  },
  blush: {
    id: "blush",
    emoji: "😊",
    label: "Common",
    rarityIndex: 0,
    incomePerSecond: 1,
    rarityClass: "rarity-common",
  },

  // UNCOMMON (2/sec)
  happy: {
    id: "happy",
    emoji: "🙂",
    label: "Uncommon",
    rarityIndex: 1,
    incomePerSecond: 2,
    rarityClass: "rarity-uncommon",
  },
  wink: {
    id: "wink",
    emoji: "😉",
    label: "Uncommon",
    rarityIndex: 1,
    incomePerSecond: 2,
    rarityClass: "rarity-uncommon",
  },
  tongue: {
    id: "tongue",
    emoji: "😛",
    label: "Uncommon",
    rarityIndex: 1,
    incomePerSecond: 2,
    rarityClass: "rarity-uncommon",
  },

  // RARE (5/sec)
  cool: {
    id: "cool",
    emoji: "😎",
    label: "Rare",
    rarityIndex: 2,
    incomePerSecond: 5,
    rarityClass: "rarity-rare",
  },
  cowboy: {
    id: "cowboy",
    emoji: "🤠",
    label: "Rare",
    rarityIndex: 2,
    incomePerSecond: 5,
    rarityClass: "rarity-rare",
  },
  smirk: {
    id: "smirk",
    emoji: "😏",
    label: "Rare",
    rarityIndex: 2,
    incomePerSecond: 5,
    rarityClass: "rarity-rare",
  },

  // EPIC (15/sec)
  mind: {
    id: "mind",
    emoji: "🤯",
    label: "Epic",
    rarityIndex: 3,
    incomePerSecond: 15,
    rarityClass: "rarity-epic",
  },
  robot: {
    id: "robot",
    emoji: "🤖",
    label: "Epic",
    rarityIndex: 3,
    incomePerSecond: 15,
    rarityClass: "rarity-epic",
  },
  angel: {
    id: "angel",
    emoji: "😇",
    label: "Epic",
    rarityIndex: 3,
    incomePerSecond: 15,
    rarityClass: "rarity-epic",
  },

  // LEGENDARY (40/sec)
  dragon: {
    id: "dragon",
    emoji: "🐉",
    label: "Legendary",
    rarityIndex: 4,
    incomePerSecond: 40,
    rarityClass: "rarity-secret",
  },
  phoenix: {
    id: "phoenix",
    emoji: "🐲",
    label: "Legendary",
    rarityIndex: 4,
    incomePerSecond: 40,
    rarityClass: "rarity-secret",
  },
  unicorn: {
    id: "unicorn",
    emoji: "🦄",
    label: "Legendary",
    rarityIndex: 4,
    incomePerSecond: 40,
    rarityClass: "rarity-secret",
  },

  // MYTHIC (75/sec)
  star: {
    id: "star",
    emoji: "🌟",
    label: "Mythic",
    rarityIndex: 5,
    incomePerSecond: 75,
    rarityClass: "rarity-secret",
  },
  crystal: {
    id: "crystal",
    emoji: "🔮",
    label: "Mythic",
    rarityIndex: 5,
    incomePerSecond: 75,
    rarityClass: "rarity-secret",
  },
  nazar: {
    id: "nazar",
    emoji: "🧿",
    label: "Mythic",
    rarityIndex: 5,
    incomePerSecond: 75,
    rarityClass: "rarity-secret",
  },

  // DIVINE (300/sec)
  cash: {
    id: "cash",
    emoji: "💸",
    label: "Divine",
    rarityIndex: 7,
    incomePerSecond: 300,
    rarityClass: "rarity-divine",
  },
  dice: {
    id: "dice",
    emoji: "🎲",
    label: "Divine",
    rarityIndex: 7,
    incomePerSecond: 300,
    rarityClass: "rarity-divine",
  },
  paint: {
    id: "paint",
    emoji: "🎨",
    label: "Divine",
    rarityIndex: 7,
    incomePerSecond: 300,
    rarityClass: "rarity-divine",
  },

  // SACRED (400/sec)
  sacred: {
    id: "sacred",
    emoji: "☠️",
    label: "Sacred",
    rarityIndex: 8,
    incomePerSecond: 400,
    rarityClass: "rarity-sacred",
  },
  bottle: {
    id: "bottle",
    emoji: "🍾",
    label: "Sacred",
    rarityIndex: 8,
    incomePerSecond: 400,
    rarityClass: "rarity-sacred",
  },

  // PRISMATIC (1000/sec)
  jelly: {
    id: "jelly",
    emoji: "🪼",
    label: "Prismatic",
    rarityIndex: 9,
    incomePerSecond: 1000,
    rarityClass: "rarity-prismatic",
  },
  zombie: {
    id: "zombie",
    emoji: "🧟",
    label: "Prismatic",
    rarityIndex: 9,
    incomePerSecond: 1000,
    rarityClass: "rarity-prismatic",
  },

  // HOLIDAY & FEAST
  tree: {
    id: "tree",
    emoji: "🎄",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 180,
    rarityClass: "rarity-christmas",
  },
  snow: {
    id: "snow",
    emoji: "❄️",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 180,
    rarityClass: "rarity-christmas",
  },
  sock: {
    id: "sock",
    emoji: "🧦",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 180,
    rarityClass: "rarity-christmas",
  },
  bell: {
    id: "bell",
    emoji: "🔔",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 190,
    rarityClass: "rarity-christmas",
  },
  gift: {
    id: "gift",
    emoji: "🎁",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 200,
    rarityClass: "rarity-christmas",
  },
  reindeer: {
    id: "reindeer",
    emoji: "🦌",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 220,
    rarityClass: "rarity-christmas",
  },
  turkeyLeg: {
    id: "turkeyLeg",
    emoji: "🍗",
    label: "Feast",
    rarityIndex: 10,
    incomePerSecond: 250,
    rarityClass: "rarity-turkey",
  },
  turkey: {
    id: "turkey",
    emoji: "🦃",
    label: "Feast",
    rarityIndex: 10,
    incomePerSecond: 2000,
    rarityClass: "rarity-turkey",
  },
  santa: {
    id: "santa",
    emoji: "🎅",
    label: "Holiday",
    rarityIndex: 8,
    incomePerSecond: 5000,
    rarityClass: "rarity-christmas",
  },

  // EVOLVED (7,500/sec)
  evolved: {
    id: "evolved",
    emoji: "🧬",
    label: "Evolved",
    rarityIndex: 11,
    incomePerSecond: 7500,
    rarityClass: "rarity-evolved",
  },

  // OMEGA (15,000/sec)
  omega: {
    id: "omega",
    emoji: "💰",
    label: "Omega",
    rarityIndex: 12,
    incomePerSecond: 15000,
    rarityClass: "rarity-omega",
  },
  omegaTemple: {
    id: "omegaTemple",
    emoji: "🏯",
    label: "Omega",
    rarityIndex: 12,
    incomePerSecond: 22000,
    rarityClass: "rarity-omega",
  },

  // SECRET (111,111/sec)
  trophy: {
    id: "trophy",
    emoji: "🏆",
    label: "Secret",
    rarityIndex: 13,
    incomePerSecond: 111111,
    rarityClass: "rarity-secret",
  },
};

/* ========= CRATES ========= */

const crates = {
  basic: {
    name: "Basic Crate",
    cost: 0,
    pool: [
      { emojiId: "smile", chance: 0.2 },
      { emojiId: "grin", chance: 0.2 },
      { emojiId: "blush", chance: 0.16 },
      { emojiId: "happy", chance: 0.15 },
      { emojiId: "wink", chance: 0.1 },
      { emojiId: "tongue", chance: 0.1 },
      { emojiId: "cool", chance: 0.05 },
      { emojiId: "cowboy", chance: 0.03 },
      { emojiId: "smirk", chance: 0.02 },
    ],
  },
  advanced: {
    name: "Advanced Crate",
    cost: 500,
    pool: [
      { emojiId: "happy", chance: 0.23 },
      { emojiId: "wink", chance: 0.2 },
      { emojiId: "tongue", chance: 0.18 },
      { emojiId: "cool", chance: 0.1 },
      { emojiId: "cowboy", chance: 0.08 },
      { emojiId: "smirk", chance: 0.06 },
      { emojiId: "mind", chance: 0.05 },
      { emojiId: "robot", chance: 0.04 },
      { emojiId: "angel", chance: 0.025 },
      { emojiId: "dragon", chance: 0.02 },
      { emojiId: "star", chance: 0.015 },
    ],
  },
  elite: {
    name: "Elite Crate",
    cost: 5000,
    pool: [
      { emojiId: "cool", chance: 0.14 },
      { emojiId: "cowboy", chance: 0.14 },
      { emojiId: "smirk", chance: 0.12 },
      { emojiId: "mind", chance: 0.08 },
      { emojiId: "robot", chance: 0.07 },
      { emojiId: "angel", chance: 0.05 },
      { emojiId: "dragon", chance: 0.05 },
      { emojiId: "phoenix", chance: 0.04 },
      { emojiId: "unicorn", chance: 0.04 },
      { emojiId: "star", chance: 0.04 },
      { emojiId: "crystal", chance: 0.03 },
      { emojiId: "nazar", chance: 0.03 },
      { emojiId: "turkeyLeg", chance: 0.04 },
      { emojiId: "cash", chance: 0.02 },
      { emojiId: "dice", chance: 0.015 },
      { emojiId: "jelly", chance: 0.01 },
      { emojiId: "zombie", chance: 0.01 },
      { emojiId: "turkey", chance: 0.004 },
      { emojiId: "evolved", chance: 0.004 },
      { emojiId: "sacred", chance: 0.002 },
      { emojiId: "bottle", chance: 0.002 },
      { emojiId: "omega", chance: 0.002 },
    ],
  },
  omega: {
    name: "Omega Crate",
    cost: 50000,
    pool: [
      { emojiId: "mind", chance: 0.05 },
      { emojiId: "robot", chance: 0.04 },
      { emojiId: "angel", chance: 0.03 },
      { emojiId: "dragon", chance: 0.1 },
      { emojiId: "phoenix", chance: 0.08 },
      { emojiId: "unicorn", chance: 0.07 },
      { emojiId: "star", chance: 0.1 },
      { emojiId: "crystal", chance: 0.08 },
      { emojiId: "nazar", chance: 0.07 },
      { emojiId: "cash", chance: 0.07 },
      { emojiId: "dice", chance: 0.06 },
      { emojiId: "jelly", chance: 0.04 },
      { emojiId: "zombie", chance: 0.04 },
      { emojiId: "evolved", chance: 0.05 },
      { emojiId: "omega", chance: 0.025 },
      { emojiId: "sacred", chance: 0.025 },
      { emojiId: "bottle", chance: 0.025 },
      { emojiId: "trophy", chance: 1 / 500000 },
    ],
  },
  christmas: {
    name: "Holiday Crate",
    cost: 15000,
    pool: [
      { emojiId: "tree", chance: 0.18 },
      { emojiId: "snow", chance: 0.17 },
      { emojiId: "sock", chance: 0.15 },
      { emojiId: "bell", chance: 0.13 },
      { emojiId: "gift", chance: 0.11 },
      { emojiId: "reindeer", chance: 0.09 },
      { emojiId: "turkeyLeg", chance: 0.08 },
      { emojiId: "turkey", chance: 0.07 },
      { emojiId: "santa", chance: 0.02 },
    ],
  },
};

/* ========= GAME STATE ========= */

let coins = 0;
let ownedEmojiCounts = {};
let selectedCrateKey = "basic";
let hasDoubleCoinsUpgrade = false;

let moneyMultiplier = 1.0;
let purchasedMutations = {
  spark: false,
  rain: false,
  storm: false,
  prism: false,
  greed: false,
  time: false,
  omega: false,
  void: false,
  quantum: false,
  ascend: false,
  nova: false,
  rift: false,
};

let rebirthTokens = 0;
let rebirthCount = 0;

let lastTickTime = Date.now();
let lastSaveTime = Date.now();

/* ========= HELPERS ========= */

function getBestEmoji() {
  const ids = Object.keys(ownedEmojiCounts);
  if (ids.length === 0) return null;

  let best = null;
  ids.forEach((id) => {
    const count = ownedEmojiCounts[id];
    if (!count || count <= 0) return;
    const emoji = emojiDefs[id];
    if (!emoji) return;

    if (
      !best ||
      emoji.incomePerSecond > best.incomePerSecond ||
      (emoji.incomePerSecond === best.incomePerSecond &&
        emoji.rarityIndex > best.rarityIndex)
    ) {
      best = emoji;
    }
  });

  return best;
}

function updateRebirthUI() {
  rebirthTokensEl.textContent = rebirthTokens;
  rebirthCountEl.textContent = rebirthCount;

  const cost = getCurrentRebirthCost();
  rebirthButton.disabled = coins < cost;
  rebirthButton.textContent = `Rebirth (${cost.toLocaleString()}+ coins)`;

  if (coins >= cost) {
    rebirthStatusEl.textContent = "You can rebirth now!";
  } else {
    rebirthStatusEl.textContent = `Reach ${cost.toLocaleString()} coins to rebirth.`;
  }

  buyRebirthDivineButton.disabled = rebirthTokens < 1;
  buyRebirthOmegaButton.disabled = rebirthTokens < 10;
}

function updateTopHud() {
  coinAmountEl.textContent = Math.floor(coins).toLocaleString();

  const best = getBestEmoji();
  if (!best) {
    bestEmojiIconEl.textContent = "—";
    bestEmojiIncomeEl.textContent = "(0 / sec)";
  } else {
    bestEmojiIconEl.textContent = best.emoji;
    bestEmojiIncomeEl.textContent = `${best.incomePerSecond.toLocaleString()} / sec`;
  }

  updateRebirthUI();
}

/* ===== MUTATIONS UI ===== */

function updateMutationUI() {
  mutationStatusEl.textContent = `Coin multiplier: ${moneyMultiplier.toFixed(2)}×`;

  function setBtn(btn, purchased, textUnlocked, textLocked) {
    if (!btn) return;
    btn.disabled = purchased;
    btn.innerText = purchased ? textUnlocked : textLocked;
  }

  setBtn(
    mutSparkBtn,
    purchasedMutations.spark,
    "✨ Spark Mutation (Purchased)",
    "✨ Spark Mutation\n+0.05× coins\nCost: 1,000"
  );
  setBtn(
    mutRainBtn,
    purchasedMutations.rain,
    "🌧️ Cloud Mutation (Purchased)",
    "🌧️ Cloud Mutation\n+0.10× coins\nCost: 5,000"
  );
  setBtn(
    mutStormBtn,
    purchasedMutations.storm,
    "⚡ Storm Mutation (Purchased)",
    "⚡ Storm Mutation\n+0.25× coins\nCost: 20,000"
  );
  setBtn(
    mutPrismBtn,
    purchasedMutations.prism,
    "🌈 Prism Mutation (Purchased)",
    "🌈 Prism Mutation\n+0.50× coins\nCost: 100,000"
  );
  setBtn(
    mutGreedBtn,
    purchasedMutations.greed,
    "💰 Greed Mutation (Purchased)",
    "💰 Greed Mutation\n+0.30× coins\nCost: 50,000"
  );
  setBtn(
    mutTimeBtn,
    purchasedMutations.time,
    "⏰ Time Warp Mutation (Purchased)",
    "⏰ Time Warp Mutation\n+0.70× coins\nCost: 200,000"
  );
  setBtn(
    mutOmegaBtn,
    purchasedMutations.omega,
    "🧬 Omega Mutation (Purchased)",
    "🧬 Omega Mutation\n+1.00× coins\nCost: 1,000,000"
  );
  setBtn(
    mutVoidBtn,
    purchasedMutations.void,
    "🕳️ Void Mutation (Purchased)",
    "🕳️ Void Mutation\n+1.50× coins\nCost: 5,000,000"
  );
  setBtn(
    mutQuantumBtn,
    purchasedMutations.quantum,
    "⚛️ Quantum Mutation (Purchased)",
    "⚛️ Quantum Mutation\n+2.00× coins\nCost: 20,000,000"
  );
  setBtn(
    mutAscendBtn,
    purchasedMutations.ascend,
    "👑 Ascension Mutation (Purchased)",
    "👑 Ascension Mutation\n+3.00× coins\nCost: 100,000,000"
  );
  setBtn(
    mutNovaBtn,
    purchasedMutations.nova,
    "🌌 Nova Mutation (Purchased)",
    "🌌 Nova Mutation\n+4.00× coins\nCost: 250,000,000"
  );
  setBtn(
    mutRiftBtn,
    purchasedMutations.rift,
    "🌀 Rift Mutation (Purchased)",
    "🌀 Rift Mutation\n+5.00× coins\nCost: 500,000,000"
  );
}

/* ===== INVENTORY UI ===== */

function updateInventoryUI() {
  inventoryListEl.innerHTML = "";

  const ids = Object.keys(ownedEmojiCounts).filter(
    (id) => ownedEmojiCounts[id] > 0 && emojiDefs[id]
  );

  if (ids.length === 0) {
    const empty = document.createElement("div");
    empty.className = "inventory-empty";
    empty.textContent = "No emojis yet. Open some crates!";
    inventoryListEl.appendChild(empty);
    return;
  }

  ids.sort((a, b) => {
    const ea = emojiDefs[a];
    const eb = emojiDefs[b];
    if (ea.incomePerSecond !== eb.incomePerSecond) {
      return eb.incomePerSecond - ea.incomePerSecond;
    }
    return eb.rarityIndex - ea.rarityIndex;
  });

  ids.forEach((id) => {
    const emoji = emojiDefs[id];
    const count = ownedEmojiCounts[id];

    const item = document.createElement("div");
    item.className = "inventory-item";

    const left = document.createElement("div");
    left.className = "inventory-left";

    const icon = document.createElement("div");
    icon.className = "inventory-emoji";
    icon.textContent = emoji.emoji;

    const info = document.createElement("div");
    const label = document.createElement("div");
    label.className = "inventory-label";
    label.textContent = emoji.label;

    const countEl = document.createElement("div");
    countEl.className = "inventory-count";
    countEl.textContent = `Count: ${count}`;

    const incomeEl = document.createElement("div");
    incomeEl.className = "inventory-income";
    incomeEl.textContent = `${emoji.incomePerSecond} / sec`;

    info.appendChild(label);
    info.appendChild(countEl);
    info.appendChild(incomeEl);

    left.appendChild(icon);
    left.appendChild(info);

    const baseSellAmount = emoji.incomePerSecond * 5;
    const effectiveSellAmount = Math.floor(baseSellAmount * moneyMultiplier);
    const sellBtn = document.createElement("button");
    sellBtn.className = "inventory-sell-btn";
    sellBtn.textContent = `Sell 1 (+${effectiveSellAmount})`;
    sellBtn.dataset.sellId = emoji.id;

    item.appendChild(left);
    item.appendChild(sellBtn);

    inventoryListEl.appendChild(item);
  });
}

function sellOneEmoji(id) {
  const emoji = emojiDefs[id];
  if (!emoji) return;
  const current = ownedEmojiCounts[id] || 0;
  if (current <= 0) return;

  ownedEmojiCounts[id] = current - 1;
  if (ownedEmojiCounts[id] <= 0) {
    delete ownedEmojiCounts[id];
  }

  const baseSellAmount = emoji.incomePerSecond * 5;
  const effectiveSellAmount = baseSellAmount * moneyMultiplier;
  coins += effectiveSellAmount;

  updateTopHud();
  updateInventoryUI();
  saveGame();
}

/* ========= OTHER HELPERS ========= */

function refreshCrateButtons() {
  crateButtons.forEach((btn) => {
    const key = btn.dataset.crate;
    const crateDef = crates[key];
    const costSpan = btn.querySelector(".crate-cost");
    if (costSpan && crateDef) {
      costSpan.textContent = `Cost: ${crateDef.cost.toLocaleString()}`;
    }
    btn.classList.toggle("active", key === selectedCrateKey);
  });
}

function selectCrate(key) {
  if (!crates[key]) return;
  selectedCrateKey = key;
  refreshCrateButtons();
  saveGame();
}

function addOwnedEmoji(emoji) {
  if (!emoji) return;
  if (!ownedEmojiCounts[emoji.id]) {
    ownedEmojiCounts[emoji.id] = 0;
  }
  ownedEmojiCounts[emoji.id] += 1;
}

function pickFromCrate(crateDef) {
  const roll = Math.random();
  let cumulative = 0;
  let pickedId = crateDef.pool[0].emojiId;
  for (const item of crateDef.pool) {
    cumulative += item.chance;
    if (roll < cumulative) {
      pickedId = item.emojiId;
      break;
    }
  }
  return emojiDefs[pickedId];
}

function getRarityClassFromEmoji(emoji) {
  return emoji.rarityClass || "rarity-common";
}

function showRollResult(pickedEmoji) {
  if (!pickedEmoji) return;

  emojiDisplay.textContent = pickedEmoji.emoji;

  rarityDisplay.className = "rarity-display";
  rarityDisplay.classList.add(getRarityClassFromEmoji(pickedEmoji));
  rarityDisplay.textContent = `${pickedEmoji.label} emoji!`;

  rollCount++;
  rollCountDisplay.textContent = `Rolls: ${rollCount}`;
}

/* ========= SAVE / LOAD ========= */

function saveGame() {
  const data = {
    coins,
    ownedEmojiCounts,
    selectedCrateKey,
    rollCount,
    hasDoubleCoinsUpgrade,
    lastTime: Date.now(),
    moneyMultiplier,
    purchasedMutations,
    rebirthTokens,
    rebirthCount,
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed:", e);
  }
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    coins = data.coins || 0;
    rollCount = data.rollCount || 0;
    selectedCrateKey = data.selectedCrateKey || "basic";
    hasDoubleCoinsUpgrade = !!data.hasDoubleCoinsUpgrade;

    if (data.ownedEmojiCounts) {
      ownedEmojiCounts = data.ownedEmojiCounts;
    } else if (Array.isArray(data.ownedEmojiIds)) {
      ownedEmojiCounts = {};
      data.ownedEmojiIds.forEach((id) => {
        if (!ownedEmojiCounts[id]) ownedEmojiCounts[id] = 0;
        ownedEmojiCounts[id] += 1;
      });
    }

    moneyMultiplier =
      typeof data.moneyMultiplier === "number" ? data.moneyMultiplier : 1.0;

    const defaultMutations = {
      spark: false,
      rain: false,
      storm: false,
      prism: false,
      greed: false,
      time: false,
      omega: false,
      void: false,
      quantum: false,
      ascend: false,
      nova: false,
      rift: false,
    };
    if (data.purchasedMutations) {
      purchasedMutations = { ...defaultMutations, ...data.purchasedMutations };
    } else {
      purchasedMutations = { ...defaultMutations };
    }

    rebirthTokens =
      typeof data.rebirthTokens === "number" ? data.rebirthTokens : 0;
    rebirthCount =
      typeof data.rebirthCount === "number" ? data.rebirthCount : 0;

    if (data.lastTime) {
      const secondsPassed = (Date.now() - data.lastTime) / 1000;
      const best = getBestEmoji();
      if (best && secondsPassed > 0) {
        coins += best.incomePerSecond * secondsPassed * moneyMultiplier;
      }
    }
  } catch (e) {
    console.error("Load failed:", e);
  }
}

/* ========= CRATE ROLL ========= */

function rollEmoji() {
  const crateDef = crates[selectedCrateKey];
  if (!crateDef) return;

  if (coins < crateDef.cost) {
    alert("Not enough coins for this crate!");
    return;
  }

  crate.classList.add("opening");
  rollButton.disabled = true;

  setTimeout(() => {
    crate.classList.remove("opening");
    rollButton.disabled = false;

    if (crateDef.cost > 0) {
      coins -= crateDef.cost;
      if (coins < 0) coins = 0;
    }

    const picked = pickFromCrate(crateDef);
    addOwnedEmoji(picked);
    showRollResult(picked);

    updateTopHud();
    updateInventoryUI();
    saveGame();
  }, 400);
}

/* ========= IDLE LOOP ========= */

function gameLoop() {
  const now = Date.now();
  const deltaSeconds = (now - lastTickTime) / 1000;
  lastTickTime = now;

  if (deltaSeconds > 0 && deltaSeconds < 60) {
    const best = getBestEmoji();
    if (best) {
      coins += best.incomePerSecond * deltaSeconds * moneyMultiplier;
    }
  }

  updateTopHud();

  if (now - lastSaveTime > 5000) {
    saveGame();
    lastSaveTime = now;
  }

  requestAnimationFrame(gameLoop);
}

/* ========= UPGRADES ========= */

function updateUpgradeButtonUI() {
  if (hasDoubleCoinsUpgrade) {
    doubleCoinsButton.disabled = true;
    doubleCoinsButton.textContent = "2x Coins (Purchased)";
  } else {
    doubleCoinsButton.disabled = false;
    doubleCoinsButton.textContent = "2x Coins (Cost: 25,000)";
  }
}

function buyDoubleCoins() {
  const cost = 25000;
  if (hasDoubleCoinsUpgrade) {
    alert("You already bought this upgrade!");
    return;
  }
  if (coins < cost) {
    alert("You need 25,000 coins to buy 2x coins!");
    return;
  }
  coins -= cost;
  coins *= 2;
  hasDoubleCoinsUpgrade = true;
  updateTopHud();
  updateUpgradeButtonUI();
  saveGame();
}

/* ========= MUTATION PURCHASE ========= */

function buyMutation(key) {
  const configMap = {
    spark: { cost: 1000, add: 0.05 },
    rain: { cost: 5000, add: 0.1 },
    storm: { cost: 20000, add: 0.25 },
    prism: { cost: 100000, add: 0.5 },
    greed: { cost: 50000, add: 0.3 },
    time: { cost: 200000, add: 0.7 },
    omega: { cost: 1000000, add: 1.0 },
    void: { cost: 5000000, add: 1.5 },
    quantum: { cost: 20000000, add: 2.0 },
    ascend: { cost: 100000000, add: 3.0 },
    nova: { cost: 250000000, add: 4.0 },
    rift: { cost: 500000000, add: 5.0 },
  };

  const config = configMap[key];
  if (!config) return;
  if (purchasedMutations[key]) {
    alert("You already bought this mutation!");
    return;
  }
  if (coins < config.cost) {
    alert(`You need ${config.cost.toLocaleString()} coins for this mutation!`);
    return;
  }

  coins -= config.cost;
  moneyMultiplier += config.add;
  purchasedMutations[key] = true;

  updateTopHud();
  updateMutationUI();
  updateInventoryUI();
  saveGame();
}

/* ========= COINFLIP ========= */

function coinFlip() {
  if (coins <= 0) {
    alert("You need some coins before you can flip!");
    return;
  }

  const ok = confirm(
    "Coin flip: 50/50 chance.\nWin = your coins double.\nLose = you lose half your coins.\nFlip?"
  );
  if (!ok) return;

  const win = Math.random() < 0.5;
  if (win) {
    coins *= 2;
    alert("You won the flip! Coins doubled.");
  } else {
    coins = Math.floor(coins / 2);
    alert("You lost the flip... You lost half your coins.");
  }

  updateTopHud();
  saveGame();
}

/* ========= RESET COINS ========= */

function resetCoins() {
  const ok = confirm("Reset your coins to 0? (Your emojis & upgrades stay.)");
  if (!ok) return;
  coins = 0;
  updateTopHud();
  saveGame();
}

/* ========= TRADING ========= */

const tradeOrder = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Mythic",
  "Divine",
  "Sacred",
  "Prismatic",
  "Evolved",
  "Omega",
];

function performTrade() {
  const fromLabel = tradeTierSelect.value;
  const idx = tradeOrder.indexOf(fromLabel);
  if (idx === -1 || idx === tradeOrder.length - 1) {
    dealerStatusEl.textContent = "Invalid trade tier.";
    return;
  }

  const toLabel = tradeOrder[idx + 1];

  const lowerIds = Object.keys(emojiDefs).filter(
    (id) =>
      emojiDefs[id].label === fromLabel &&
      ownedEmojiCounts[id] &&
      ownedEmojiCounts[id] > 0
  );

  let totalLower = 0;
  lowerIds.forEach((id) => {
    totalLower += ownedEmojiCounts[id] || 0;
  });

  if (totalLower < 5) {
    dealerStatusEl.textContent = `You need at least 5 ${fromLabel} emojis to trade.`;
    return;
  }

  let toRemove = 5;
  for (const id of lowerIds) {
    if (toRemove <= 0) break;
    const have = ownedEmojiCounts[id] || 0;
    if (have <= 0) continue;
    const removeNow = Math.min(have, toRemove);
    ownedEmojiCounts[id] = have - removeNow;
    if (ownedEmojiCounts[id] <= 0) {
      delete ownedEmojiCounts[id];
    }
    toRemove -= removeNow;
  }

  const higherIds = Object.keys(emojiDefs).filter(
    (id) => emojiDefs[id].label === toLabel
  );
  if (higherIds.length === 0) {
    dealerStatusEl.textContent = `No emojis exist for ${toLabel} yet.`;
    updateInventoryUI();
    saveGame();
    return;
  }

  const randomIndex = Math.floor(Math.random() * higherIds.length);
  const newId = higherIds[randomIndex];
  const newEmoji = emojiDefs[newId];

  addOwnedEmoji(newEmoji);

  dealerStatusEl.textContent = `Traded 5 ${fromLabel} for 1 ${toLabel}: ${newEmoji.emoji}`;
  updateInventoryUI();
  updateTopHud();
  saveGame();
}

/* ========= REBIRTH ========= */

function doRebirth() {
  const cost = getCurrentRebirthCost();
  if (coins < cost) {
    alert(`You need at least ${cost.toLocaleString()} coins to rebirth.`);
    return;
  }

  const ok = confirm(
    "Rebirth will reset your coins, emojis, upgrades, and mutations.\n" +
      "Holiday, Feast, Omega, and Secret emojis will be kept.\n" +
      "You will gain 1 Rebirth Token.\nContinue?"
  );
  if (!ok) return;

  rebirthTokens += 1;
  rebirthCount += 1;

  const preserved = {};
  const keepLabels = new Set(["Holiday", "Feast", "Omega", "Secret"]);
  Object.keys(ownedEmojiCounts).forEach((id) => {
    const emoji = emojiDefs[id];
    if (emoji && keepLabels.has(emoji.label)) {
      preserved[id] = (preserved[id] || 0) + ownedEmojiCounts[id];
    }
  });

  coins = 0;
  ownedEmojiCounts = preserved;
  selectedCrateKey = "basic";
  hasDoubleCoinsUpgrade = false;
  moneyMultiplier = 1.0;
  purchasedMutations = {
    spark: false,
    rain: false,
    storm: false,
    prism: false,
    greed: false,
    time: false,
    omega: false,
    void: false,
    quantum: false,
    ascend: false,
    nova: false,
    rift: false,
  };
  rollCount = 0;

  lastTickTime = Date.now();
  lastSaveTime = Date.now();

  refreshCrateButtons();
  rollCountDisplay.textContent = `Rolls: ${rollCount}`;
  updateTopHud();
  updateMutationUI();
  updateInventoryUI();
  updateUpgradeButtonUI();
  saveGame();

  alert(
    "Rebirth complete! You gained 1 Rebirth Token.\n" +
      "Holiday, Feast, Omega, and Secret emojis were kept."
  );
}

function buyRebirthDivine() {
  if (rebirthTokens < 1) {
    alert("You need 1 Rebirth Token to buy 🎨.");
    return;
  }
  rebirthTokens -= 1;
  addOwnedEmoji(emojiDefs.paint);
  updateTopHud();
  updateInventoryUI();
  saveGame();
}

function buyRebirthOmega() {
  if (rebirthTokens < 10) {
    alert("You need 10 Rebirth Tokens to buy 🏯.");
    return;
  }
  rebirthTokens -= 10;
  addOwnedEmoji(emojiDefs.omegaTemple);
  updateTopHud();
  updateInventoryUI();
  saveGame();
}

/* ========= ADMIN ========= */

function adminAddCoins(amount) {
  coins += amount;
  updateTopHud();
  saveGame();
}

function adminGiveEmoji() {
  const id = adminEmojiSelect.value;
  const count = parseInt(adminEmojiCountInput.value, 10) || 1;
  const emoji = emojiDefs[id];
  if (!emoji) {
    alert("Invalid emoji id.");
    return;
  }
  if (!ownedEmojiCounts[id]) ownedEmojiCounts[id] = 0;
  ownedEmojiCounts[id] += count;

  updateTopHud();
  updateInventoryUI();
  saveGame();
}

/* ========= EVENTS & INIT ========= */

crate.addEventListener("click", rollEmoji);
rollButton.addEventListener("click", rollEmoji);

crateButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const crateKey = btn.dataset.crate;
    selectCrate(crateKey);
  });
});

inventoryListEl.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches(".inventory-sell-btn")) {
    const id = target.dataset.sellId;
    sellOneEmoji(id);
  }
});

doubleCoinsButton.addEventListener("click", buyDoubleCoins);

mutSparkBtn.addEventListener("click", () => buyMutation("spark"));
mutRainBtn.addEventListener("click", () => buyMutation("rain"));
mutStormBtn.addEventListener("click", () => buyMutation("storm"));
mutPrismBtn.addEventListener("click", () => buyMutation("prism"));
mutGreedBtn.addEventListener("click", () => buyMutation("greed"));
mutTimeBtn.addEventListener("click", () => buyMutation("time"));
mutOmegaBtn.addEventListener("click", () => buyMutation("omega"));
mutVoidBtn.addEventListener("click", () => buyMutation("void"));
mutQuantumBtn.addEventListener("click", () => buyMutation("quantum"));
mutAscendBtn.addEventListener("click", () => buyMutation("ascend"));
mutNovaBtn.addEventListener("click", () => buyMutation("nova"));
mutRiftBtn.addEventListener("click", () => buyMutation("rift"));

resetCoinsButton.addEventListener("click", resetCoins);
coinAmountEl.addEventListener("click", coinFlip);

adminCoins1kBtn.addEventListener("click", () => adminAddCoins(1000));
adminCoins10kBtn.addEventListener("click", () => adminAddCoins(10000));
adminCoins100kBtn.addEventListener("click", () => adminAddCoins(100000));
adminCoins1mBtn.addEventListener("click", () => adminAddCoins(1_000_000));
adminCoins100mBtn.addEventListener("click", () =>
  adminAddCoins(100_000_000)
);
adminCoins10bBtn.addEventListener("click", () =>
  adminAddCoins(10_000_000_000)
);
adminGiveEmojiButton.addEventListener("click", adminGiveEmoji);

tradeButton.addEventListener("click", performTrade);

rebirthButton.addEventListener("click", doRebirth);
buyRebirthDivineButton.addEventListener("click", buyRebirthDivine);
buyRebirthOmegaButton.addEventListener("click", buyRebirthOmega);

loadGame();
refreshCrateButtons();
rollCountDisplay.textContent = `Rolls: ${rollCount}`;
updateTopHud();
updateMutationUI();
updateInventoryUI();
updateUpgradeButtonUI();
gameLoop();
