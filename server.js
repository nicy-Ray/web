const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'introduction.html'));
});



let leaderboard = [];

// Push data to leaderboard
app.post('/submit-quiz', (req, res) => {
    const { username, score } = req.body;
    const existingUserIndex = leaderboard.findIndex(user => user.username === username);

    // if (existingUserIndex !== -1) {
    //     leaderboard[existingUserIndex].score = score;
    // }
    // else {
    //     leaderboard.push({ username, score });
    // }
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    res.status(200).send('Quiz submitted successfully');
});

// Print the learderboard on the console to see
app.get('/leaderboard', (req, res) => {
    res.json(leaderboard);
    console.log(leaderboard);
});

// Let users see the learderboard
app.post('/complete-quiz', (req, res) => {
    res.json(leaderboard);
});