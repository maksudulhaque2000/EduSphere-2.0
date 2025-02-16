import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import slide1 from "../../assets/images/home/companies7.avif";
import slide2 from "../../assets/images/home/companies2.jpg";
import slide3 from "../../assets/images/home/companies3.jpg";
import slide4 from "../../assets/images/home/companies8.avif";
import slide5 from "../../assets/images/home/companies5.webp";
import SectionTitle from "../../components/SectionTitle";

const Collabs = () => {
  return (
    <div>
      <SectionTitle
        subTitle={"Our Partner Companies"}
        heading={
          "Our platform collaborates with leading companies to enhance the quality of education. In this section, you can learn about our partner organizations that play a key role in improving the learning experience and contribute to our platform's success."
        }
      />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mb-24"
      >
        <SwiperSlide>
          <img className="w-full" src={slide1} alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide2} alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide3} alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide4} alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide5} alt="slide image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Collabs;
