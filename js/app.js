
const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
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


// keeping letters using javascript
// so untill we put html content into letter-div,
// we cant capture letters
let letters;

let lives;

const words = new Map([
  ['hangman', 'guess a secret word game'],
  ['tests', 'another test word'],
  ['ternary', 'Javascript Operator'],
  ['function', 'a resuable block of code written to perform a single purpuse'],
]);


// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = (list) => {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;

const init = (state) => {
  wordDiv.innerHTML = '';
  select_word = getRandomWord(word_list);
  lives = 7;

  // capturing letters div
  letters = document.querySelectorAll('.alpha');
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

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    let p = document.createElement('p');
    p.classList.add('word');
    p.innerHTML = '_';
    wordDiv.appendChild(p);
  }
};
// initializing the page
init();

// show notification
const showNotif = (msg) => {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
  // lives = 3;
};

// decrease life
const decreaseLife = () => {
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
  }

  lives--;

  //   console.log(lives);
  liveSpan.textContent = lives;

  if (lives === 0) {
    hangmanContainer.classList.add('hanged');
    showNotif('lost');
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = (letter) => {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //   console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = () => {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', () => {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', () => {
  init();
});

// listening to play again button
playAgain.addEventListener('click', () => {
  init();
});