



````markdown
# 📱 Phone Hub  

Phone Hub is a full-stack mobile phone marketplace web application built with **Next.js, MongoDB, and NextAuth.js**.  
It allows users to browse phones, authenticate (login/signup), and manage their accounts securely.  

---

## 🚀 Features  
- 🔐 **Authentication** with NextAuth.js (Email/Password, Google, etc.)  
- 🛡️ Protected routes (e.g., Profile page)  
- 📱 Mobile-friendly responsive design  
- ☁️ Cloud database with MongoDB Atlas  
- ⚡ Deployed on Vercel for fast performance  

---

## ⚙️ Setup & Installation  

Follow these steps to run the project locally:  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/phone-hub.git
cd phone-hub
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the root directory and add:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# MongoDB
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=phonehub
```

⚠️ When deploying to **Vercel**, update `NEXTAUTH_URL`:

```env
NEXTAUTH_URL=https://phone-hub-nu.vercel.app
```

👉 To generate a secret, run:

```bash
openssl rand -base64 32
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Your app will be available at:
👉 [http://localhost:3000](http://localhost:3000)

### 5️⃣ Build for production

```bash
npm run build
npm start
```

---

## 🛣️ Route Summary

| Route                     | Method | Description                 |
| ------------------------- | ------ | --------------------------- |
| `/`                       | GET    | Home page                   |
| `/login`                  | GET    | Login page                  |
| `/signup`                 | GET    | Signup page                 |
| `/profile` (protected)    | GET    | User profile dashboard      |
| `/api/auth/[...nextauth]` | POST   | NextAuth authentication API |
| `/api/phones` (if added)  | GET    | Fetch all phones            |

---

## 🌍 Deployment

* Hosted on **Vercel**: [https://phone-hub-nu.vercel.app](https://phone-hub-nu.vercel.app)
* Backend handled by **Next.js API routes**
* Database: **MongoDB Atlas**

---

## 🧪 Demo Login Credentials (Optional)

For testing without signup, you can use:

```
Email: demo@phonehub.com
Password: 123456
```



## 👨‍💻 Author

**Md. Alamin**

* 📧 Email: [mdalaminweb.1@gmail.com](mailto:mdalaminweb.1@gmail.com)


---





