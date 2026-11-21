# CampusSync ERP — Student Management System

A full-stack **College ERP & Student Management System** built with the MERN stack and Vite. Designed with Role-Based Access Control (RBAC), it provides dedicated, secure portals for **Administrators**, **Faculty**, and **Students** to streamline academic operations.

---

## Key Features

### Admin Portal
* **Dashboard Analytics:** Overview of total students, faculty, notices, courses, and departments.
* **User Management:** Register and manage Student and Faculty accounts with automated credential generation.
* **Academic Setup:** Create and organize Departments, Courses, and Class Timetables.
* **Campus Notices:** Broadcast announcements to the entire college or specific roles.

### Faculty Portal
* **Departmental Roster:** View students filtered by assigned department.
* **Attendance Tracking:** Mark daily student attendance by subject and date.
* **Marks Management:** Upload new examination results and edit/update existing student marks.
* **Class Announcements:** Publish targeted notices directly to students.

### Student Portal
* **Academic Dashboard:** View enrollment profile and overall attendance percentage.
* **Attendance Logs:** Track subject-wise daily attendance status (Present/Absent).
* **Exam Results:** View published semester marks and automatically calculated percentages.
* **Timetable & Notices:** Access department-specific class schedules and real-time college announcements.

---

## Tech Stack

* **Frontend:** React, Vite, React Router, Axios, Lucide React
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/campus-sync-erp.git](https://github.com/your-username/campus-sync-erp.git)
cd campus-sync-erp
