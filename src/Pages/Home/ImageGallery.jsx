import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionTitle from "../../components/SectionTitle";

const ImageGallery = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="py-16 pt-2 bg-gray-100 my-10">
      <SectionTitle
        subTitle={"Our Inspiring Moments"}
        heading={
          "Browse through these captivating images that highlight the core of our community’s journey. From impactful courses to inspiring learners and educators, these visuals reflect the essence of growth, learning, and collaboration at EduSphere. Explore the journey, and let these moments inspire your next step!"
        }
      />
      <div className="container mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative" data-aos="zoom-in" data-aos-delay="300">
            <img
              src="https://i.ibb.co.com/fCHHb6N/images.jpg"
              alt="Image 1"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>

          <div className="relative" data-aos="zoom-in" data-aos-delay="400">
            <img
              src="https://i.ibb.co.com/VYHJdmg/images-6.jpg"
              alt="Image 2"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>

          <div className="relative" data-aos="zoom-in" data-aos-delay="500">
            <img
              src="https://i.ibb.co.com/yYdyRJw/images-5.jpg"
              alt="Image 3"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>

          <div className="relative" data-aos="zoom-in" data-aos-delay="600">
            <img
              src="https://i.ibb.co.com/HtpYZjH/images-3.jpg"
              alt="Image 4"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>

          <div className="relative" data-aos="zoom-in" data-aos-delay="700">
            <img
              src="https://i.ibb.co.com/s59973j/Children-benefit-from-K12-classes.jpg"
              alt="Image 5"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>

          <div className="relative" data-aos="zoom-in" data-aos-delay="800">
            <img
              src="https://i.ibb.co.com/4jmLDCZ/can-i-switch-to-online-school.jpg"
              alt="Image 6"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
