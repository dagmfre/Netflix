import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserAccount from "./UserAccount";

export default function AuthUsersAcoount() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://netflix-api-6lk8.onrender.com/protected", { withCredentials: true })
      .then((res) => {
        if (response.ok) {
          setUsername(res.data.user.username)
        } else {
          navigate("/login");
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