
const letterDiv = document.querySelector('.letter-div');
const letters = document.querySelectorAll('.alpha');
const helperButton = document.querySelector('.helper-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');
const hangmanContainer = document.querySelector('.hangman-container');
const rope = document.querySelector('.rope');
const head = document.querySelector('.head');
const body = document.querySelector('.body');
const leftArm = document.querySelector('.left-arm');
const rightArm = document.querySelector('.right-arm');
const leftLeg = document.querySelector('.left-leg');
const rightLeg = document.querySelector('.right-leg');

let lives;
let hiddenWord;

const words = [
  {
    word: 'hangman',
    hint: 'guess a secret word game',
  },
  {
    word: 'tests',
    hint: 'another test word',
  },
  {
    word: 'ternary',
    hint: 'Javascript Operator',
  },
  {
    word: 'function',
    hint: 'a reuseable block of code written to perform a single purpose',
  },
];

const wordList = words.map((i) => i.word);

const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

const init = () => {
  hiddenWord = getRandomWord();
  lives = 7;

  for (let l of letters) {
    l.classList.remove('disabled');
  }
  hintDiv.classList.add('hidden');
  notif.classList.add('hidden');

  hangmanContainer.classList.remove('hanged');
  rope.classList.add('hidden-part');
  head.classList.add('hidden-part');
  body.classList.add('hidden-part');
  leftArm.classList.add('hidden-part');
  rightArm.classList.add('hidden-part');
  leftLeg.classList.add('hidden-part');
  rightLeg.classList.add('hidden-part');

  liveSpan.textContent = lives;

  // setup hidden word container
  let hiddenWordLetters = document.querySelectorAll('.letter');
  hiddenWordLetters.forEach((i) => i.remove());

  for (let i = 0; i < hiddenWord.length; i++) {
    let p = document.createElement('p');
    p.classList.add('letter');
    p.innerHTML = '_';
    wordDiv.appendChild(p);
  }
};

const showNotif = (msg) => {
  notifSpan.textContent = hiddenWord;
  notifContent.textContent = `You ${msg}`;
  notif.classList.remove('hidden');
};

const decreaseLife = () => {
  handleHangmanBody();

  lives--;

  liveSpan.textContent = lives;

  if (lives === 0) {
    hangmanContainer.classList.add('hanged');
    showNotif('lost');
  }
};

const handleHangmanBody = () => {
  switch (lives) {
    case 7:
      head.classList.remove('hidden-part');
      break;

    case 6:
      body.classList.remove('hidden-part');
      break;

    case 5:
      leftArm.classList.remove('hidden-part');
      break;

    case 4:
      rightArm.classList.remove('hidden-part');
      break;

    case 3:
      leftLeg.classList.remove('hidden-part');
      break;

    case 2:
      rightLeg.classList.remove('hidden-part');
      break;

    case 1:
      rope.classList.remove('hidden-part');
      break;

    default:
      throw new Error(`${lives} is not a valid option in decreaseLife()`);
  };
}

const checkIfPlayerWon = () => {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

const letterPress = function () {
  let clickedLetterButton = this;
  const typedLetter = clickedLetterButton.textContent.toLowerCase();

  if (hiddenWord.includes(typedLetter)) {
    [...hiddenWord].forEach((hiddenWordLetter, idx) => {
      if (hiddenWordLetter === typedLetter) {
        wordDiv.children[idx].textContent = clickedLetterButton.textContent;
      }
    });
    if (checkIfPlayerWon()) {
      showNotif('won');
    };
  } else {
    decreaseLife();
  }
  clickedLetterButton.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// Listening to hint btn
helperButton.addEventListener('click', () => {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.find((i) => i.word === hiddenWord).hint;
});

// listening to reset btn
resetButton.addEventListener('click', () => {
  init();
});

// listening to play again button
playAgain.addEventListener('click', () => {
  init();
});

init();