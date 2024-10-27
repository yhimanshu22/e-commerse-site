# E-Commerce Site

This is a simple e-commerce site with backend deployed on Render and frontend deployed on Vercel. The backend uses PostgreSQL, also hosted on Render. Follow the steps below to set up the project locally.

---

## Project Setup Instructions

### 1. Prerequisites
- **Node.js** and **npm** installed on your system.
- **Git** installed to clone the repository.

### 2. Clone the Repository

1. Open a terminal window.
2. Navigate to the directory where you want to clone the project:
   ```bash
   cd path/to/your/directory
   git clone https://github.com/himanshuyadav/e-commerce-site.git
   ```
### 3.Backend Setup:
   ```bash
   cd e-commerce-site/backend
   npm install

   .env file------

   DB_HOST=your_database_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=database_port
   PORT=backend_port
   JWT_SECRET=your_jwt_secret

   node server.js
   ```

### 4.Frontend Setup

Navigate to the Frontend Directory:
```bash
cd ../frontend
npm install
npm run dev
```

### 5. Open the Application:
   
Your backend server should be running at the port specified in the .env file.  
The frontend server is running on http://localhost:5173 by default.  

### Deployment Information: 
Backend: Deployed on Render, including the PostgreSQL database.  
Frontend: Deployed on Vercel.  

### Notes :
Ensure your .env variables are correctly set for the backend to connect to the PostgreSQL database.  
The frontend may require updates to the API URL to match your local or deployed backend server URL.  
   

