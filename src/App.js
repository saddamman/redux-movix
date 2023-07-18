import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration } from "./store/home-slice";
import AppRouter from "./routers";
import "./App.css";
import "./scss/main.scss";

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((response) => {
      let url = {
        backdrop: response.images.secure_base_url + "original",
        poster: response.images.secure_base_url + "original",
        profile: response.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  useEffect(() => {
    fetchApiConfig();
  }, []);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
