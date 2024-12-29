let money = 0;
let multiplier = 1;
const upgrades = [
    { name: 'Double Click', cost: 50, multiplier: 2 },
    { name: 'Triple Click', cost: 150, multiplier: 3 },
    { name: 'Quadruple Click', cost: 300, multiplier: 4 },
    { name: 'Quintuple Click', cost: 500, multiplier: 5 },
    { name: 'Sextuple Click', cost: 1000, multiplier: 60 },
    { name: 'Septuple Click', cost: 2000, multiplier: 100 },
    { name: 'Octuple Click', cost: 4000, multiplier: 800 },
    { name: 'Nonuple Click', cost: 8000, multiplier: 9000 },
    { name: 'Decuple Click', cost: 16000, multiplier: 100000 },
    { name: 'Undecuple Click', cost: 32000, multiplier: 110000 },
    { name: 'Duodecuple Click', cost: 64000, multiplier: 120000 },
    { name: 'Tredecuple Click', cost: 128000, multiplier: 130000 },
    { name: 'Quattuordecuple Click', cost: 256000, multiplier: 14000000},
];

const moneyElement = document.getElementById('money');
const multiplierElement = document.getElementById('multiplier');
const clickButton = document.getElementById('clickButton');
const upgradeList = document.getElementById('upgradeList');
const pinInput = document.getElementById('pinInput');
const pinButton = document.getElementById('pinButton');
const pinMessage = document.getElementById('pinMessage');

// Initialize the upgrade list
function initializeUpgrades() {
    upgrades.forEach((upgrade, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${upgrade.name} (Cost: $${upgrade.cost})</span>
            <button onclick="buyUpgrade(${index})">Buy</button>
        `;
        upgradeList.appendChild(li);
    });
}

// Update the display elements
function updateDisplay() {
    moneyElement.textContent = money;
    multiplierElement.textContent = multiplier;
}

// Handle click event
clickButton.addEventListener('click', () => {
    money += multiplier;
    updateDisplay();
});

// Buy upgrade
function buyUpgrade(index) {
    if (money >= upgrades[index].cost) {
        money -= upgrades[index].cost;
        multiplier *= upgrades[index].multiplier;
        updateDisplay();
    } else {
        alert('Not enough money for this upgrade!');
    }
}

// Handle pin pad submission
pinButton.addEventListener('click', () => {
    const pinCode = pinInput.value;
    const validCodes = ['7777', '4583', '9882'];
    if (validCodes.includes(pinCode)) {
        money += 10000000; // Grant 10 million cash
        updateDisplay();
        pinMessage.textContent = 'Admin code accepted! You received $10,000,000!';
        pinMessage.style.color = 'green';
    } else {
        pinMessage.textContent = 'Invalid admin code.';
        pinMessage.style.color = 'red';
    }
    pinInput.value = ''; // Clear the input
});

// Initialize the game
initializeUpgrades();
updateDisplay();
