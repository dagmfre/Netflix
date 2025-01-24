import axios from "axios";
import { useState } from "react";
import SuInput2 from "../components/SuInput2";
import SuInput3 from "../components/SuInput3";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmailUsername = (data) => {
    setEmail(data.email);
    setUsername(data.username);
  };
  const handlePassword = (data) => {
    setPassword(data);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://netflix-clonee-api.onrender.com/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        navigate("/netflix-account", { state: { data: username } });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response.status === 401) {
        console.log("Incorrect username or password");
        setErr("Incorrect username or password");
      }
    }
  };

  return (
    <div onSubmit={handleRegister} className="login">
      <Link className="logo-cont" to={"/"}>
        <img src="logo.png" alt="" className="logo" />
      </Link>
      <form className="form">
        <h1>Login</h1>
        <SuInput2 sentData={handleEmailUsername} />
        <SuInput3 sentData={handlePassword} />
        <div className="last-qsn">
          <h4>
            <span>Don't have an account?</span>
            <Link to={"/signup"}>Sign up now</Link>
          </h4>
        </div>
        <div className="err-msg" style={{ display: err ? "" : "none" }}>
          <p>
            <i className="fa-solid fa-circle-xmark"></i>
            {err}
          </p>
        </div>
      </form>
    </div>
  );
}
