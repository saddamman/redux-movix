import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";

const MovieSlider = ({ children, settings }) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default MovieSlider;
