import React from "react";
import { Route, Routes } from "react-router-dom";
import NavbarR from "./components/NavbarR";
import NotFound from "./components/NotFound";
import Balance from "./components/Balance";
import PerdidasGanancias from "./components/PerdidasGanancias";
import BalanceGeneral from "./components/BalanceGeneral";
import Principal from "./components/Principal";
//import Seat from "./components/Seat";
//import AsientosNM from "./components/AsientosNM";

function App() {
  return (
    <>
      <div>
        <NavbarR />
        <Routes>
          <Route path="/" element={<Principal/>} />
          <Route path="/balance" element={<Balance/>} />
          <Route path="/perdidas" element={<PerdidasGanancias/>} />
          <Route path="/general" element={<BalanceGeneral/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
