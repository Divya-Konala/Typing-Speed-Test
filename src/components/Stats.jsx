import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import Graph from "./Graph";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Stats = ({
  setTestEnd,
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  wpmData,
  accuracyData,
}) => {
  const user = auth.currentUser;
  let wpmSet = new Set();
  const filteredWpmData = wpmData.filter((i) => {
    if (!wpmSet.has(i[0])) {
      wpmSet.add(i[0]);
      return i;
    }
  });
  let accuracySet = new Set();
  const filteredAccuracyData = accuracyData.filter((i) => {
    if (!accuracySet.has(i[0])) {
      accuracySet.add(i[0]);
      return i;
    }
  });

  const addDataTodb = async () => {
    if (isNaN(accuracy)) {
      toast.error("invalid test", {
        position: "top-right",
        theme: "dark",
      });
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "test-results"), {
        wpm: wpm,
        accuracy: accuracy,
        characters: `${correctChars} / ${incorrectChars} / ${missedChars} / ${extraChars}`,
        timeStamp: new Date(),
        userId: user.uid,
      });
      toast.success("test-result added to database!", {
        position: "top-right",
        theme: "dark",
      });
    } catch (error) {
      toast.error("unable to save test-result to database", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (user) {
      addDataTodb();
    } else {
      toast.warning("login to save test results", {
        position: "top-right",
        theme: "dark",
      });
    }
  }, []);

  return (
    <div className="Stats">
      <div className="Statistics-box">
        <div className="left-stats">
          <div className="title">WPM</div>
          <div className="sub-title">{wpm}</div>
          <div className="title">Accuracy</div>
          <div className="sub-title">
            {accuracy}
            {isNaN(accuracy) ? "" : "%"}
          </div>
          <div className="title">
            Characters (correct/incorrect/missed/extra)
          </div>
          <div className="sub-title">
            {correctChars} / {incorrectChars} / {missedChars} / {extraChars}
          </div>
        </div>
        <div className="right-stats">
          <Graph
            wpmData={filteredWpmData}
            accuracyData={filteredAccuracyData}
          />
        </div>
      </div>

      <button
        onClick={() => {
          setTestEnd(false);
        }}
      >
        Back To Typing
      </button>
    </div>
  );
};

export default Stats;
