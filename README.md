# VoiceArtistry - MEAN Stack Voice Over Portfolio

A professional voice over portfolio website built with the MEAN stack (MongoDB, Express.js, Angular/React, Node.js).

## Features

- **Professional Portfolio**: Showcase voice over samples and services
- **Contact Form**: Integrated contact form with email notifications
- **Voice Recording**: Client voice sample recording and upload
- **Database Integration**: MongoDB for data persistence
- **File Upload**: Voice recording storage and management
- **Email Notifications**: Automated email responses
- **Admin Dashboard**: Contact and recording management
- **Authentication**: JWT-based user authentication
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form handling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voiceartistry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/voiceartistry
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   
   # Email Configuration (Optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=admin@voiceartistry.com
   
   # Client URL
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   
   **Development mode (both frontend and backend):**
   ```bash
   npm run dev:full
   ```
   
   **Or run separately:**
   ```bash
   # Frontend (port 5173)
   npm run dev
   
   # Backend (port 3001)
   npm run dev:server
   ```

## API Endpoints

### Contact Routes
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/all` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `PATCH /api/contact/:id/status` - Update contact status

### Voice Recording Routes
- `POST /api/voice/upload/:contactId` - Upload voice recording
- `GET /api/voice/:recordingId` - Get voice recording file
- `DELETE /api/voice/:recordingId` - Delete voice recording
- `GET /api/voice/` - Get all recordings (admin)

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

## Database Schema

### Contact Model
- Personal information (name, email, phone)
- Project details (type, length, budget, deadline)
- Voice preferences (accent, tone)
- Status tracking
- Voice recording reference

### Voice Recording Model
- File information (filename, path, size)
- Audio metadata (duration, quality)
- Contact reference
- Upload timestamp

### User Model
- Authentication (email, password)
- Profile information
- Role-based access (admin, client)

## File Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── services/          # API client and services
│   ├── data/              # Static data and types
│   └── types/             # TypeScript type definitions
├── server/                # Backend Node.js application
│   ├── models/            # MongoDB models
│   ├── routes/            # Express routes
│   └── uploads/           # Voice recording storage
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Features in Detail

### Voice Recording System
- Browser-based audio recording using Web Audio API
- Real-time recording timer and controls
- Audio playback and download functionality
- Automatic upload to server with progress tracking
- File validation and size limits

### Contact Management
- Comprehensive contact form with validation
- Email notifications to admin and client
- Status tracking (new, reviewed, quoted, etc.)
- Integration with voice recordings

### Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting for API endpoints
- CORS configuration
- Security headers with Helmet
- File upload validation

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment
Deploy to services like Heroku, DigitalOcean, or AWS:
1. Set environment variables
2. Ensure MongoDB connection
3. Configure file storage (consider cloud storage for production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.