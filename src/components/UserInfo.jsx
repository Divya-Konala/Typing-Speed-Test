import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseConfig";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserInfo = ({totalTestsTaken}) => {
  let [user] = useAuthState(auth);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  
  return (
    <div className="user">
      <div className="user-info">
        <div className="picture">
            {(user.photoURL) ? <img className="user-img" src={user.photoURL} alt="user_img"/> : <AccountCircleRoundedIcon style={{transform: "Scale(5)"}} />}
          
        </div>
        <div className="user-details">
          <p>Name: <b>{user.displayName}</b></p>
          <p>Email: <b>{user.email}</b></p>
          <p>Account Created On: <b>{formatDate(user.metadata.creationTime.split(",")[1])}</b></p>
        </div>
      </div>
      <div className="test-details">
        Total Tests Taken: <b>{totalTestsTaken}</b><br/>
      </div>
    </div>
  );
};

export default UserInfo;
