import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import UserRegister from "../pages/auth/UserRegister";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/general/CreateFood";
import Profile from '../pages/foodPartner/Profile'
import Saved from '../pages/general/Saved'

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
