import { FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import SectionTitle from '../../components/SectionTitle';
import { motion } from 'framer-motion';

const Educator = () => {
    return (
        <div>
            <SectionTitle 
                subTitle={"Empower the Next Generation of Learners"} 
                heading={"Share your knowledge, inspire curious minds, and make an impact with EduSphere. As a teacher, you can create your own courses, publish assignments, and connect with a diverse community of learners. Join us today and start shaping the future of education!"}
            />
            
            <div className="container mx-auto text-center px-6">
                

                <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.6 }}
                >
                    <FaChalkboardTeacher className="text-6xl text-yellow-400" />
                </motion.div>

                <motion.div 
                    className="flex items-center justify-center space-x-4 mb-8"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-xl">Why Teach with Us?</p>
                    <FaStar className="text-2xl text-yellow-400" />
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1 }}
                >
                    <motion.div 
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Impactful Teaching</h3>
                        <p>Empower students to reach their full potential by sharing your expertise and experience.</p>
                    </motion.div>
                    <motion.div 
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                        <p>Set your own schedule and teach whenever and wherever works best for you.</p>
                    </motion.div>
                    <motion.div 
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                        <p>Teach students from all around the world and expand your impact beyond borders.</p>
                    </motion.div>
                </motion.div>

                <motion.a 
                    href="/teachon" 
                    className="inline-block py-3 px-8 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.8 }}
                >
                    Join as a Teacher
                </motion.a>
            </div>
        </div>
    );
};

export default Educator;
