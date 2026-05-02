<h1 align="center">EduSphere 2.0 - Collaborative Learning Management Platform</h1>

<div align="center">
  <img src="./public/preview.png" height="400" width="800" alt="EduSphere Cover"/>
</div>

<p align="center">
  A modern, role-based EdTech platform where students can discover classes, instructors can create and manage courses, and admins can control the full moderation lifecycle.
</p>

<div align="center">

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/TanStack-React_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)

</div>

## Table of Contents

1. [Project Overview](#project-overview)
2. [Live Platform and Developer Profiles](#live-platform-and-developer-profiles)
3. [Core Features](#core-features)
4. [Role-Based Workflows](#role-based-workflows)
5. [Architecture](#architecture)
6. [Tech Stack](#tech-stack)
7. [Project Structure](#project-structure)
8. [Routes Map](#routes-map)
9. [API Usage Summary](#api-usage-summary)
10. [Environment Variables](#environment-variables)
11. [Getting Started](#getting-started)
12. [Available Scripts](#available-scripts)
13. [Security Notes](#security-notes)
14. [Deployment](#deployment)
15. [Known Limitations and Improvement Ideas](#known-limitations-and-improvement-ideas)
16. [Author](#author)
17. [License](#license)

## Project Overview

EduSphere 2.0 is a full-featured client application for an online learning ecosystem. It includes:

- Public class discovery with search and sorting.
- Firebase-powered authentication with email/password and Google social login.
- Role-based dashboards for Student, Teacher, and Admin.
- Teacher application and approval flow.
- Class moderation flow (pending, accepted, rejected).
- Stripe payment integration for enrollment.
- Assignment creation and submission pipeline.
- Teaching Evaluation Report (TER) feedback system.

This repository contains the frontend application built with React + Vite. It communicates with a deployed backend API.

## Live Platform and Developer Profiles

## Demo Credentials
 
Use the following test accounts to explore the platform without registering:
 
### 👤 Student (User)
 
| Field    | Value              |
|----------|--------------------|
| Email    | user@gmail.com     |
| Password | Password@123       |
 
### 🧑‍🏫 Teacher
 
| Field    | Value              |
|----------|--------------------|
| Email    | tahmi@gmail.com    |
| Password | Maha!1             |
 
### 🛡️ Admin
 
| Field    | Value                  |
|----------|------------------------|
| Email    | admin@edusphere.com    |
| Password | adminEdusphere!0       |

### Developer Links

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Now-111827?logo=googlechrome&logoColor=white)](https://maksudul-haque.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maksudul_Haque-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/maksudulhaque2000/)
[![Facebook](https://img.shields.io/badge/Facebook-Follow-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/maksudulhaque2000)
[![YouTube](https://img.shields.io/badge/YouTube-Subscribe-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/@maksudulhaque2000)
[![GitHub](https://img.shields.io/badge/GitHub-maksudulhaque2000-181717?logo=github&logoColor=white)](https://github.com/maksudulhaque2000)

### Frontend Repository Purpose

This client application is responsible for:

- UI rendering and responsive layouts.
- Authentication state management.
- Protected route handling.
- Payment form and transaction experience.
- Dashboard views and user interactions.
- Data fetching, caching, and UI synchronization.

## Core Features

- Dynamic Home page with multiple branded sections.
- `All Classes` page with search by title and sort by price.
- Detailed class preview page with animated UX.
- Secure enrollment flow with Stripe payment confirmation.
- Student dashboard with:
  - Enrolled class list.
  - Assignment submission.
  - Instructor feedback submission (TER).
- Teacher dashboard with:
  - Class creation.
  - Class updates and deletion.
  - Class progress analytics.
  - Assignment creation.
- Admin dashboard with:
  - Teacher request approval/rejection.
  - User management and admin promotion.
  - Global class moderation and visibility control.
- Data visualization dashboard widgets (Bar, Pie, Line charts).

## Role-Based Workflows

### 1) Guest / Public User

- Browse Home and All Classes.
- View class details.
- Access sign in and sign up pages.

### 2) Student

- Register/login (email-password or Google).
- Enroll in a class after successful Stripe payment.
- View enrolled classes from dashboard.
- Submit assignments.
- Submit instructor feedback.

### 3) Teacher

- Apply through `Teach on EduSphere` form.
- Wait for admin approval.
- Add new classes once approved.
- Track class progress and assignment stats.
- Create assignments for students.

### 4) Admin

- Review teacher applications.
- Approve or reject classes.
- Manage users (promote to admin or delete).
- Monitor system-level usage from dashboard data.

## Architecture

### Frontend

- Framework: React 18 with Vite.
- Routing: React Router (browser-based routing).
- State and API cache: TanStack React Query.
- Authentication: Firebase Auth.
- Payments: Stripe Elements.
- Styling: Tailwind CSS + DaisyUI.

### Backend (External Service)

- Connected API base URL: `https://edu-sphere-server.vercel.app`.
- JWT token issuance and validation integrated from client side.
- Protected endpoints consumed via Axios secure instance.

### Auth and Token Flow

1. User authenticates via Firebase.
2. On auth state change, client sends user email to `/jwt`.
3. Backend returns JWT token.
4. Token is saved to localStorage as `access-token`.
5. Secure Axios instance sends `Authorization: Bearer <token>` on every protected request.
6. On `401` or `403`, user is logged out and redirected to sign in.

## Tech Stack

### Frontend Core

- React
- Vite
- React Router
- TanStack React Query
- Axios

### Authentication and Security

- Firebase Authentication
- JWT-based secure API consumption
- Protected routes and role checks

### UI and UX

- Tailwind CSS
- DaisyUI
- Framer Motion
- AOS
- Lottie React
- React Icons
- SweetAlert2
- React Toastify

### Data Visualization

- Recharts

### Payment

- Stripe JS + React Stripe JS

## Project Structure

```text
src/
  assets/
    images/
    lottie/
  components/
    Payment/
      Payment.jsx
      CheckOutForm.jsx
    socialLogin/
      SocialGoogle.jsx
    Details.jsx
    DetailsPublic.jsx
    UpdateClass.jsx
  firebase/
    firebase.config.js
  hooks/
    useAuth.jsx
    useAxiosPublic.jsx
    useAxiosSecure.jsx
    useAdmin.jsx
    useTeacher.jsx
  Layout/
    MainLayout.jsx
    Dashboard/
      Dashboard.jsx
      DefaultDashboard.jsx
      Admin/
      Student/
      Teacher/
  Pages/
    Home/
    AllClasses/
    auth/
    TeachOn/
    Blog/
    Shared/
  providers/
    AuthProvider.jsx
  Routes/
    router.jsx
    PrivateRouter.jsx
    AdminRouter.jsx
```

## Routes Map

### Public Routes

- `/` -> Home
- `/allclasses` -> Public class listing
- `/allclasses/:id` -> Public class details
- `/blog` -> Blog page
- `/auth/signin` -> Sign in
- `/auth/signup` -> Sign up

### Protected Routes

- `/teachon` -> Teacher application form
- `/payment` -> Stripe payment page
- `/dashboard` -> Role-based dashboard root

### Admin Routes

- `/dashboard/teacherrequest`
- `/dashboard/allusers`
- `/dashboard/allclasseslist`

### Teacher Routes

- `/dashboard/addclass`
- `/dashboard/myclass`
- `/dashboard/myclass/:id` (update class)
- `/dashboard/myclassdetails/:id` (class progress + assignment creation)

### Student Routes

- `/dashboard/myenrollclass`
- `/dashboard/myenrollclass/:id`

## API Usage Summary

The frontend currently consumes endpoints like:

- Auth/JWT:
  - `POST /jwt`
- Users:
  - `POST /users`
  - `GET /users`
  - `GET /users/public`
  - `PATCH /users/admin/:id`
  - `GET /users/admin/:email`
  - `GET /users/teacher/:email`
  - `DELETE /users/:id`
- Teacher request:
  - `GET /teachonrequest`
  - `POST /teachonrequest`
  - `PATCH /teachonrequest/:id`
  - `PATCH /teachonrequest/acceptteacher/:id`
  - `PATCH /teachonrequest/rejectteacher/:id`
- Classes:
  - `GET /publicclasses`
  - `GET /publicclasses/:id`
  - `GET /allclasses?email=...`
  - `GET /allclasses/admin`
  - `POST /allclasses`
  - `PATCH /allclasses/:id`
  - `PATCH /allclasses/accept/:id`
  - `PATCH /allclasses/reject/:id`
  - `DELETE /allclasses/:id`
  - `GET /myclass/:id`
- Assignments and learning activity:
  - `POST /assignments`
  - `GET /assignments/:classId`
  - `POST /assignmentsubmission`
  - `POST /feedback`
  - `GET /myenrollclasses?email=...`
- Payment:
  - `POST /create-payment-intent`
  - `POST /payment`

## Environment Variables

Create a `.env.local` file in the project root.

```bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_Payment_Gateway_PK=your_stripe_publishable_key
```

Notes:

- Firebase config values are required by `src/firebase/firebase.config.js`.
- Stripe publishable key is required by `src/components/Payment/Payment.jsx`.
- API base URL is currently hardcoded in:
  - `src/hooks/useAxiosPublic.jsx`
  - `src/hooks/useAxiosSecure.jsx`

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn
- A Firebase project with Email/Password and Google auth providers enabled
- A Stripe account and publishable key
- Backend API running and accessible

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/EduSphere-2.0.git
cd EduSphere-2.0
```

2. Install dependencies:

```bash
npm install
```

3. Add environment variables in `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open the shown local URL (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` -> Start development server
- `npm run build` -> Create production build
- `npm run preview` -> Preview production build locally
- `npm run lint` -> Run ESLint checks

## Security Notes

- JWT token is stored in localStorage (`access-token`) and attached to secure requests.
- Unauthorized/forbidden API responses trigger forced logout.
- Admin routes are protected with role validation hooks.
- Stripe card details are handled with Stripe Elements (card data is never stored directly in this frontend code).

## Deployment

### Client Deployment Options

- Vercel
- Netlify
- Firebase Hosting

### Recommended Deployment Steps

1. Build the project: `npm run build`
2. Upload/deploy the `dist` folder
3. Configure environment variables in deployment platform
4. Add SPA rewrite rules so all routes resolve to `index.html`

### Backend and CORS

- Ensure backend allows your frontend domain in CORS settings.
- Ensure Stripe secret operations remain on backend only.

## Known Limitations and Improvement Ideas

- API base URL is hardcoded; moving it to environment variables is recommended.
- Some components call `refetch()` too aggressively; optimization can reduce network overhead.
- Form validation can be centralized for cleaner maintainability.
- Unit and integration tests are not yet included in this repository.
- Role guards can be extended for teacher-only route wrapper consistency.

## Author

**Maksudul Haque**

- Portfolio: https://maksudul-haque.vercel.app/
- LinkedIn: https://www.linkedin.com/in/maksudulhaque2000/
- Facebook: https://www.facebook.com/maksudulhaque2000
- YouTube: https://www.youtube.com/@maksudulhaque2000
- GitHub: https://github.com/maksudulhaque2000

## License

This project is currently not published with a dedicated license file.
If you plan to make it open source, add a `LICENSE` file (for example MIT).
