let money = 0;
let multiplier = 1;
let upgradeCost = 10;
let rankUpCost = 500;
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

startGameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (!username) {
        alert('Username is required');
        return;
    }
    gameContainer.style.display = 'block';
    startGameButton.style.display = 'none';
    usernameInput.style.display = 'none';
});

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

// Submit score to the backend when the game ends or at certain intervals
function submitScore() {
    fetch('http://localhost:3000/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score: money })
    });
}

// Fetch and display leaderboard
function fetchLeaderboard() {
    fetch('http://localhost:3000/leaderboard')
        .then(response => response.json())
        .then(data => {
            leaderboardElement.innerHTML = '';
            data.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.username}: ${entry.score}`;
                leaderboardElement.appendChild(li);
            });
        });
}

// Submit score every 10 seconds
setInterval(submitScore, 10000);
// Fetch leaderboard every 10 seconds
setInterval(fetchLeaderboard, 10000);

// Fetch leaderboard on page load
fetchLeaderboard();
