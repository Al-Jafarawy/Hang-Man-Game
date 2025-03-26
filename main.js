let letters = 'abcdefghijklmnopqrstuvwxyz+';
let lettersArrey = Array.from(letters);
let AllLetters = document.querySelector('.letters');

lettersArrey.forEach((e) => {
  let span = document.createElement('span');
  let spanLetter = document.createTextNode(e);
  span.className = 'letter-box';

  span.appendChild(spanLetter);
  AllLetters.appendChild(span);
});

// Our Object + categores
let words = {
  programming: [
    'php',
    'javascript',
    'go',
    'scala',
    'fortran',
    'r',
    'c++',
    'c',
    'mysql',
    'python',
  ],
  sports: [
    'Field hockey',
    'Golf',
    'Basketball',
    'Cricket',
    'Volleyball',
    'tennes',
    'Baseball',
    'football',
    'American football',
  ],
  people: [
    'Albert Einstein',
    'Ahmed',
    'Mohamed',
    'Mustafa',
    'Mahmoud',
    'Hassan',
    'Fathy',
    'Samy',
    'Hitchcock',
    'Alexander',
    'Cleopatra',
    'Mahatma Ghandi',
  ],
  countries: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar'],
};
let allKeys = Object.keys(words);
let randamNumberOfKeysLength = Math.floor(Math.random() * allKeys.length);
let categoryChoosein = allKeys[randamNumberOfKeysLength];
let randamPropCategoryArrey = words[categoryChoosein];

let randamIndexNumberOfKeyThatSelected = Math.floor(
  Math.random() * randamPropCategoryArrey.length
);
let randamProp =
  randamPropCategoryArrey[randamIndexNumberOfKeyThatSelected].toLowerCase();

document.querySelector('.category span').innerHTML = categoryChoosein;

// Geuss word section
let letterGuess = document.querySelector('.letter-guess');
let arrayOfChooseninWord = Array.from(randamProp);

arrayOfChooseninWord.forEach((element) => {
  let spanGuess = document.createElement('span');

  if (element === ' ') {
    spanGuess.className = 'space';
  }
  letterGuess.appendChild(spanGuess);
});

// select guess spans
let allGuessSpans = document.querySelectorAll('.letter-guess span');
let hangmanDraw = document.querySelector('.hangman-draw');
let wrongAttemps = 0;

// clicking section
document.addEventListener('click', (e) => {
  let theStatus = false;
  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked');
    let clickedLetter = e.target.innerHTML.toLowerCase();
    arrayOfChooseninWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        theStatus = true;
        allGuessSpans.forEach((span, spanIndex) => {
          if (spanIndex == wordIndex) {
            span.innerHTML = clickedLetter.toUpperCase();
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttemps++;
      hangmanDraw.classList.add(`wrong-${wrongAttemps}`);
      document.getElementById('fail').play()
      if(wrongAttemps===8){
        endGame()
        AllLetters.classList.add('finshed')
        
      }
    }else{
  
      document.getElementById('succes').play()
    }
  }
});
// End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randamProp}`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);
}

console.log(randamProp);
