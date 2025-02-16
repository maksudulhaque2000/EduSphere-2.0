import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbackData, isLoading, error } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const response = await axiosPublic.get("/feedback");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching feedbacks.
      </div>
    );
  }

  return (
    <div className="my-24">
      <SectionTitle
        subTitle={"---What Our Clients Say---"}
        heading={"TESTIMONIALS"}
      />
      <div className="container mx-auto px-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbackData.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <img
                    src={feedback.FeedbackGiverImage}
                    alt={feedback.FeedbackGiverName}
                    className="w-16 h-16 object-cover rounded-full border-2 border-teal-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700">
                      {feedback.FeedbackGiverName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {feedback.mentorEmail}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-800">
                    {feedback.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{feedback.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <ReactStars
                    count={5}
                    value={feedback.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <span className="text-sm text-gray-600">
                    Rating: {feedback.rating}/5
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Feedback;
