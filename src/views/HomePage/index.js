import React from "react";
import Header from "./Components/Header";
import Wallet from "../Wallet";

function HomePage() {
  return (
    <div>
      <Header />
      <Wallet style={{ padding: 40 }} />
    </div>
  );
}

export default HomePage;
