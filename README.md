# EduSphere - Educational Platform Client

## 🎓 About

EduSphere is a comprehensive MERN stack-based educational platform that connects students with expert teachers, facilitating seamless learning experiences through structured courses and interactive features.

## 🌐 Live Site

[EduSphere Platform](https://edusphere-521cf.web.app/)

## ⚙️ Admin Credentials

- **Email:** admin@edusphere.com
- **Password:** adminEdusphere!0

[Rest of the content remains the same, with "EduManage" replaced with "EduSphere" throughout]

## ✨ Key Features

1. **Dynamic User Roles & Dashboard**

   - Student dashboard with enrollment tracking and assignment submission
   - Teacher dashboard with course management and progress monitoring
   - Admin dashboard with comprehensive control and oversight
   - Real-time role transitions and permission updates

2. **Homepage Features**

   - Dynamic banner/carousel with relevant educational images
   - Partner/collaborator showcase section
   - Popular classes section based on highest enrollment
   - Teacher feedback carousel
   - Statistics section showing total users, classes, and enrollments
   - Teacher recruitment section
   - Additional relevant sections for enhanced user engagement

3. **Authentication & Security**

   - JWT-based secure authentication system
   - Protected routes and API endpoints
   - Social login integration with Google
   - Persistent login state across page reloads
   - Error handling and validation

4. **Course Management System**

   - Detailed class cards with comprehensive information
   - Private route protected class details page
   - Secure payment integration for enrollment
   - Assignment creation and submission system
   - Progress tracking and reporting

5. **Teacher Application System**

   - Comprehensive application form with experience levels
   - Multiple teaching categories
   - Admin review and approval workflow
   - Status tracking and updates
   - Request resubmission functionality

6. **Student Features**

   - Enrollment management
   - Assignment submission system
   - Progress tracking
   - Teaching Evaluation Report (TER)
   - Course feedback system

7. **Admin Control Panel**

   - User role management
   - Teacher application processing
   - Course approval system
   - Progress monitoring
   - User search functionality

8. **Interactive UI Components**

   - Sweet alerts for all CRUD operations
   - Dynamic loading states
   - Responsive design for all devices
   - User-friendly navigation
   - Modal interfaces for forms

9. **Data Management**

   - TanStack Query for efficient data fetching
   - Pagination implementation
   - Real-time updates
   - Search functionality
   - Sorting and filtering options

10. **Additional Features**
    - PDF invoice generation
    - Animation implementations
    - Axios interceptor
    - Search functionality in navbar
    - Responsive design across all pages

## 🛠️ Technologies Used

- React.js 18
- TanStack Query v4
- Firebase Authentication
- Axios
- React Router DOM v6
- Tailwind CSS
- DaisyUI
- React Hook Form
- Sweet Alert 2
- React Rating
- Framer Motion
- jsPDF
- AOS Animation

## 🚀 Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/edumanage-client.git
   ```
2. Install dependencies
   ```bash
   cd edumanage-client
   npm install
   ```
3. Create `.env` file and add necessary environment variables
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_messaging_sender_id
   VITE_appId=your_app_id
   VITE_SERVER_URL=your_server_url
   ```
4. Run the development server
   ```bash
   npm run dev
   ```

## 📝 Environment Variables

- VITE_apiKey
- VITE_authDomain
- VITE_projectId
- VITE_storageBucket
- VITE_messagingSenderId
- VITE_appId
- VITE_SERVER_URL

## 📂 Project Structure

```
src/
├── components/
│   ├── shared/
│   ├── dashboard/
│   └── home/
├── pages/
│   ├── Home/
│   ├── Dashboard/
│   └── Authentication/
├── hooks/
├── contexts/
├── utils/
├── assets/
└── routes/
```

## 🔐 Security Implementations

- Protected routes using React Router
- JWT token management
- Form validation
- Error boundaries
- Secure data transmission

## ⚡ Performance Optimizations

- Lazy loading of components
- Image optimization
- Caching strategies
- Code splitting
- Efficient state management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [maksudulhaque](EduSphere. All Rights Reserved.) file for details

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com)
