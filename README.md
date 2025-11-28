# SafeSpace 🛡️

**AI-Powered Digital Violence Prevention Platform**

[![Power Hacks 2025](https://img.shields.io/badge/Power%20Hacks-2025-purple)](https://powerhacks.africa)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **UNiTE to End Digital Violence Against All Women & Girls**

SafeSpace is a comprehensive digital safety platform that empowers individuals to prevent, detect, and respond to online harassment and violence. Built by **Team SafeHaven** during Power Hacks 2025, our mission is to make digital spaces safer for everyone, with a special focus on protecting women and girls across Africa.

---

## 🎯 The Problem

Digital violence is rapidly escalating across Africa:

- **73%** of women online experience some form of harassment
- **1 in 3** women face cyberbullying annually
- **58%** don't report incidents due to lack of safe platforms
- Rising cases of doxxing, blackmail, image-based abuse, and AI-generated harassment

Traditional reporting mechanisms are slow, intimidating, and often ineffective. Victims need immediate, anonymous, and intelligent tools to protect themselves.

---

## ✨ Our Solution

SafeSpace combines AI technology, community support, and policy advocacy to create a comprehensive safety ecosystem:

### 🤖 AI-Powered Detection
Real-time content analysis to identify harmful language, threats, and harassment patterns across digital platforms.

### 🛡️ Anonymous Reporting
Submit incidents safely without revealing your identity. Evidence is encrypted and securely stored.

### 📊 Community Dashboard
Track trends, see collective impact, and access resources. Policymakers get aggregated insights for better decision-making.

### 📚 Digital Literacy Hub
Interactive modules teaching online safety, privacy protection, and digital rights.

### 🚨 Emergency Response
One-click access to support resources, hotlines, and emergency services.

### 🌍 Multi-Language Support
Available in English, Swahili, French, and more African languages.

### 📴 Offline Capability
Core features work without internet connection, syncing when back online.

---

## 🎨 Key Features

- **Real-Time AI Detection** - Spots harassment before it escalates
- **Secure Evidence Storage** - Military-grade encryption for all data
- **Anonymous Reporting** - Complete privacy protection
- **Community Moderation** - Collective safety through shared insights
- **Educational Resources** - Learn to protect yourself online
- **Emergency Support** - Instant access to help when you need it
- **Works Offline** - Safety even without internet
- **Pan-African Focus** - Built by Africans, for African communities

---

## 🛠️ Technology Stack

### Frontend
- **Flutter** - Cross-platform mobile development (iOS, Android, Web)
- **Material Design 3** - Modern, accessible UI
- **Provider** - State management
- **Dart** - Programming language

### Backend
- **Python 3.11+** - Core language
- **FastAPI** - High-performance web framework
- **PostgreSQL** - Reliable relational database
- **Redis** - Caching and real-time sessions

### AI/ML
- **Hugging Face Transformers** - Natural Language Processing models
- **Perspective API** - Content moderation and toxicity detection
- **TensorFlow** - Machine learning inference
- **Custom ML Models** - Trained on African language contexts

### Security
- **JWT** - Secure authentication tokens
- **AES-256** - Data encryption at rest
- **HTTPS/TLS** - Secure data transmission
- **End-to-End Encryption** - For sensitive evidence

### Infrastructure
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Railway/Render** - Cloud hosting
- **Cloudinary** - Media storage

---

## 🚀 Quick Start

### Prerequisites
- Flutter SDK (3.16.0+)
- Python (3.11+)
- PostgreSQL (15+)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Cynthia-M-M/safespace-ui-kit.git
cd safespace-ui-kit

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload

# Frontend setup (new terminal)
cd ../frontend
flutter pub get
flutter run
```

Backend runs at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

---

## 📊 Impact Metrics

### Projected Impact (Year 1)
- **50,000+** users protected across Africa
- **10,000+** incidents reported safely
- **85%** faster response time vs traditional methods
- **200+** communities engaged
- **10** African countries reached

### Sustainability Model
- Partnership with NGOs and women's rights organizations
- Government integration for policy insights
- Community-driven moderation
- Educational institution partnerships

---

## 🎯 Challenge Alignment

**Challenge Area:** Safety by Design

**How We Excel:**

### Innovation & Creativity (25%)
- ✅ AI-powered prevention (proactive, not reactive)
- ✅ Multi-stakeholder platform (users, moderators, policymakers)
- ✅ African-context design with local language support
- ✅ Offline-first architecture for low-connectivity areas

### Security & Fault Tolerance (15%)
- ✅ End-to-end encryption for all sensitive data
- ✅ Secure evidence handling with tamper-proof timestamps
- ✅ Privacy by design - anonymous reporting capabilities
- ✅ Regular security audits and penetration testing

### Performance (20%)
- ✅ Offline-first architecture
- ✅ Fast load times optimized for 2G/3G networks
- ✅ Efficient resource usage
- ✅ Progressive Web App capabilities

### Development Process (25%)
- ✅ Agile methodology with daily standups
- ✅ Clear documentation and code comments
- ✅ Strong team collaboration across roles
- ✅ Version control with Git best practices

### Documentation & Testing (15%)
- ✅ Comprehensive README with setup instructions
- ✅ API documentation with Swagger/OpenAPI
- ✅ User guides for end users
- ✅ Unit and integration tests

---

## 📁 Project Structure

```
safespace-ui-kit/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   └── main.py          # App entry point
│   ├── tests/               # Backend tests
│   └── requirements.txt
│
├── frontend/
│   ├── lib/
│   │   ├── models/          # Data models
│   │   ├── screens/         # UI screens
│   │   ├── widgets/         # Reusable components
│   │   ├── services/        # API services
│   │   ├── providers/       # State management
│   │   └── main.dart        # App entry point
│   ├── assets/              # Images, fonts
│   └── pubspec.yaml
│
├── docs/
│   ├── API.md               # API documentation
│   ├── USER_GUIDE.md        # User manual
│   └── SETUP.md             # Setup instructions
│
└── README.md
```

---

## 👥 Team SafeHaven

**Power Hacks 2025 Team**

A diverse team of 6 passionate individuals united by the mission to end digital violence:

- **Project Manager** - Coordinating efforts and ensuring timely delivery
- **Backend Developers (2)** - Building robust API and AI integration
- **Frontend Developers (2)** - Creating intuitive mobile experience
- **Designer & Documentation Specialist** - Crafting user-centered design and comprehensive docs

Together, we bring expertise in software development, AI/ML, UI/UX design, and social impact.

---

## 📄 Documentation

- **[User Guide](docs/USER_GUIDE.md)** - How to use SafeSpace
- **[API Documentation](docs/API.md)** - Developer reference and endpoints
- **[Setup Guide](docs/SETUP.md)** - Detailed installation instructions
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project

---

## 🔗 Important Links

- **GitHub Repository:** https://github.com/Cynthia-M-M/safespace-ui-kit
- **Pitch Deck:** https://gamma.app/docs/SafeSpace-0vrhpvr6qsyoeqx
- **Demo Video:** [https://youtu.be/jesTOyxywf0]
- **Live Demo:** [<video controls src="safespace powerpoint.pptx.mp4" title="Title"></video>]

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## 📞 Contact & Support

- **Team Email:** chepkiruibetty64@gmail.com
- **GitHub Issues:** https://github.com/Cynthia-M-M/safespace-ui-kit/issues
- **Twitter:** @SafeSpaceApp

### Emergency Resources

If you're experiencing digital violence, please reach out:

- **Kenya GBV Helpline:** 1195
- **Nigeria:** 0800-CALLGBV
- **South Africa:** 0800-150-150
- **International:** UN Women Helpline

---

## 🙏 Acknowledgments

- **Power Hacks 2025** organizers for creating this platform for innovation
- **UN Women** for the UNiTE campaign that inspired our mission
- **African communities** on the frontlines of fighting digital violence
- **Open-source contributors** whose tools and libraries made this possible
- **Beta testers** who provided invaluable feedback

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Our Vision

We envision a digital world where everyone, especially women and girls, can participate freely without fear of harassment or violence. SafeSpace is our contribution to making that vision a reality, one user at a time, one community at a time, across the African continent and beyond.

---

**Together, we end digital violence.**  
**Build Safe. Build Bold.** ✊🏿💡

---

*Developed by Team SafeHaven*  
*Power Hacks 2025 Submission*  
*Challenge: Safety by Design*  
*Last updated: November 28, 2025*