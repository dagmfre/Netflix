import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserAccount from "./UserAccount";
import axios from "axios";

export default function NetflixMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.data;

  useEffect(() => {
    const token = localStorage.getItem("token");
    sessionStorage.setItem("username", username)
    axios
      .get("https://netflix-clonee-api.onrender.com/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        navigate("/login");
        console.log("Unauthorized user, This is the error" + error);
      });
  }, []);
  return (
    <div>
      <UserAccount username={username}/>
    </div>
  );
}
