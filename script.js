const choiceButtons = document.querySelectorAll("[data-choice]");
const finalColumn = document.querySelector(".result-choices");
const computerScore = document.querySelector("[data-computer-score]");
const userScore = document.querySelector("[data-user-score]");
const endingMsg = document.querySelector("[data-end-msg");
const gameStatus = document.querySelector(".game-status");
const HIGHESTSCORE = 10;
const CHOICEARR = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissor",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissor",
    emoji: "✌",
    beats: "paper",
  },
];

// Game instruction
alert(`Don't let the bot wins ${HIGHESTSCORE} points first!`);

choiceButtons.forEach((choice) => {
  choice.addEventListener("click", () => {
    // User's choice
    const userChoiceDict = getUserChoice(choice);
    // Computer's choice
    const computerChoiceDict = getComputerChoice();

    // Decide who wins
    const result = decideWinner(userChoiceDict, computerChoiceDict);

    // Reset the latest choices
    resetLatest();

    // Show choices
    showChoice(computerChoiceDict, result["computer"]);
    showChoice(userChoiceDict, result["user"]);

    // Update the score
    updateScore(result);

    // Continue or end game
    endGameOrNot();
  });
});

function getUserChoice(choice) {
  const userChoice = choice.dataset.choice;
  const userChoiceDict = CHOICEARR.find(
    // == involves type convertion
    (choice) => choice.name === userChoice
  );
  return userChoiceDict;
}

function getComputerChoice() {
  const computerChoice = Math.floor(Math.random() * CHOICEARR.length);
  const computerChoiceDict = CHOICEARR[computerChoice];
  return computerChoiceDict;
}

function decideWinner(user, computer) {
  var result = { user: false, computer: false };
  if (user.beats === computer.name) {
    result["user"] = true;
  } else if (computer.beats === user.name) {
    result["computer"] = true;
  }
  return result;
}

function resetLatest() {
  const prevResultChoices = document.querySelectorAll(".result-choice.latest");
  prevResultChoices.forEach((choice) => choice.classList.remove("latest"));
}

function showChoice(choice, win) {
  const div = document.createElement("div");
  div.classList.add("result-choice");
  div.classList.add("latest");
  div.innerText = choice.emoji;
  if (win) div.classList.add("winner");
  finalColumn.prepend(div);
}

function updateScore(result) {
  // Reset the latest winner
  const prevWinner = document.querySelector(".result.winner");
  if (prevWinner) prevWinner.classList.remove("winner");

  // Increment the score
  if (result["computer"]) {
    computerScore.innerText = parseInt(computerScore.innerText) + 1;
  } else if (result["user"]) {
    userScore.innerText = parseInt(userScore.innerText) + 1;
  }

  // Decide who is the winner
  if (parseInt(computerScore.innerText) < parseInt(userScore.innerText))
    document.querySelector(".result.user").classList.add("winner");
  else if (parseInt(computerScore.innerText) > parseInt(userScore.innerText))
    document.querySelector(".result.computer").classList.add("winner");
}

function endGameOrNot() {
  var msg = "";
  if (
    parseInt(computerScore.innerText) == HIGHESTSCORE ||
    parseInt(userScore.innerText) == HIGHESTSCORE
  ) {
    if (parseInt(computerScore.innerText) == HIGHESTSCORE) {
      msg = "You lose!";
    } else {
      msg = "Congrats, you win!";
    }

    // Remove all the choices
    const resultChoices = document.querySelector(".result-choices");
    resultChoices.classList.add("end");

    // Show the message
    endingMsg.innerText = msg;
    gameStatus.classList.add("end");

    // Restrict click event
    choiceButtons.forEach((choice) => choice.classList.add("end"));
  }
}
