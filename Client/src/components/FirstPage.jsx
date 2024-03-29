import React from "react";
import SuInput from "./SuInput";
import SiInput from "./SiInput";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div className="first-page">
      <div className="navlike">
        <Link to={"/"}>
          <img src="logo.png" alt="" />
        </Link>

        <SiInput />
      </div>
      <div className="input-field">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <SuInput />
      </div>
    </div>
  );
}

export default FirstPage;
