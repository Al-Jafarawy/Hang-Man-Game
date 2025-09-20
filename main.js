      // Light/Dark mode toggle
      const themeToggle = document.getElementById("theme-toggle");
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark")
          ? "🌙"
          : "☀️";
      });

      // Letters grid
      let letters = "abcdefghijklmnopqrstuvwxyz+";
      let lettersArrey = Array.from(letters);
      let AllLetters = document.querySelector(".letters");
      lettersArrey.forEach((e) => {
        let span = document.createElement("span");
        let spanLetter = document.createTextNode(e);
        span.className = "letter-box";
        span.appendChild(spanLetter);
        AllLetters.appendChild(span);
      });

      // Words and categories
      let words = {
        programming: [
          "php",
          "javascript",
          "go",
          "scala",
          "fortran",
          "r",
          "c++",
          "c",
          "mysql",
          "python",
        ],
        sports: [
          "Field hockey",
          "Golf",
          "Basketball",
          "Cricket",
          "Volleyball",
          "tennes",
          "Baseball",
          "football",
          "American football",
        ],
        people: [
          "Albert Einstein",
          "Ahmed",
          "Mohamed",
          "Mustafa",
          "Mahmoud",
          "Hassan",
          "Fathy",
          "Samy",
          "Hitchcock",
          "Alexander",
          "Cleopatra",
          "Mahatma Ghandi",
        ],
        countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
      };
      let allKeys = Object.keys(words);
      let randamNumberOfKeysLength = Math.floor(Math.random() * allKeys.length);
      let categoryChoosein = allKeys[randamNumberOfKeysLength];
      let randamPropCategoryArrey = words[categoryChoosein];
      let randamIndexNumberOfKeyThatSelected = Math.floor(
        Math.random() * randamPropCategoryArrey.length
      );
      let randamProp =
        randamPropCategoryArrey[
          randamIndexNumberOfKeyThatSelected
        ].toLowerCase();
      document.querySelector(".category span").innerHTML = categoryChoosein;

      // Guess word section
      let letterGuess = document.querySelector(".letter-guess");
      let arrayOfChooseninWord = Array.from(randamProp);
      arrayOfChooseninWord.forEach((element) => {
        let spanGuess = document.createElement("span");
        if (element === " ") spanGuess.className = "space";
        letterGuess.appendChild(spanGuess);
      });
      let allGuessSpans = document.querySelectorAll(".letter-guess span");
      let hangmanDraw = document.querySelector(".hangman-draw");
      let wrongAttemps = 0;

      // Click handling
      document.addEventListener("click", (e) => {
        let theStatus = false;
        if (e.target.className === "letter-box") {
          e.target.classList.add("clicked");
          let clickedLetter = e.target.innerHTML.toLowerCase();
          arrayOfChooseninWord.forEach((wordLetter, wordIndex) => {
            if (clickedLetter == wordLetter) {
              theStatus = true;
              allGuessSpans.forEach((span, spanIndex) => {
                if (spanIndex == wordIndex) {
                  span.innerHTML = clickedLetter.toUpperCase();
                  span.classList.add("show");
                }
              });
            }
          });
          if (theStatus !== true) {
            wrongAttemps++;
            hangmanDraw.classList.add(`wrong-${wrongAttemps}`);
            document.getElementById("fail").play();
            if (wrongAttemps === 8) {
              endGame(false);
              AllLetters.classList.add("finshed");
            }
          } else {
            document.getElementById("succes").play();
            // Check win
            let won = true;
            arrayOfChooseninWord.forEach((wordLetter, wordIndex) => {
              if (
                wordLetter !== " " &&
                allGuessSpans[wordIndex].innerHTML === ""
              ) {
                won = false;
              }
            });
            if (won) {
              endGame(true);
              AllLetters.classList.add("finshed");
            }
          }
        }
      });

      // End Game Function with animated popup
      function endGame(win) {
        let popup = document.getElementById("popup");
        let popupText = document.getElementById("popup-text");
        let playAgainBtn = document.getElementById("play-again");
        popupText.innerHTML = win
          ? `🎉 You Win!<br>The word was: <strong>${randamProp}</strong>`
          : `Game Over, The Word Is <strong>${randamProp}</strong>`;
        playAgainBtn.style.display = "inline-block";
        popup.classList.add("show");
        playAgainBtn.onclick = () => {
          location.reload();
        };
      }