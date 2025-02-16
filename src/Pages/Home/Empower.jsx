import React, { useEffect } from "react";
import {
  FaRegEdit,
  FaChalkboardTeacher,
  FaRegUser,
  FaGraduationCap,
} from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import SectionTitle from "../../components/SectionTitle";

const Empower = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gray-100 py-10 my-10">
      <SectionTitle
        subTitle={"Unlock Your Teaching Potential with EduSphere"}
        heading={
          "Step into a world of endless teaching possibilities. EduSphere offers educators the platform to create, share, and inspire. Whether you’re a teacher looking to publish courses or a student eager to become one, we provide the resources you need to succeed. Join us today and start making an impact in education!"
        }
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-right"
          >
            <FaRegEdit className="text-4xl text-indigo-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              Publish Your Courses
            </h3>
            <p className="text-gray-700">
              Teachers can easily publish courses for students to enroll in and
              learn from.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <FaChalkboardTeacher className="text-4xl text-green-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Teach & Inspire</h3>
            <p className="text-gray-700">
              Become an educator and shape the future of students across the
              globe.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-left"
          >
            <FaRegUser className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">
              Request to Become a Teacher
            </h3>
            <p className="text-gray-700">
              Students can request to become teachers and share their knowledge.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <FaGraduationCap className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Enroll in Courses</h3>
            <p className="text-gray-700">
              Students can explore and enroll in courses to enhance their
              skills.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/allclasses"
            className="inline-block py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
            data-aos="zoom-in"
          >
            Our Classes
          </a>
        </div>
      </div>
    </div>
  );
};

export default Empower;
