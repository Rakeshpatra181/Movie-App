import { useEffect, useState } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// All Import
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/Details/Details";
import Explore from "./pages/Explore/Explore";
import PageNotFound from "./pages/404/pageNotFound";
import SearchResults from "./pages/searchResults/searchResults";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  console.log(url);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
