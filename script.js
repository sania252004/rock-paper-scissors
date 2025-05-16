const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

let userScore = 0;
let computerScore = 0;
let round = 1;
let winStreak = 0;

function playGameFromInput() {
  const input = document.getElementById("userInput").value.toLowerCase().trim();
  if (!choices.includes(input)) {
    showResult('', '', 'Invalid input. Try: rock, paper, or scissors.');
    return;
  }
  playGame(input);
}

function playGame(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const result = determineWinner(userChoice, computerChoice);

  if (result === "You Win!") {
    userScore++;
    winStreak++;
  } else if (result === "You Lose!") {
    computerScore++;
    winStreak = 0;
  }

  updateUI(userChoice, computerChoice, result);
}

function determineWinner(user, computer) {
  if (user === computer) return "It's a Draw!";
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) return "You Win!";
  return "You Lose!";
}

function updateUI(userChoice, computerChoice, result) {
  document.getElementById('user-score').textContent = userScore;
  document.getElementById('computer-score').textContent = computerScore;
  document.getElementById('round-count').textContent = round;
  document.getElementById('win-streak').textContent = winStreak;

  document.getElementById('user-choice').textContent = `You chose: ${emojis[userChoice]}`;
  document.getElementById('computer-choice').textContent = `Computer chose: ${emojis[computerChoice]}`;
  document.getElementById('result').textContent = result;

  addToHistory(round, userChoice, computerChoice, result);
  round++;
}

function addToHistory(round, user, comp, result) {
  const historyLog = document.getElementById("history-log");
  const entry = document.createElement("li");
  entry.textContent = `Round ${round}: You - ${user}, Computer - ${comp} → ${result}`;
  historyLog.prepend(entry);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  round = 1;
  winStreak = 0;

  document.getElementById('user-score').textContent = 0;
  document.getElementById('computer-score').textContent = 0;
  document.getElementById('round-count').textContent = 1;
  document.getElementById('win-streak').textContent = 0;
  document.getElementById('userInput').value = '';
  document.getElementById("history-log").innerHTML = '';
  document.getElementById('user-choice').textContent = '';
  document.getElementById('computer-choice').textContent = '';
  document.getElementById('result').textContent = 'Game reset.';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition not supported in this browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function(event) {
    const spoken = event.results[0][0].transcript.toLowerCase();
    if (choices.includes(spoken)) {
      playGame(spoken);
    } else {
      showResult('', '', 'Voice not recognized. Say rock, paper, or scissors.');
    }
  };

  recognition.onerror = function(event) {
    showResult('', '', 'Voice error: ' + event.error);
  };
}

function showResult(userIcon, compIcon, message) {
  document.getElementById('user-choice').textContent = userIcon;
  document.getElementById('computer-choice').textContent = compIcon;
  document.getElementById('result').textContent = message;
}
