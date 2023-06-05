import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import UserTable from "../components/UserTable";
import Graph from "../components/Graph";
import UserInfo from "../components/UserInfo";

const User = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [wpmData, setWpmData] = useState();
  const [accuracyData, setAccuracyData] = useState();

  const [user, loading] = useAuthState(auth);

  const [dataLoading, setDataLoading] = useState(true);

  const { theme } = useTheme();

  const fetchUserData = async () => {
    const { uid } = auth.currentUser;
    const querySnapshot = await getDocs(
      query(
        collection(db, "test-results"),
        where("userId", "==", uid),
        orderBy("timeStamp", "asc")
      )
    );
    let tempData = [];
    let tempWpmData = [];
    let tempAccuracyData = [];
    querySnapshot.forEach((doc) => {
      tempData.push({ ...doc.data() });
      tempWpmData.push([
        doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
        doc.data().wpm,
      ]);
      tempAccuracyData.push([
        doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
        doc.data().accuracy,
      ]);
    });
    setData(tempData.reverse());
    setWpmData(tempWpmData);
    setAccuracyData(tempAccuracyData);
    setDataLoading(false);
  };
  useEffect(() => {
    if (!loading) fetchUserData();
    if (!loading && !user) navigate("/");
  }, [loading]);

  if (loading || dataLoading)
    return (
      <div className="centerOfPage">
        <CircularProgress
        size={300}
        sx={{
          color: theme.color,
        }}
      />
      </div>
    );
  return (
    <div className="user-canvas">
      <UserInfo totalTestsTaken={data.length}/>
      {data.length === 0 ? (
        ""
      ) : (
        <>
          <div className="user-graph">
            <Graph wpmData={wpmData} accuracyData={accuracyData} />
          </div>
          <UserTable data={data} />
        </>
      )}
    </div>
  );
};

export default User;
