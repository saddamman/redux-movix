import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/home-slice";
import AppRouter from "./routers";
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

  const genresCall = async () => {
    const promises = [];
    const endPoints = ["tv", "movie"];
    const allGenres = {};
    endPoints.forEach((url) => promises.push(fetchDataFromApi(`/genre/${url}/list`)));
    const data = await Promise.all(promises);
    data.map(({ genres }) => genres.forEach((item) => (allGenres[item.id] = item)));
    dispatch(getGenres(allGenres));
  };
  useEffect(() => {
    genresCall();
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
