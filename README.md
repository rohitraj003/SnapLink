# ⚡ SnapLink - High-Performance URL Shortener

SnapLink is a lightning-fast, scalable URL shortening service designed for high availability and low latency. It leverages **Redis caching** to ensure instant redirects and **Base62 encoding** with atomic counters to generate mathematically unique, collision-free short links.

**✨ Key Features**

**1. Secure Authentication**

Robust user management system handling secure Signup and Login. User passwords are encrypted using Bcrypt, and sessions are managed via JSON Web Tokens (JWT).


**2. Lightning-Fast Redirects**

Optimized for speed. The system prioritizes the "Read" path by checking the high-speed Redis cache first.
* **Cache Hit:** Redirects happen instantly (in-memory).
* **Cache Miss:** Fetches from MongoDB, caches the result for next time, and redirects.


**3. Collision-Free Shortening**

Uses a smart **Distributed ID Counter** strategy instead of random hashing.
* **Mechanism:** A Redis atomic counter generates a unique ID, which is then converted into a 7-character Base62 string.

**4. Abuse Prevention (Rate Limiting)**

Protects the system from spam and overload.
* **Limits:** Users are restricted to a set number of requests (e.g 10 links per minute).

**5. User Dashboard**

A clean, responsive interface where users can paste long URLs, generate short links instantly, and manage their link history.


**🛠️ Tech Stack**

* **Frontend:** React.js (Vite), CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB 
* **Caching:** Redis
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt

**🚀 Getting Started**

Follow these steps to set up the project locally.

**Prerequisites**

* Node.js (v14 or higher)
* MongoDB (Local or Atlas)
* Redis Server (Local, Docker, or Cloud)

**Installation**

**1. Clone the repository**
> ```bash
> git clone [https://github.com/rohitraj003/SnapLink.git]
> cd SnapLink
> ```

**2. Backend Setup**

> Navigate to the backend folder and install dependencies.
> ```bash
> cd backend
> npm install
> ```

**3. Configure Backend Environment**

> Create a `.env` file in the `backend/` directory and add the following:
>
> ```env
> PORT=
> MONGO_URI=
> REDIS_URL=
> JWT_SECRET=
> BASE_URL=
> ```

**4. Start the Server**

> ```bash
> npm run dev
> ```

**5. Frontend Setup**

> Open a new terminal, navigate to the frontend folder, and install dependencies.
> ```bash
> cd ../frontend
> npm install
> ```

**6. Run the Frontend**

> ```bash
> npm run dev
> ```
