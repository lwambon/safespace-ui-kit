This document has been consolidated into `DOCUMENTATION.md`. See that file for full testing steps.

## Quick Start

### 1. Database Setup (Windows)
```powershell
cd BACKEND
& "setup-db.ps1"
# Or use: setup-db.bat
```

### 2. Start Backend
```powershell
cd BACKEND
npm install
npm run dev
```

Expected output: `Server running on http://localhost:3001`

### 3. Start Frontend (New Terminal)
```powershell
cd FRONTEND
npm install
npm run dev
```

Expected output: `Local: http://localhost:5173`

### 4. Open Browser
Navigate to: `http://localhost:5173`

---

## Testing Each Page

### 🏠 Home Page (`/`)
**What it does:** Shows threat assessment and emergency response options

**Steps:**
1. Navigate to Home page
2. Wait 2 seconds for metrics to load
3. Verify you see:
   - Dashboard cards with numbers
   - Threat level status
   - Emergency response buttons

**Expected Data:**
- Total Reports: Any number ≥ 0
- Active Users: Any number ≥ 0
- Safety Rating: 0-100 percentage
- Threat Level: Calm/Low/Medium/High/Critical

**Troubleshooting:**
- If data doesn't load: Check backend is running
- If error toast appears: Check database connection
- If metrics are 0: Seed database with `npm run seed`

---

### 🛡️ RealTime Detection (`/detection`)
**What it does:** Detects harassment and threats in user input

**Steps:**
1. Navigate to Real-Time Detection page
2. Find the test input section
3. Type some text (e.g., "This is a test message")
4. Click "Analyze Content" button
5. Observe threat level detection result
6. Click "Report Incident" button

**Expected Behavior:**
- Input area accepts text
- "Analyze Content" button shows loading state
- Threat level appears (with color indicator)
- Toast notification confirms action
- Report is sent to backend

**Test Cases:**
```
Input: "I'm being harassed"
Expected: threat level = medium/high

Input: "This is great!"
Expected: threat level = low/calm

Input: "Threats and violence"
Expected: threat level = critical
```

**Troubleshooting:**
- If button doesn't work: Check moderationService
- If no threat level: ML service may not be running
- If error toast: Check backend /api/moderation/detect

---

### ⚙️ Settings (`/settings`)
**What it does:** Manage user preferences

**Steps:**
1. Navigate to Settings page
2. See 4 sections: Notifications, Privacy, Community, Regional
3. Toggle switches on/off
4. Click "Save Changes" button
5. Verify success toast appears

**Expected Behavior:**
- All toggle switches functional
- Disabled/enabled states visible
- "Reset to Defaults" resets all toggles
- "Save Changes" shows loading state
- Toast confirms save

**Sections to Test:**
- [ ] Notification Preferences (4 toggles)
- [ ] Privacy & Security (4 toggles)
- [ ] Community Guidelines (4 toggles)
- [ ] Regional Settings (4 toggles)

**Troubleshooting:**
- If toggles don't work: Check React state
- If save fails: Backend may not support settings endpoint yet
- If nothing changes: Refresh page to verify state

---

### 📊 Dashboard (`/dashboard`)
**What it does:** Main safety statistics and quick actions

**Steps:**
1. Navigate to Dashboard
2. Wait for metrics to load (2-3 seconds)
3. Verify stat cards display:
   - Protected Users
   - Incidents Prevented
   - Safety Rating
   - Response Time
4. Check Recent Activity feed
5. Click quick action buttons

**Expected Data:**
- 4 stat cards with numbers/percentages
- Recent Activity with timestamps
- 4 quick action buttons (Emergency, Monitoring, Education, Support)

**Quick Actions to Test:**
- [ ] Emergency Report → navigates to `/emergency`
- [ ] Start Monitoring → navigates to `/detection`
- [ ] Educational Modules → navigates to `/education`
- [ ] Community Support → navigates to `/support`

**Troubleshooting:**
- If metrics don't load: Check analytics service
- If stuck on loading: Database may not be connected
- If quick actions don't navigate: Check router configuration

---

### 👥 Survivor Support (`/support`)
**What it does:** Displays support resources and helplines

**Note:** This is a static page - no backend integration needed

**Expected Content:**
- Support resources
- Helpline numbers
- Crisis hotlines
- Support organizations

---

## API Endpoint Testing

### Test with curl/PowerShell

**Get Dashboard Metrics:**
```powershell
$headers = @{
    "Authorization" = "Bearer YOUR_JWT_TOKEN"
    "Content-Type" = "application/json"
}
Invoke-RestMethod -Uri "http://localhost:3001/api/analytics/dashboard?range=7d" -Headers $headers
```

**Analyze Content:**
```powershell
$body = @{
    content = "Test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/moderation/detect" `
    -Method Post `
    -Headers $headers `
    -Body $body
```

**Submit Report:**
```powershell
$body = @{
    content = "Harmful content"
    threatLevel = "high"
    category = "harassment"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/reports" `
    -Method Post `
    -Headers $headers `
    -Body $body
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "connect ECONNREFUSED" | Backend not running | Start backend with `npm run dev` |
| "Cannot find module" | Missing dependencies | Run `npm install` in FRONTEND/BACKEND |
| "Database connection failed" | DB not set up | Run database setup script |
| "Metrics return 0" | Database empty | Seed database with `npm run seed` |
| "Page shows loading forever" | API timeout | Check backend is responding |
| "Toast not visible" | Sonner not installed | Run `npm install sonner` |
| "Toggles don't work" | State issue | Hard refresh with Ctrl+Shift+R |

---

## Performance Checklist

- [ ] Page loads in < 3 seconds
- [ ] Metrics refresh every 5 minutes
- [ ] No console errors
- [ ] No memory leaks
- [ ] Buttons respond immediately
- [ ] Toast notifications appear
- [ ] Error states handled gracefully

---

## Security Checklist

- [ ] JWT tokens sent with all requests
- [ ] User authentication required
- [ ] No sensitive data in console logs
- [ ] CORS properly configured
- [ ] Rate limiting on API endpoints
- [ ] Input validation on frontend
- [ ] XSS protection in place

---

## Browser DevTools Tips

**Check Network Tab:**
- Monitor all API calls
- Verify response status codes (200, 401, 500)
- Check response payloads

**Check Console Tab:**
- Look for error messages
- Verify no security warnings
- Check service calls logging

**Check Application Tab:**
- Verify JWT token stored
- Check localStorage for auth data
- Review session storage

---

## Final Verification

After testing all pages, verify:

```
✅ All 5 pages load without errors
✅ Real data displays from backend
✅ User interactions trigger API calls
✅ Toast notifications work
✅ Auto-refresh works on pages that need it
✅ Error handling works (e.g., disconnect backend)
✅ Loading states display
✅ No console errors
✅ Buttons navigate correctly
✅ Settings persist (can be verified in DB)
```

---

## Need Help?

1. **Backend not starting?** Check PORT 3001 is available
2. **Frontend not starting?** Check PORT 5173 is available
3. **Database error?** Run setup script again or check PostgreSQL running
4. **API errors?** Check backend logs in terminal
5. **Frontend errors?** Check browser console

---

**Last Updated:** January 2025
**Status:** ✅ All Pages Integrated and Ready for Testing
