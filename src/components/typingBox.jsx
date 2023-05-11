import randomWords from "random-words";
import { useEffect, useRef, useState } from "react";

const TypingBox = () => {
  const [words, setWords] = useState(() => randomWords(50));
  const inputRef = useRef(null);
  console.log(inputRef);
  const handleInput = (e) => {
    console.log(e.key);
  };
  const focusInput=()=>{
    inputRef.current.focus();
  }
  useEffect(()=>{
    focusInput();
  },[])
  return (
    <div className="typingBox" onClick={focusInput}>
      <div className="words">
        {words.map((word, index) => {
          return (
            <span className="word" key={index}>
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
