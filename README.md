# 🚀 SmartHire AI - Recruitment Platform

SmartHire AI is an advanced recruitment automation system designed to streamline the hiring process. By leveraging large language models (LLMs), it provides deep candidate analysis, automated scoring, and comprehensive bias detection to ensure a fair and efficient recruitment workflow.

## ✨ Features

### 🎯 **Core Functionality**
- **Resume Upload & Processing**: Support for PDF and DOCX formats with drag-and-drop interface
- **AI-Powered Analysis**: Google Gemini SDK integration for intelligent candidate evaluation
- **Automated Scoring**: Relevance scores and categorization (Highly Qualified, Qualified, Not a Fit)
- **Interactive Dashboard**: Filter, sort, and view detailed candidate analysis with beautiful animations
- **HR Query Assistant**: AI chatbot for asking questions about candidates and getting insights
- **Candidate Chat**: Individual AI conversations about specific candidates

### 🛡️ **Privacy-First & Fair Screening**
- **PII Anonymization**: Automatically removes Personal Identifiable Information (Names, Emails, Phones) before sending data to external AI, ensuring 100% data privacy.
- **Automated Bias Analysis**: Detects gender, age, location, and education bias in resumes.
- **Blind Recruitment Mode**: Analyzes resumes with bias mitigation locally.
- **Full Data Preservation**: Original contact info is stored locally and restored to your dashboard after AI analysis.

### 🎨 **Modern UI/UX**
- **Beautiful Animations**: Smooth transitions using Framer Motion.
- **Responsive Design**: Works perfectly on all devices.
- **Dark/Light Theme**: Modern gradient backgrounds and glass morphism effects.

## 🏗️ Architecture

### Backend (Flask)
- **File Processing**: PyPDF2 and python-docx for text extraction.
- **AI Integration**: Official **Google Generative AI SDK** with smart model selection (Gemini 2.0 Flash/Pro).
- **Privacy Engine**: Local anonymization layer to protect candidate data.
- **Database**: SQLite for local storage of full candidate data and AI insights.

### Frontend (React)
- **Modern React**: React 18 with functional components.
- **Styling**: TailwindCSS with custom animations.
- **Animations**: Framer Motion for premium-feel interactions.

## 🚀 Quick Start (Windows)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AI-powered-Resume-Screener-Bot-main
```

### 2. Backend Setup
```bash
cd backend
# Run the installation script to setup the virtual environment and SDK
install_sdk.bat
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Run the Application
1. **Start Backend**: Double-click `backend/run_backend.bat`.
2. **Start Frontend**: Run `npm start` in the `frontend` folder.

## 🔧 Configuration (.env)

Create a `.env` file in the `backend` directory:

```env
# Gemini Configuration (Official SDK)
GEMINI_API_KEY=your_gemini_api_key_here

# Application Configuration
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_URL=sqlite:///resume_screener.db
```

### API Keys Setup

#### OpenAI Setup (Recommended)
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create account and navigate to API Keys
3. Generate a new API key
4. Add to `.env` file as `OPENAI_API_KEY`

#### Gemini Setup (Alternative)
1. Obtain Gemini API key from your provider
2. Add to `.env` file as `GEMINI_API_KEY`
3. Configure the endpoint URL

## 📖 Usage Guide

### 1. **Upload Resumes**
- Navigate to "Upload Resume" in the navigation
- Drag and drop a PDF or DOCX file (or click to browse)
- Optionally add a job description for better matching
- Click "Upload & Analyze Resume"
- Watch the beautiful upload progress animation

### 2. **Dashboard Overview**
- View key statistics and metrics
- See recent candidates with quick actions
- Access all major features from the dashboard
- Beautiful cards with hover animations

### 3. **Candidate Management**
- Browse all candidates with advanced filtering
- Sort by score, name, experience, or upload date
- Search by name or skills
- Filter by qualification category
- View detailed candidate profiles

### 4. **AI Analysis**
- Comprehensive candidate evaluation
- Skills extraction and matching
- Experience level assessment
- Strengths and weaknesses analysis
- Hiring recommendations

### 5. **Bias Detection**
- Automatic bias analysis for all candidates
- View bias scores by category (gender, age, location, education)
- Access blind resume versions
- Get bias mitigation recommendations
- Toggle fair screening mode

### 6. **HR Assistant**
- Interactive AI chatbot for HR queries
- Ask questions like:
  - "Who are the top 5 candidates for Data Scientist role?"
  - "Show me candidates with Python and React skills"
  - "What's the average experience level?"
  - "Compare candidates for a senior developer position"

### 7. **Candidate Chat**
- Individual AI conversations about specific candidates
- Ask detailed questions about qualifications
- Get insights about cultural fit
- Explore specific skills and experience

## 🔌 API Endpoints

### Resume Management
- `POST /api/upload` - Upload and analyze resume (Privacy-Protected)
- `GET /api/candidates` - Get all candidates with filtering
- `GET /api/candidates/<id>` - Get specific candidate details

### AI Chat & Assistance
- `POST /api/chat` - Chat about specific candidate
- `POST /api/hr-chat` - General HR queries using the full candidate pool

### System & Analytics
- `GET /api/health` - Health check endpoint
- `GET /api/statistics` - Application statistics and metrics

## 🎨 UI Components & Animations

### Animation Features
- **Page Transitions**: Smooth slide animations between routes
- **Loading States**: Beautiful spinners and skeleton screens
- **Hover Effects**: Interactive button and card hover animations
- **Progress Indicators**: Animated upload progress and bias score meters
- **Micro-interactions**: Button clicks, form interactions, and feedback

### Design System
- **Color Palette**: Primary blues, success greens, warning oranges, danger reds
- **Typography**: Inter font family with proper font weights
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Shadows**: Layered shadow system for depth and hierarchy
- **Border Radius**: Consistent rounded corners throughout the app

## 🧪 Development

### Project Structure
```
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── install_sdk.bat        # Standardized one-click installer
│   ├── run_backend.bat        # Safely run the backend on Windows
│   ├── services/
│   │   ├── gemini_service.py  # Official Google AI SDK integration
│   │   ├── resume_parser.py   # Local text & PII extraction
│   │   └── bias_detection.py  # Anonymization & Bias engine
├── frontend/
│   ├── src/                   # React source code
```

### Adding New Features

#### Backend Features
1. Add new endpoints in `app.py`
2. Create service functions in `services/`
3. Update database models if needed
4. Add proper error handling and validation

#### Frontend Features
1. Create new components in `components/`
2. Add new pages in `pages/`
3. Update routing in `App.js`
4. Add API calls using the service layer

### Code Style Guidelines
- **Python**: Follow PEP 8 standards
- **JavaScript**: Use ES6+ features and functional components
- **CSS**: Use Tailwind utility classes with custom CSS for complex animations
- **Comments**: Document complex logic and API integrations

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues
1. **OpenAI API Errors**
   - Verify API key in `.env` file
   - Check OpenAI service status
   - Ensure sufficient credits in OpenAI account
   - Check rate limits and usage quotas

2. **File Upload Issues**
   - Verify file size (max 16MB)
   - Check file format (PDF/DOCX only)
   - Ensure `uploads/` directory exists and is writable
   - Check disk space availability

3. **Database Issues**
   - Ensure SQLite is properly installed
   - Check database file permissions
   - Verify database initialization

#### Frontend Issues
1. **Connection Issues**
   - Verify backend server is running on port 5000
   - Check CORS settings in Flask app
   - Confirm API_BASE_URL in config.js

2. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify all CSS imports

### Performance Optimization
- **Backend**: Implement caching for AI responses
- **Frontend**: Use React.memo for expensive components
- **Database**: Add indexes for frequently queried fields
- **Files**: Implement file compression for large uploads


Contact: Mohamed Afrath - mohamednaseermohamedafrath@gmail.com    Anshath Ahamed Ajumil - anshath7@gmail.com Mohamed Nawran - mhdnawran4@gmail.com    Sharaf Sahir - sharafsakeer3333@gmail.com 

## 📄 License

This project is licensed under the MIT License.

