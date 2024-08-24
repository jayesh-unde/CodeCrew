
<h1>About the Project</h1><br>
CodeCrew is an innovative online coding platform designed to empower developers to practice, compete, and showcase their coding skills. It provides a comprehensive environment where users can write, execute, and share code with others. The platform includes multiple features like a coding playground, a coding arena for problem-solving, and a battleground for competitive programming.


# Live Link
https://codecrew.onrender.com

**Key Features**
Coding Playground: A real-time code editor with support for multiple programming languages, allowing users to write and execute code with custom inputs.
Coding Arena: A repository of coding challenges where users can practice and solve problems. Users can also upload their own problems.
Coding Battleground: A competitive environment where users can participate in live coding contests, view real-time leaderboards, and even host their own contests.

**Built With**

MongoDB: Database for storing user data and coding problems.<br>
Express.js: Web application framework for the backend.<br>
React.js: Frontend library for building user interfaces.<br>
Node.js: Server-side runtime environment.<br>

**Getting Started**
To get a local copy up and running, follow these simple steps.

**Prerequisites**
Ensure you have the following installed:

Visual Studio Code (VSCode)
Operating System: Windows, Linux, or macOS
Node.js & npm: For running and managing project dependencies
Git: For cloning the repository

<h2>Installation : - </h2>

Step 1 : 
Clone the repository:
git clone link
Navigate to the frontend directory:

Step2 : 
cd CodeCrew/frontend
Install frontend dependencies:

Step3 : 
npm install
Run the frontend:

Step 4 : 
npm run dev
Navigate to the backend directory:

Step 5 : 
cd ../backend
Install backend dependencies:

Step 6 :  
npm install
Create a .env file in the backend directory:

Step 7: 
touch .env
Add the following environment variables to the .env file:

Step 8 : 
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
JWT_SECRET=your_jwt_secret
NODE_ENV=development
Run the backend server:

Step 9 : 
nodemon server.js

<h2>Usage</h2>
After setting up the environment, you can start using the CodeCrew platform by navigating to http://localhost:3000 in your web browser. Explore the coding playground, practice problems in the arena, or join a live coding contest in the battleground.
