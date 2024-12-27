const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let leaderboard = [];

app.post('/submit-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || !score) {
        return res.status(400).send('Username and score are required');
    }

    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep only top 10 scores

    res.status(200).send('Score submitted');
});

app.get('/leaderboard', (req, res) => {
    res.status(200).json(leaderboard);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
