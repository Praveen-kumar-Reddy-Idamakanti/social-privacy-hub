# Social Privacy Hub

A comprehensive dashboard for monitoring and managing your social media privacy settings across multiple platforms. The application provides a unified interface to view privacy scores, detect potential security issues, and receive personalized recommendations for enhancing your online privacy.

## ✨ Features

- **Unified Dashboard**: View all connected social media accounts in one place
- **Privacy Scoring**: Get a privacy score for each connected platform
- **Security Alerts**: Receive notifications about potential privacy risks
- **Password Breach Checker**: Verify if your credentials have been compromised in data breaches
- **Privacy Controls**: Manage your privacy settings across platforms
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**:
  - React 18 with TypeScript
  - Vite for fast development and building
  - Radix UI components
  - Tailwind CSS for styling
  - React Query for data fetching and state management
  - React Router for navigation

- **Backend**:
  - Node.js with Express
  - JWT for authentication

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/social-privacy-hub.git
   cd social-privacy-hub
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=5000
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

4. **Start the development servers**
   ```bash
   # From the project root, start both frontend and backend
   npm run dev
   ```
   
   Or start them separately:
   ```bash
   # In one terminal (backend)
   cd backend
   npm start
   
   # In another terminal (frontend)
   cd frontend
   npm run dev
   ```

5. **Open the application**
   The frontend will be available at `http://localhost:5173`

## 📂 Project Structure

```
social-privacy-hub/
├── backend/              # Backend server code
│   ├── node_modules/
│   ├── .env             # Environment variables
│   ├── package.json
│   └── server.js        # Main server file
├── frontend/            # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utility functions
│       ├── App.tsx       # Main App component
│       └── main.tsx      # Application entry point
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security

- JWT-based authentication
- Secure password hashing
- Environment variables for sensitive data
- CORS protection
- Rate limiting (recommended for production)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by [Your Name]
