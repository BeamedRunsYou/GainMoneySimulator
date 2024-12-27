let money = 0;
let multiplier = 1;
let upgradeCost = 10;
let rankUpCost = 350;
let username = '';

const moneyElement = document.getElementById('money');
const multiplierElement = document.getElementById('multiplier');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const rankUpButton = document.getElementById('rankUpButton');
const startGameButton = document.getElementById('startGameButton');
const usernameInput = document.getElementById('username');
const gameContainer = document.getElementById('gameContainer');
const leaderboardElement = document.getElementById('leaderboard');

// Load player progress from localStorage
function loadProgress() {
    const savedUsername = localStorage.getItem('username');
    const savedMoney = localStorage.getItem('money');
    const savedMultiplier = localStorage.getItem('multiplier');
    const savedUpgradeCost = localStorage.getItem('upgradeCost');
    const savedRankUpCost = localStorage.getItem('rankUpCost');

    if (savedUsername) username = savedUsername;
    if (savedMoney) money = parseInt(savedMoney);
    if (savedMultiplier) multiplier = parseInt(savedMultiplier);
    if (savedUpgradeCost) upgradeCost = parseInt(savedUpgradeCost);
    if (savedRankUpCost) rankUpCost = parseInt(savedRankUpCost);

    updateDisplay();
    if (username) {
        gameContainer.style.display = 'block';
        startGameButton.style.display = 'none';
        usernameInput.style.display = 'none';
    }
}

// Save player progress to localStorage
function saveProgress() {
    localStorage.setItem('username', username);
    localStorage.setItem('money', money);
    localStorage.setItem('multiplier', multiplier);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('rankUpCost', rankUpCost);
}

// Load leaderboard from localStorage
function loadLeaderboard() {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return savedLeaderboard;
}

// Save leaderboard to localStorage
function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboard = loadLeaderboard();
    const existingUser = leaderboard.find(entry => entry.username === username);

    if (existingUser) {
        existingUser.score = money;
    } else {
        leaderboard.push({ username, score: money });
    }

    leaderboard.sort((a, b) => b.score - a.score);
    saveLeaderboard(leaderboard);
    displayLeaderboard(leaderboard);
}

// Display leaderboard
function displayLeaderboard(leaderboard) {
    leaderboardElement.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.username}: ${entry.score}`;
        leaderboardElement.appendChild(li);
    });
}

startGameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (!username) {
        alert('Username is required');
        return;
    }
    saveProgress();
    gameContainer.style.display = 'block';
    startGameButton.style.display = 'none';
    usernameInput.style.display = 'none';
});

clickButton.addEventListener('click', () => {
    money += multiplier;
    updateDisplay();
    saveProgress();
    updateLeaderboard();
});

upgradeButton.addEventListener('click', () => {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        multiplier *= 2;
        upgradeCost *= 2;
        updateDisplay();
        upgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
        saveProgress();
        updateLeaderboard();
    } else {
        alert('Not enough money for upgrade!');
    }
});

rankUpButton.addEventListener('click', () => {
    if (money >= rankUpCost) {
        money -= rankUpCost;
        multiplier *= 500; // Updated rank-up multiplier
        rankUpCost *= 3;
        updateDisplay();
        rankUpButton.textContent = `Rank Up (Cost: ${rankUpCost})`;
        saveProgress();
        updateLeaderboard();
    } else {
        alert('Not enough money to rank up!');
    }
});

function updateDisplay() {
    moneyElement.textContent = money;
    multiplierElement.textContent = multiplier;
}

// Load player progress and leaderboard on page load
window.onload = () => {
    loadProgress();
    displayLeaderboard(loadLeaderboard());
};
