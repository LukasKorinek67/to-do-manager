import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => (
  <div>
    <h2>Hlavní strana</h2>
    <Link to="/login">
        <button type="button" className="button">Přihlásit se</button>
    </Link>
    <Link to="/createAcc">
        <button type="button" className="button">Vytvořit účet</button>
    </Link>
  </div>
);

export default MainPage;