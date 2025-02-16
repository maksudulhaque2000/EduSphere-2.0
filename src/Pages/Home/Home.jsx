import Banner from "./Banner";
import Collabs from "./Collabs";
import Educator from "./Educator";
import Empower from "./Empower";
import Feedback from "./Feedback";
import Highlight from "./Highlight";
import ImageGallery from "./ImageGallery";
import Insights from "./Insights";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Collabs></Collabs>
      <Highlight></Highlight>
      <Feedback></Feedback>
      <Insights></Insights>
      <Educator></Educator>
      <ImageGallery></ImageGallery>
      <Empower></Empower>
    </div>
  );
};

export default Home;
