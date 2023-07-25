import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import PageNotFound from "../pages/PageNotFound";
import Details from "../pages/home/details";
import SearchResult from "../pages/SearchResult";
import Explore from "../pages/Explore";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:mediaType/:id" element={<Details />}></Route>
          <Route path="/search/:query" element={<SearchResult />}></Route>
          <Route path="/explore/:mediaType" element={<Explore />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
