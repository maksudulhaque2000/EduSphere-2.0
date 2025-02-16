import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/images/home/8.jpg";
import img2 from "../../assets/images/home/9.avif";
import img3 from "../../assets/images/home/3.png";
import img4 from "../../assets/images/home/12.jpg";
import img5 from "../../assets/images/home/5.jpg";
import img6 from "../../assets/images/home/6.jpg";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop>
      <div>
        <img className="object-cover" src={img1} />
      </div>
      <div>
        <img className="object-cover" src={img2} />
      </div>
      <div>
        <img className="object-cover" src={img3} />
      </div>
      <div>
        <img className="object-cover" src={img4} />
      </div>
      <div>
        <img className="object-cover" src={img5} />
      </div>
      <div>
        <img className="object-cover" src={img6} />
      </div>
    </Carousel>
  );
};

export default Banner;
