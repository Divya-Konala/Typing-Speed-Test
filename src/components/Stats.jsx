import Graph from "./Graph";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  wpmData,
  accuracyData
}) => {
    let wpmSet = new Set();
    const filteredWpmData=wpmData.filter(i=>{
        if(!wpmSet.has(i[0])){
            wpmSet.add(i[0]);
            return i;
        }
    })
    let accuracySet=new Set();
    const filteredAccuracyData=accuracyData.filter(i=>{
      if(!accuracySet.has(i[0])){
        accuracySet.add(i[0]);
        return i;
      }
    })
  return (
    <div className="Stats">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="sub-title">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="sub-title">{accuracy}%</div>
        <div className="title">Characters (correct/incorrect/missed/extra)</div>
        <div className="sub-title">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="right-stats">
        <Graph wpmData={filteredWpmData} accuracyData={filteredAccuracyData}/>
      </div>
    </div>
  );
};

export default Stats;
