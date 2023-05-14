import randomWords from "random-words";
import { createRef, useEffect, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../context/TestModeContext";

let intervalId = null;
const TypingBox = () => {
  const [words, setWords] = useState(() => randomWords(50));

  const { countDown, setCountDown } = useTestMode();
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);

  const inputRef = useRef(null);

  let wordsRef = Array(words.length)
    .fill(0)
    .map((i) => createRef(null));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const startTimer = () => {
    intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setTestEnd(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInput = (e) => {
    if (!testStart) {
      setTestStart(true);
      startTimer();
    }

    let currwordChars = wordsRef[currentWordIndex].current.childNodes;

    //backspace functionality
    if (e.keyCode === 8) {
      //for going to prev word
      if (currentCharIndex === 0) {
        if (currentWordIndex === 0) return; //handling first word first character
        let prevWord = wordsRef[currentWordIndex - 1].current.childNodes;
        currwordChars[currentCharIndex].className = "";
        prevWord[prevWord.length - 1].className += " current-right";
        setCurrentWordIndex(currentWordIndex - 1);
        setCurrentCharIndex(prevWord.length);
      }
      //for removing extra characters typed
      else if (
        currwordChars[currentCharIndex - 1].classList.contains("extra")
      ) {
        currwordChars[currentCharIndex - 1].remove();
        setCurrentCharIndex(currentCharIndex - 1);
        currwordChars[currentCharIndex - 2].className += " current-right";
      }
      //if the cursor is at the end of current word
      else if (currwordChars.length === currentCharIndex) {
        currwordChars[currentCharIndex - 1].className = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      } else {
        currwordChars[currentCharIndex].className = " ";
        currwordChars[currentCharIndex - 1].className = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      }
      return;
    }

    //if typing exceeds word length
    if (currwordChars.length === currentCharIndex) {
      //space after completing word
      if (e.keyCode == 32) {
        if (currentWordIndex === words.length - 1) return; //handling last word last character
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentCharIndex(0);
        wordsRef[currentWordIndex + 1].current.childNodes[0].className =
          "current";
      }
      //other than space, incorrect characters typed
      else {
        let newSpan = document.createElement("span");
        newSpan.innerText = e.key;
        newSpan.className = "incorrect extra current-right";
        wordsRef[currentWordIndex].current.append(newSpan);
        setCurrentCharIndex(currentCharIndex + 1);
      }
      currwordChars[currentCharIndex - 1].classList.remove("current-right");
      return;
    }

    if (currwordChars[currentCharIndex].innerText === e.key) {
      currwordChars[currentCharIndex].className = "correct";
    } else {
      currwordChars[currentCharIndex].className = "incorrect";
    }
    if (currwordChars.length === currentCharIndex + 1) {
      currwordChars[currentCharIndex].className += " current-right";
    } else {
      currwordChars[currentCharIndex + 1].className = "current";
    }
    setCurrentCharIndex(currentCharIndex + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const resetWordsRefClassNames = () => {
    wordsRef.map((wordRef) => {
      Array.from(wordRef.current.childNodes).map((char) => {
        if (char.classList.contains("extra")) {
          char.remove();
        } else {
          char.className = "";
        }
      });
    });
    wordsRef[0].current.childNodes[0].className = "current";
  };

  const handleChangeMode = (e) => {
    clearInterval(intervalId);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCountDown(Number(e.target.id));
    setWords(randomWords(50));
    setTestStart(false);
    setTestEnd(false);
    resetWordsRefClassNames();
  };

  useEffect(() => {
    focusInput();
    wordsRef[0].current.childNodes[0].className = "current";
  }, []);
  return (
    <div className="typingBox" onClick={focusInput}>
      <UpperMenu handleChangeMode={handleChangeMode} />
      {testEnd ? (
        <h1>TEST OVER</h1>
      ) : (
        <div className="textBox">
          <div className="words">
            {words.map((word, index) => {
              return (
                <span className="word" key={index} ref={wordsRef[index]}>
                  {word.split("").map((char, index) => (
                    <span className="char" key={index}>
                      {char}
                    </span>
                  ))}
                </span>
              );
            })}
          </div>
          <input
            type="text"
            className="hidden-input"
            onKeyDown={handleInput}
            ref={inputRef}
          />
        </div>
      )}
    </div>
  );
};

export default TypingBox;
