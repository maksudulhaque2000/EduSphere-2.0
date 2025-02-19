import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegNewspaper } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning",
    description:
      "Explore how online education is revolutionizing the way we learn and teach in the digital age.",
    content:
      "Online learning is rapidly evolving, bringing new opportunities and challenges to both students and educators. In this article, we explore the future of digital education and its impact on traditional learning systems.",
    image: "https://i.ibb.co.com/jvzX04Yj/images-1.jpg",
  },
  {
    id: 2,
    title: "Top 5 Skills to Learn in 2025",
    description:
      "Discover the most in-demand skills for the future job market and how to master them.",
    content:
      "As technology continues to advance, certain skills are becoming more valuable. In this blog, we discuss the top skills to learn for 2025 and how they can boost your career.",
    image: "https://i.ibb.co.com/KzVPXzvZ/download.png",
  },
  {
    id: 3,
    title: "Why Interactive Learning Matters",
    description:
      "Learn why interactive and engaging education methods are key to better knowledge retention.",
    content:
      "Interactive learning has proven to be more effective than traditional methods. This article explains the science behind interactive education and its benefits.",
    image: "https://i.ibb.co.com/Kxn7Gcyw/download.jpg",
  },
  {
    id: 4,
    title: "How AI is Changing Education",
    description:
      "Artificial intelligence is reshaping the way we teach and learn. Discover its impact on education.",
    content:
      "AI is becoming an integral part of education, helping teachers personalize learning experiences and automate administrative tasks. This blog explores AI's growing role in the education sector.",
    image: "https://i.ibb.co.com/RF1Q8zr/download-29.jpg",
  },
  {
    id: 5,
    title: "Effective Study Techniques for Students",
    description:
      "Boost your academic performance with these proven study techniques.",
    content:
      "Studying smarter, not harder, can significantly improve academic performance. Learn about the best study techniques that will help you retain information better.",
    image: "https://i.ibb.co.com/PvbMNs4v/download-28.jpg",
  },
  {
    id: 6,
    title: "The Rise of E-Learning Platforms",
    description:
      "Understand how e-learning platforms are transforming education worldwide.",
    content:
      "E-learning platforms are making education more accessible and flexible. This article discusses their impact on global education and future trends.",
    image: "https://i.ibb.co.com/cKfr5Kks/download-27.jpg",
  },
  {
    id: 7,
    title: "Best Online Courses for Career Growth",
    description:
      "Explore the top online courses that can boost your career prospects.",
    content:
      "With numerous online courses available, choosing the right one is crucial. Here, we list the best online courses for career growth in various industries.",
    image: "https://i.ibb.co.com/wZt5ZkDz/download-26.jpg",
  },
  {
    id: 8,
    title: "Gamification in Education",
    description:
      "Discover how gamification enhances student engagement and learning outcomes.",
    content:
      "Gamification uses game elements to make learning more fun and effective. Learn how it is being applied in modern education systems.",
    image: "https://i.ibb.co.com/mFvQQGfd/download-25.jpg",
  },
  {
    id: 9,
    title: "How to Stay Motivated While Learning Online",
    description:
      "Find out how to keep yourself motivated in an online learning environment.",
    content:
      "Online learning requires self-discipline. In this article, we share tips and strategies to stay motivated and achieve your learning goals.",
    image: "https://i.ibb.co.com/tRKZPkF/download-19.jpg",
  },
  {
    id: 10,
    title: "The Role of Virtual Reality in Education",
    description:
      "See how virtual reality is making learning more immersive and interactive.",
    content:
      "Virtual reality is transforming the education sector by offering interactive and engaging experiences. Explore its benefits and future applications.",
    image: "https://i.ibb.co.com/TxNyjCTP/download-17.jpg",
  },
  {
    id: 11,
    title: "How to Develop Critical Thinking Skills",
    description:
      "Learn effective ways to enhance your critical thinking abilities.",
    content:
      "Critical thinking is essential for problem-solving and decision-making. This article explores techniques to improve analytical skills.",
    image: "https://i.ibb.co.com/ccyQ74RY/download-20.jpg",
  },
  {
    id: 12,
    title: "The Importance of Soft Skills in 2025",
    description:
      "Understand why soft skills are becoming increasingly important in the modern workplace.",
    content:
      "While technical skills are crucial, soft skills like communication and teamwork are equally important. Learn which soft skills will be in demand in 2025.",
    image: "https://i.ibb.co.com/ccyQ74RY/download-20.jpg",
  },
  {
    id: 13,
    title: "How to Build a Successful Learning Habit",
    description:
      "Discover practical steps to make learning a consistent habit.",
    content:
      "Learning should be a lifelong habit. This article shares proven strategies to make continuous learning a part of your daily routine.",
    image: "https://i.ibb.co.com/nqNcs69b/download-10.jpg",
  },
  {
    id: 14,
    title: "The Future of Remote Work and Education",
    description:
      "Explore the impact of remote work on education and career development.",
    content:
      "Remote work is changing the way people learn and build careers. This blog discusses how education is adapting to this new work culture.",
    image: "https://i.ibb.co.com/pBT1GQ7T/download-5.jpg",
  },
  {
    id: 15,
    title: "The Science of Effective Learning",
    description:
      "Uncover the scientific principles behind effective learning techniques.",
    content:
      "Understanding cognitive science can improve the way we learn. This article explains key principles that make learning more effective.",
    image: "https://i.ibb.co.com/8nDd8Nkv/download-1.jpg",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-teal-700 text-center mb-10 flex items-center justify-center gap-3"
      >
        <FaRegNewspaper className="text-teal-600" /> Blog & Articles
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-teal-800 mb-3 truncate">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 truncate">{post.description}</p>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-800 transition"
                onClick={() => setSelectedPost(post)}
              >
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPost && (
        <Dialog
          open={true}
          onClose={() => setSelectedPost(null)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-teal-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
          <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-52 object-cover rounded-lg mb-5"
            />
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              {selectedPost.title}
            </h2>
            <p className="text-gray-600 mb-4">{selectedPost.content}</p>
            <button
              className="px-4 py-2 btn-outline border border-b-4 rounded-lg transition"
              onClick={() => setSelectedPost(null)}
            >
              Close
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Blog;
