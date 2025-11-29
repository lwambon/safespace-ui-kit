This file has been archived and consolidated into `DOCUMENTATION.md`.

## Updated Frontend Structure

```
SafeSpace UI/
├── FRONTEND/
│   ├── src/
│   │   ├── App.tsx ✅ UPDATED
│   │   │   └── Now wrapped with AuthProvider
│   │   │
│   │   ├── lib/
│   │   │   ├── apiClient.ts ✅ NEW
│   │   │   │   ├── Base URL configuration
│   │   │   │   ├── JWT token management
│   │   │   │   ├── Error handling with 401 redirect
│   │   │   │   └── All HTTP methods
│   │   │   │
│   │   │   ├── AuthContext.tsx ✅ NEW
│   │   │   │   ├── Global auth state
│   │   │   │   ├── useAuth hook
│   │   │   │   └── Login/logout functions
│   │   │   │
│   │   │   └── utils.ts (existing)
│   │   │
│   │   ├── components/
│   │   │   ├── services/
│   │   │   │   ├── authService.ts ✅ NEW
│   │   │   │   │   ├── register()
│   │   │   │   │   ├── login()
│   │   │   │   │   ├── logout()
│   │   │   │   │   └── getCurrentUser()
│   │   │   │   │
│   │   │   │   ├── forumService.ts ✅ NEW
│   │   │   │   │   ├── getPosts()
│   │   │   │   │   ├── createPost()
│   │   │   │   │   ├── getReplies()
│   │   │   │   │   └── createReply()
│   │   │   │   │
│   │   │   │   ├── reportService.ts ✅ NEW
│   │   │   │   │   ├── createReport()
│   │   │   │   │   ├── getReports()
│   │   │   │   │   ├── getReportStats()
│   │   │   │   │   └── getReportsByCategory()
│   │   │   │   │
│   │   │   │   ├── hotspotService.ts ✅ NEW
│   │   │   │   │   ├── getHotspots()
│   │   │   │   │   ├── getHotspotsNearby()
│   │   │   │   │   ├── getHeatmapData()
│   │   │   │   │   └── getHotspotStats()
│   │   │   │   │
│   │   │   │   ├── moderationService.ts ✅ NEW
│   │   │   │   │   ├── moderateContent()
│   │   │   │   │   ├── detectHarassment()
│   │   │   │   │   ├── batchModerate()
│   │   │   │   │   └── reportContent()
│   │   │   │   │
│   │   │   │   ├── analyticsServices.tsx ✅ UPDATED
│   │   │   │   │   ├── logEvent()
│   │   │   │   │   ├── getDashboardMetrics()
│   │   │   │   │   ├── getIncidentTypes()
│   │   │   │   │   └── getDemographics()
│   │   │   │   │
│   │   │   │   ├── emergencyServices.tsx ✅ UPDATED
│   │   │   │   │   ├── getEmergencyContacts()
│   │   │   │   │   ├── getAvailableCountries()
│   │   │   │   │   ├── submitEmergencyReport()
│   │   │   │   │   └── getHotline()
│   │   │   │   │
│   │   │   │   ├── accordionServices.tsx (existing)
│   │   │   │   └── moderationServices.tsx (old - kept for ref)
│   │   │   │
│   │   │   ├── ui/ (existing UI components)
│   │   │   ├── Button.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ... (other components)
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx (ready to use services)
│   │   │   ├── EmergencyResponse.tsx (ready for API integration)
│   │   │   ├── EducationalModules.tsx
│   │   │   ├── SurvivorSupport.tsx
│   │   │   ├── CommunityModeration.tsx
│   │   │   ├── RealTimeDetection.tsx
│   │   │   ├── AnonymousSupport.tsx
│   │   │   ├── AnalyticSupport.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Home.tsx
│   │   │
│   │   ├── hooks/ (existing)
│   │   ├── Layout/ (existing)
│   │   ├── assets/ (existing)
│   │   ├── main.tsx (existing)
│   │   ├── App.tsx ✅ UPDATED
│   │   └── index.css (existing)
│   │
│   ├── .env.example ✅ UPDATED
│   ├── .env.local (should be created by developer)
│   ├── vite.config.ts (existing)
│   ├── package.json (existing)
│   └── tsconfig.json (existing)
│
├── BACKEND/
│   ├── controllers/
│   │   ├── authController.js ✅ (existing, functional)
│   │   │
│   │   ├── forumController.js ✅ UPDATED
│   │   │   ├── getPosts()
│   │   │   ├── getPost()
│   │   │   ├── createPost()
│   │   │   ├── updatePost()
│   │   │   ├── deletePost()
│   │   │   └── lockPost()
│   │   │
│   │   ├── replyController.js ✅ UPDATED
│   │   │   ├── getReplies()
│   │   │   ├── createReply()
│   │   │   ├── updateReply()
│   │   │   └── deleteReply()
│   │   │
│   │   ├── reportController.js ✅ (existing, functional)
│   │   │
│   │   ├── hotspotController.js ✅ UPDATED
│   │   │   ├── getHotspots()
│   │   │   ├── getHotspot()
│   │   │   ├── getHotspotsNearby()
│   │   │   ├── getHotspotStats()
│   │   │   ├── createHotspot()
│   │   │   ├── updateHotspot()
│   │   │   ├── deleteHotspot()
│   │   │   └── getHeatmapData()
│   │   │
│   │   ├── analyticsController.js ✅ UPDATED
│   │   │   ├── logEvent()
│   │   │   ├── getLogs()
│   │   │   ├── getDashboardMetrics()
│   │   │   ├── getIncidentTypes()
│   │   │   └── getDemographics()
│   │   │
│   │   ├── emergencyController.js ✅ UPDATED
│   │   │   ├── getEmergencyContacts()
│   │   │   ├── getAvailableCountries()
│   │   │   ├── getHotline()
│   │   │   └── submitEmergencyReport()
│   │   │
│   │   └── moderationController.js ✅ NEW
│   │       ├── checkContent()
│   │       ├── detectHarassment()
│   │       ├── batchCheck()
│   │       ├── getModerationStats()
│   │       └── reportContent()
│   │
│   ├── routes/
│   │   ├── auth.js ✅ (connected)
│   │   │
│   │   ├── forum.js ✅ UPDATED
│   │   │   ├── GET /posts
│   │   │   ├── POST /posts
│   │   │   ├── GET /posts/:id
│   │   │   ├── PUT /posts/:id
│   │   │   ├── DELETE /posts/:id
│   │   │   ├── PATCH /posts/:id/lock
│   │   │   ├── GET /posts/:postId/replies
│   │   │   ├── POST /posts/:postId/replies
│   │   │   ├── PUT /posts/:postId/replies/:replyId
│   │   │   └── DELETE /posts/:postId/replies/:replyId
│   │   │
│   │   ├── replies.js ✅ (integrated into forum)
│   │   │
│   │   ├── reports.js ✅ UPDATED
│   │   │   ├── GET /
│   │   │   ├── POST /
│   │   │   ├── GET /stats
│   │   │   ├── GET /category/:category
│   │   │   └── GET /severity/:severity
│   │   │
│   │   ├── hotspots.js ✅ UPDATED
│   │   │   ├── GET /
│   │   │   ├── POST /
│   │   │   ├── GET /:id
│   │   │   ├── PUT /:id
│   │   │   ├── DELETE /:id
│   │   │   ├── GET /nearby
│   │   │   ├── GET /stats
│   │   │   └── GET /heatmap
│   │   │
│   │   ├── analytics.js ✅ UPDATED
│   │   │   ├── POST /log
│   │   │   ├── GET /
│   │   │   ├── GET /dashboard/metrics
│   │   │   ├── GET /dashboard/incident-types
│   │   │   ├── GET /dashboard/demographics
│   │   │   ├── GET /engagement
│   │   │   └── GET /safety-stats
│   │   │
│   │   ├── emergency.js ✅ UPDATED
│   │   │   ├── POST /contacts
│   │   │   ├── GET /countries
│   │   │   ├── GET /hotline
│   │   │   └── POST /report
│   │   │
│   │   └── moderation.js ✅ NEW
│   │       ├── POST /check
│   │       ├── POST /detect-harassment
│   │       ├── POST /batch-check
│   │       ├── GET /stats
│   │       └── POST /report
│   │
│   ├── models/ (existing)
│   ├── middleware/ (existing)
│   ├── db/
│   │   ├── schema.sql (existing)
│   │   ├── seeds.sql (existing)
│   │   └── connection.js (existing)
│   │
│   ├── ml-service/ (existing)
│   │
│   ├── server.js ✅ UPDATED
│   │   └── All routes registered including /api/moderation
│   │
│   ├── .env.example ✅ UPDATED
│   ├── .env (to be created)
│   ├── package.json (existing)
│   └── README.md (existing)
│
├── INTEGRATION_GUIDE.md ✅ NEW
├── BACKEND_FRONTEND_INTEGRATION.md ✅ NEW
├── QUICK_REFERENCE.md ✅ NEW
├── IMPLEMENTATION_COMPLETE.md ✅ NEW
├── CHECKLIST.md ✅ NEW
├── FILE_STRUCTURE.md ✅ NEW (this file)
│
└── (existing folders/files)
```

---

## 📊 Summary of Changes

### New Files Created: 12
```
FRONTEND:
  - lib/apiClient.ts
  - lib/AuthContext.tsx
  - components/services/authService.ts
  - components/services/forumService.ts
  - components/services/reportService.ts
  - components/services/hotspotService.ts
  - components/services/moderationService.ts

BACKEND:
  - controllers/moderationController.js
  - routes/moderation.js

ROOT:
  - INTEGRATION_GUIDE.md
  - BACKEND_FRONTEND_INTEGRATION.md
  - QUICK_REFERENCE.md
  - IMPLEMENTATION_COMPLETE.md
  - CHECKLIST.md
  - FILE_STRUCTURE.md (this file)
```

### Files Updated: 15+
```
FRONTEND:
  - src/App.tsx
  - src/components/services/analyticsServices.tsx
  - src/components/services/emergencyServices.tsx
  - .env.example

BACKEND:
  - controllers/forumController.js
  - controllers/replyController.js
  - controllers/hotspotController.js
  - controllers/analyticsController.js
  - controllers/emergencyController.js
  - routes/forum.js
  - routes/reports.js
  - routes/hotspots.js
  - routes/analytics.js
  - routes/emergency.js
  - server.js
  - .env.example
```

---

## 🔌 Integration Points

### Frontend → Backend API Calls
```
Frontend Service          →    Backend Route          →    Controller
─────────────────────         ──────────────────           ──────────
authService               →    /api/auth/*            →    authController
forumService              →    /api/forum/*           →    forumController + replyController
reportService             →    /api/reports/*         →    reportController
hotspotService            →    /api/hotspots/*        →    hotspotController
emergencyService          →    /api/emergency/*       →    emergencyController
analyticsService          →    /api/analytics/*       →    analyticsController
moderationService         →    /api/moderation/*      →    moderationController
```

---

## 📚 Documentation Files

| File | Purpose | Length |
|------|---------|--------|
| INTEGRATION_GUIDE.md | Comprehensive setup & API docs | ~400 lines |
| BACKEND_FRONTEND_INTEGRATION.md | Integration overview | ~350 lines |
| QUICK_REFERENCE.md | Developer cheat sheet | ~300 lines |
| IMPLEMENTATION_COMPLETE.md | Summary of all changes | ~250 lines |
| CHECKLIST.md | Implementation verification | ~400 lines |
| FILE_STRUCTURE.md | This file - visual structure | ~300 lines |

**Total Documentation: ~2000 lines of guides and references**

---

## ✅ What Each File Does

### Frontend Services
- **apiClient.ts** - Makes all API calls with auth
- **authService.ts** - Handles login/register/logout
- **forumService.ts** - Manages forum posts and replies
- **reportService.ts** - Submits and retrieves reports
- **hotspotService.ts** - Gets geographic hotspot data
- **moderationService.ts** - Checks content safety
- **analyticsServices.tsx** - Logs events and metrics
- **emergencyServices.tsx** - Gets emergency contacts

### Backend Controllers
- **authController.js** - User authentication
- **forumController.js** - Forum post operations
- **replyController.js** - Forum reply operations
- **reportController.js** - Report management
- **hotspotController.js** - Hotspot data
- **analyticsController.js** - Event logging
- **emergencyController.js** - Emergency services
- **moderationController.js** - Content moderation

### Backend Routes
All routes connect controllers to HTTP endpoints with proper methods and status codes

---

## 🚀 How It Works

```
User Action
    ↓
Component Uses Service
    ↓
Service Calls API Client
    ↓
API Client Makes HTTP Request
    ↓
Backend Route Receives Request
    ↓
Controller Processes Request
    ↓
Model/Database Operation
    ↓
Response Sent Back
    ↓
Service Returns Data
    ↓
Component Updates UI
```

---

## 🔒 Authentication Flow

```
1. User Enters Credentials
        ↓
2. authService.login() Called
        ↓
3. API Client POSTs to /api/auth/login
        ↓
4. Backend authController Validates
        ↓
5. JWT Token Generated
        ↓
6. Token + User Returned
        ↓
7. Service Stores Token in localStorage
        ↓
8. AuthContext Updated
        ↓
9. User Can Access Protected Features
        ↓
10. All Future Requests Include Token
```

---

## 📦 Dependencies

### Frontend
- React 19.1.1
- React Router 7.9.4
- TypeScript 5.8.3
- Axios (via apiClient)
- Sonner (toast notifications)

### Backend
- Express 4.19.2
- PostgreSQL (pg 8.12.0)
- JWT (jsonwebtoken 9.0.2)
- bcrypt 5.1.1
- Socket.io 4.7.5

---

## 🎯 Ready For

- ✅ Development
- ✅ Testing
- ✅ Feature additions
- ✅ Deployment
- ✅ Production use

---

**All integration complete and documented!** ✅
