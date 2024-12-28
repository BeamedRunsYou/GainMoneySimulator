let money = 0;
let multiplier = 1;
let upgrades = [
    { name: 'Double Click', cost: 50, multiplier: 2 },
    { name: 'Triple Click', cost: 150, multiplier: 3 },
    { name: 'Quadruple Click', cost: 300, multiplier: 4 },
];

const moneyElement = document.getElementById('money');
const multiplierElement = document.getElementById('multiplier');
const clickButton = document.getElementById('clickButton');
const upgradeList = document.getElementById('upgradeList');

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
        alert(`You bought ${upgrades[index].name}!`);
    } else {
        alert('Not enough money for this upgrade!');
    }
}

// Initialize the game
initializeUpgrades();
updateDisplay();
