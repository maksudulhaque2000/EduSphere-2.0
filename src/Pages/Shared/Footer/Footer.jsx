import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">EduSphere</h2>
            <p className="mt-4 text-sm">
              Empowering Education, Connecting Minds – Join us in building a
              brighter future together.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/maksudulhaque2000/"
                  className="hover:text-white"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@smmaksudulhaque"
                  className="hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/maksudulhaque2000/"
                  className="hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/"
                className="text-gray-300 hover:text-white text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.threads.net/@maksudulhaque2000?xmt=AQGzJdNjCi5NNVFqFseYsFmhjXe9vLexVHlte361N0wQD-0"
                className="text-gray-300 hover:text-white text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/maksudulhaque2000/"
                className="text-gray-300 hover:text-white text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/maksudulhaque2000/"
                className="text-gray-300 hover:text-white text-xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EduSphere. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
