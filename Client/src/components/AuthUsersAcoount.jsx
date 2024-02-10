import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserAccount from "./UserAccount";

export default function AuthUsersAcoount() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    axios 
      .get("https://netflix-app-server.up.railway.app/check-user-auth", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUsername(res.data.user.username);
        } else {
          navigate("/login");
          console.log("User unauthorized!");
        } 
      })
      .catch((error) => { 
        navigate("/login");
        console.log(error);
      });
  }, []);
  return (
    <div>
      <UserAccount username={username} />
    </div>
  );
}