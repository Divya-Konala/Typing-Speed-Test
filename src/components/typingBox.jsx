import randomWords from "random-words";
import { createRef, useEffect, useRef, useState } from "react";

const TypingBox = () => {
  const [words, setWords] = useState(() => randomWords(50));
  const inputRef = useRef(null);

  const wordsRef = Array(words.length).fill(0).map(i=>createRef(null));

  const [currentWordIndex,setCurrentWordIndex]=useState(0);
  const [currentCharIndex,setCurrentCharIndex]=useState(0);

  const handleInput = (e) => {
    console.log(e.key);
    if(wordsRef[currentWordIndex].current.childNodes[currentCharIndex].innerText===e.key){
      wordsRef[currentWordIndex].current.childNodes[currentCharIndex].className="correct";
    }else{
      wordsRef[currentWordIndex].current.childNodes[currentCharIndex].className="incorrect";
    }
  };
  const focusInput=()=>{
    inputRef.current.focus();
  }
  useEffect(()=>{
    focusInput();
    wordsRef[0].current.childNodes[0].className="current";
  },[])
  return (
    <div className="typingBox" onClick={focusInput}>
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
  );
};

export default TypingBox;
