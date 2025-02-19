import React, { useState } from 'react';
import { FaChalkboardTeacher, FaStar, FaUserGraduate, FaTimes } from 'react-icons/fa';
import SectionTitle from '../../components/SectionTitle';

const FeaturedInstructors = () => {
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const instructors = [
        {
            id: 1,
            name: 'John Doe',
            bio: 'Expert in Web Development with 10+ years of experience.',
            courses: 15,
            rating: 4.9,
            image: 'https://i.ibb.co.com/RF1Q8zr/download-29.jpg',
            details: 'John has worked with top tech companies and mentored thousands of students worldwide.',
        },
        {
            id: 2,
            name: 'Jane Smith',
            bio: 'Data Science Specialist with a passion for teaching.',
            courses: 12,
            rating: 4.8,
            image: 'https://i.ibb.co.com/VYHJdmg/images-6.jpg',
            details: 'Jane has conducted multiple workshops and authored several books on data science.',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            bio: 'Digital Marketing Guru helping students grow their careers.',
            courses: 10,
            rating: 4.7,
            image: 'https://i.ibb.co.com/4jmLDCZ/can-i-switch-to-online-school.jpg',
            details: 'Alice has helped brands grow their online presence and taught digital marketing strategies globally.',
        },
    ];

    return (
        <div>
            <SectionTitle
        subTitle={"Featured Instructors"}
        heading={
          "Meet our top-rated instructors who are experts in their fields and passionate about teaching. Each instructor brings years of industry experience and a wealth of knowledge to help students achieve their goals. Explore their profiles, check out their courses, and learn from the best in the industry!"
        }
      />
            <div className="w-full mx-auto"> 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                            <img src={instructor.image} alt={instructor.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-teal-900 mb-2">{instructor.name}</h3>
                                <p className="text-gray-600 mb-4 truncate">{instructor.bio}</p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaChalkboardTeacher className="text-teal-500" />
                                        <span className="text-gray-700">{instructor.courses} Courses</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaStar className="text-yellow-400" />
                                        <span className="text-gray-700">{instructor.rating}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6">
                                    <button
                                        onClick={() => setSelectedInstructor(instructor)}
                                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                                    >
                                        <FaUserGraduate />
                                        <span>View Profile</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedInstructor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <button
                            onClick={() => setSelectedInstructor(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <FaTimes size={20} />
                        </button>
                        <img src={selectedInstructor.image} alt={selectedInstructor.name} className="w-32 h-32 mx-auto rounded-full" />
                        <h3 className="text-2xl font-semibold text-teal-900 text-center mt-4">{selectedInstructor.name}</h3>
                        <p className="text-gray-600 text-center mt-2">{selectedInstructor.bio}</p>
                        <p className="text-gray-700 mt-4">{selectedInstructor.details}</p>
                        <div className="flex justify-between mt-4 text-gray-700">
                            <div className="flex items-center space-x-2">
                                <FaChalkboardTeacher className="text-teal-500" />
                                <span>{selectedInstructor.courses} Courses</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaStar className="text-yellow-400" />
                                <span>{selectedInstructor.rating}</span>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setSelectedInstructor(null)}
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturedInstructors;
