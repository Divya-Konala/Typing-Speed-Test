import randomWords from "random-words";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../context/TestModeContext";
import Stats from "./Stats";

let intervalId = null;
const TypingBox = () => {
  const [words, setWords] = useState(() => randomWords(50));

  const { timer, setTimer } = useTestMode();
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);

  const [countDown, setCountDown] = useState(timer);

  const inputRef = useRef(null);

  let wordsRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [wpmData, setWpmData] = useState([]);
  const [accuracyData, setAccuracyData] = useState([]);

  const calculateWPM = () => Math.round(correctChars / 5 / (timer / 60));

  const calculateAccuracy = () =>
    Math.round((correctWords / currentWordIndex) * 100);

  const startTimer = () => {
    intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setTestEnd(true);
          return 0;
        }
        setCorrectChars((correctChars) => {
          setWpmData((wpmData) => {
            return [
              ...wpmData,
              [
                timer - prev + 1,
                Math.round(correctChars / 5 / ((timer - prev + 1) / 60)),
              ],
            ];
          });
          return correctChars;
        });
        setCurrentWordIndex((currentWordIndex) => {
          setCorrectWords((correctWords) => {
            setAccuracyData((accuracyData) => {
              return [
                ...accuracyData,
                [
                  timer - prev + 1,
                  Math.round((correctWords / (currentWordIndex + 1)) * 100),
                ],
              ];
            });
            return correctWords;
          });
          return currentWordIndex;
        });
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
      let currentWord = currwordChars[currentCharIndex - 1];
      if (currentWord != undefined) {
        if (currentWord.classList.contains("correct"))
          setCorrectChars(correctChars - 1);
        else if (currentWord.classList.contains("extra"))
          setExtraChars(extraChars - 1);
        else if (currentWord.classList.contains("incorrect"))
          setIncorrectChars(incorrectChars - 1);
        else setMissedChars(missedChars - 1);
      }

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
        // if (currwordChars[currentCharIndex - 1].classList.contains(""))
        if (
          wordsRef[currentWordIndex].current.querySelectorAll("correct")
            .length === currwordChars.length
        ) {
          setCorrectWords(correctWords - 1);
        }
        currwordChars[currentCharIndex - 1].className = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      } else {
        currwordChars[currentCharIndex].className = " ";
        currwordChars[currentCharIndex - 1].className = "current";
        setCurrentCharIndex(currentCharIndex - 1);
      }
      return;
    }

    //clicking space leads to next word
    if (e.keyCode == 32) {
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);
      wordsRef[currentWordIndex + 1].current.childNodes[0].className =
        "current";
      if (currwordChars.length === currentCharIndex) {
        let correctCharsInWord =
          wordsRef[currentWordIndex].current.querySelectorAll(".correct");
        if (correctCharsInWord.length === currwordChars.length)
          setCorrectWords(correctWords + 1);
        currwordChars[currentCharIndex - 1].classList.remove("current-right");
      } else {
        currwordChars[currentCharIndex].classList.remove("current");
        setMissedChars(missedChars + currwordChars.length - currentCharIndex);
      }
      return;
    }

    //if typing exceeds word length
    if (currwordChars.length === currentCharIndex) {
      setExtraChars(extraChars + 1);
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      wordsRef[currentWordIndex].current.append(newSpan);
      setCurrentCharIndex(currentCharIndex + 1);
      currwordChars[currentCharIndex - 1].classList.remove("current-right");
      return;
    }

    if (currwordChars[currentCharIndex].innerText === e.key) {
      currwordChars[currentCharIndex].className = " correct";
      setCorrectChars(correctChars + 1);
    } else {
      currwordChars[currentCharIndex].className = " incorrect";
      setIncorrectChars(incorrectChars + 1);
    }
    if (currwordChars.length === currentCharIndex + 1) {
      currwordChars[currentCharIndex].className += " current-right";
    } else {
      currwordChars[currentCharIndex + 1].className = "current";
    }
    setCurrentCharIndex(currentCharIndex + 1);
  };

  const focusInput = () => {
    if(inputRef.current!==null){
      inputRef.current.focus();
    }
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
    setCountDown(Number(e.target.id));
    setTimer(Number(e.target.id));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setIncorrectChars(0);
    setMissedChars(0);
    setExtraChars(0);
    setCorrectWords(0);
    setWpmData([]);
    setAccuracyData([]);
    setWords(randomWords(50));
    focusInput();
    clearInterval(intervalId);
    resetWordsRefClassNames();
  };

  useEffect(() => {
    focusInput();
    wordsRef[0].current.childNodes[0].className = "current";
  }, []);

  useEffect(() => {
    if (!testEnd) {
      setCurrentWordIndex(0);
      setCurrentCharIndex(0);
      setCorrectChars(0);
      setIncorrectChars(0);
      setMissedChars(0);
      setExtraChars(0);
      setCorrectWords(0);
      setWpmData([]);
      setAccuracyData([]);
      setCountDown(timer);
      setTestStart(false);
      setWords(randomWords(50));
      resetWordsRefClassNames();

      focusInput();
      wordsRef[0].current.childNodes[0].className = "current";
    }
  }, [testEnd]);

  return (
    <div className="typingBox" onClick={focusInput}>
      {testEnd ? (
        <Stats
          setTestEnd={setTestEnd}
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          wpmData={wpmData}
          accuracyData={accuracyData}
        />
      ) : (
        <>
          <UpperMenu
            handleChangeMode={handleChangeMode}
            countDown={countDown}
          />
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
        </>
      )}
    </div>
  );
};

export default TypingBox;
