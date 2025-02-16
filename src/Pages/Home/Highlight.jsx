import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";
import {
  FaUserGraduate,
  FaDollarSign,
  FaEnvelope,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Highlight = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: classes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publicClasses"],
    queryFn: async () => {
      const response = await axiosPublic.get("/publicclasses/highlight");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl">
        Error fetching data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <SectionTitle
        subTitle={"Trending Courses"}
        heading={
          "Our platform collaborates with leading companies to enhance the quality of education. In this section, you can learn about our partner organizations that play a key role in improving the learning experience and contribute to our platform's success."
        }
      />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {classes.map((course) => (
          <SwiperSlide key={course._id}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold text-teal-700">
                  {course.name}
                </h4>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClipboardList className="text-blue-500" />
                    <span className="text-sm">
                      Assignments: {course.assignmentCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <FaUserGraduate className="text-teal-500" />
                    <span className="text-sm">
                      Enrolled Students: {course.enrollCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <FaEnvelope className="text-purple-500" />
                    <span className="text-sm">Instructor: {course.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <FaDollarSign className="text-yellow-500" />
                    <span className="text-sm">Price: ${course.price}</span>
                  </div>
                </div>
                <Link to={`/allclasses/${course._id}`}>
                  <button className="mt-6 px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 flex items-center justify-center gap-2 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Highlight;
