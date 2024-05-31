let questions = [
    //question1
    { question: "What is 4 + 2?", 
    options: ["3", "4", "5", "6"], 
    correct: 3 },
    
    //question2
    { question: "What is the capital of France?", 
    options: ["Berlin", "London", "Paris", "Rome"], 
    correct: 2 },

    // question3
    { question: "Which is my favourite cp?", 
    options: ["GxG", "AxH", "WxY", "BxS"], 
    correct: 0 },

    // question4
    { question: "What is Taylor Swift's lucky number?", 
    options: ["11", "12", "13", "14"], 
    correct: 2 },

    // question5
    { question: "Who is my favourite writer?", 
    options: ["Xueqin Cao", "Changer", "Emily Brontë", "Guanzhong Luo"], 
    correct: 1 },
    
    // question6
    { question: "Which is my favourite TV play?", 
    options: ["Breaking bad", "Better call Saul", "Sherlock", "None of above"], 
    correct: 3 },

    // question7
    { question: "Which is my favourite book?", 
    options: ["Wuthering Heights", "Elephants on Earth", "twittering birds never fly", "criminal psychology"], 
    correct: 3 },

    // question8
    { question: "Where do I think has the best scenery?", 
    options: ["Shanghai", "Jiuzhai valley", "Beijing", "Hangzhou"], 
    correct: 1 },
    
    // question9
    { question: "When is my birthday?", 
    options: ["1.21", "6.27", "10.1", "9.7"], 
    correct: 3 },

    // question10
    { question: "Which movie interests me most?", 
    options: ["Fancy another slice", "Frozen", "Zootopia", "Giraffe"], 
    correct: 0 },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let leaderboard = [];


document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('next-button').addEventListener('click', showQuestion);

function startQuiz() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert("Please give your name");
        return;
    }
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    clearTimeout(timer);
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    document.querySelector('.options').style.display = 'flex';
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.innerText = questionData.options[index];
        option.onclick = () => checkAnswer(index);
    });
    document.getElementById('timer').style.display = 'block';
    startTimer();
}
//Timer for every question 30s each
function startTimer() {
    let timeToAnswer = 30;
    document.getElementById('time').innerText = timeToAnswer;
    timer = setInterval(() => {
        timeToAnswer--;
        document.getElementById('time').innerText = timeToAnswer;
        if (timeToAnswer <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}


//Anser right / wrong respond
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const questionData = questions[currentQuestionIndex];
    let feedback = document.getElementById('feedback');
    if (selectedIndex === questionData.correct) {
        score++;
        feedback.innerText = "You answer is Correct!";
    }
    else {
        feedback.innerText = "You answer is Wrong!";
    }
    document.getElementById('question').innerText = "";
    document.querySelector('.options').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    feedback.style.display = 'block';
    document.getElementById('next-button').style.display = 'block';
    currentQuestionIndex++;
}


//After quiz, sent data to server to operate, at last get leaderboard
function endQuiz() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').innerText = `You got ${score} out of ${questions.length} correct.`;
    
    const username = document.getElementById('username').value;
    const payload = { username, score };
    fetch('/submit-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    getLeaderboard();
}


//restart button
document.getElementById('restart-button').addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
});

//Get leaderboard from server
function getLeaderboard() {
    fetch('/leaderboard')
    .then(response => response.json())
    .then(leaderboard => {

        // Clear the last leaderboard
        const leaderboardList = document.getElementById('leaderboard');
        leaderboardList.innerHTML = '';

        // create a new leaderboard
        leaderboard.forEach(entry => {
            const li = document.createElement('li');
            li.innerText = `${entry.username}: ${entry.score}`;
            leaderboardList.appendChild(li);
        });
    })
}
