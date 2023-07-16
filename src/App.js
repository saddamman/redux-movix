import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
function App() {
  const apiTestting = () => {
    fetchDataFromApi("/movie/popular").then((response) => {
      console.log(response.results);
    });
  };
  useEffect(() => {
    apiTestting();
  }, []);
  return <div className="App">App page !! </div>;
}

export default App;
