let money = 0;
let multiplier = 1;
let upgradeCost = 10;
let rankUpCost = 500;

const moneyElement = document.getElementById('money');
const multiplierElement = document.getElementById('multiplier');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const rankUpButton = document.getElementById('rankUpButton');

clickButton.addEventListener('click', () => {
    money += multiplier;
    updateDisplay();
});

upgradeButton.addEventListener('click', () => {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        multiplier *= 2;
        upgradeCost *= 2;
        updateDisplay();
        upgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
    } else {
        alert('Not enough money for upgrade!');
    }
});

rankUpButton.addEventListener('click', () => {
    if (money >= rankUpCost) {
        money -= rankUpCost;
        multiplier *= 10485948; // Updated rank-up multiplier
        rankUpCost *= 3;
        updateDisplay();
        rankUpButton.textContent = `Rank Up (Cost: ${rankUpCost})`;
    } else {
        alert('Not enough money to rank up!');
    }
});

function updateDisplay() {
    moneyElement.textContent = money;
    multiplierElement.textContent = multiplier;
}
