const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Store active sessions in memory (in production, use Redis)
const activeSessions = new Map();

// Pre-defined support responses
const SUPPORT_RESPONSES = [
  "Thank you for sharing that with me. How are you feeling right now?",
  "I understand this must be difficult. You're not alone in this.",
  "That sounds really challenging. Would you like to explore some resources that might help?",
  "I'm here to support you. Take your time, there's no pressure.",
  "Your feelings are completely valid. Thank you for trusting me with this.",
  "It takes courage to reach out. I'm glad you're taking this step.",
  "Would you like to talk more about what you're experiencing?",
  "I hear you. This situation sounds really tough to navigate.",
  "Remember to breathe. You're in a safe space here.",
  "Would it help to discuss some coping strategies for what you're going through?"
];

// Initialize a new support session
router.post('/session', async (req, res) => {
  try {
    const sessionId = generateSessionId();
    
    const initialMessage = {
      id: '1',
      text: "Hello, I'm here to listen. You can share anything you're comfortable with. This is a safe, anonymous space.",
      sender: 'support',
      timestamp: new Date().toISOString()
    };

    activeSessions.set(sessionId, {
      messages: [initialMessage],
      createdAt: new Date(),
      lastActivity: new Date()
    });

    // Log analytics
    await db.query(
      'INSERT INTO analytics_logs (event_type, payload) VALUES ($1, $2)',
      ['support_session_started', JSON.stringify({ sessionId })]
    );

    res.json({
      sessionId,
      messages: [initialMessage]
    });
  } catch (error) {
    console.error('Error creating support session:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get session messages
router.get('/session/:sessionId/messages', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.lastActivity = new Date();
    res.json({ messages: session.messages });
  } catch (error) {
    console.error('Error fetching session messages:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send a message
router.post('/session/:sessionId/messages', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Message text is required" });
    }

    let session = activeSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    session.messages.push(userMessage);
    session.lastActivity = new Date();

    // Log message (anonymously)
    await db.query(
      'INSERT INTO analytics_logs (event_type, payload) VALUES ($1, $2)',
      ['support_message_sent', JSON.stringify({ 
        sessionId, 
        messageLength: text.length,
        isSupport: false 
      })]
    );

    // Simulate typing delay
    setTimeout(async () => {
      const supportMessage = {
        id: (Date.now() + 1).toString(),
        text: SUPPORT_RESPONSES[Math.floor(Math.random() * SUPPORT_RESPONSES.length)],
        sender: 'support',
        timestamp: new Date().toISOString()
      };

      session.messages.push(supportMessage);
      session.lastActivity = new Date();

      // Log support response
      await db.query(
        'INSERT INTO analytics_logs (event_type, payload) VALUES ($1, $2)',
        ['support_message_sent', JSON.stringify({ 
          sessionId, 
          messageLength: supportMessage.text.length,
          isSupport: true 
        })]
      );
    }, 2000);

    res.json({ 
      success: true, 
      message: userMessage,
      typing: true 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export chat session
router.post('/session/:sessionId/export', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Log export event
    await db.query(
      'INSERT INTO analytics_logs (event_type, payload) VALUES ($1, $2)',
      ['support_session_exported', JSON.stringify({ sessionId, messageCount: session.messages.length })]
    );

    res.json({
      sessionId,
      exportedAt: new Date().toISOString(),
      messageCount: session.messages.length,
      messages: session.messages
    });
  } catch (error) {
    console.error('Error exporting session:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get support resources
router.get('/resources', async (req, res) => {
  try {
    const resources = {
      crisisHotlines: [
        'National Domestic Violence Hotline: 1-800-799-7233',
        'Crisis Text Line: Text HOME to 741741',
        'RAINN Sexual Assault Hotline: 1-800-656-4673',
        'Suicide Prevention Lifeline: 988'
      ],
      localSupport: [
        'Find local counseling services',
        'Support groups in your area', 
        'Legal assistance resources',
        'Shelter and safe housing options'
      ],
      onlineResources: [
        'Safety planning tools',
        'Educational materials',
        'Community forums',
        'Self-care resources'
      ],
      safetyTips: [
        'Use private browsing mode',
        'Clear chat history if needed',
        'Don\'t share identifying information',
        'Trust your instincts',
        'Have an exit plan for unsafe situations'
      ]
    };

    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Clean up inactive sessions (call this periodically)
router.delete('/cleanup', (req, res) => {
  const now = new Date();
  const inactiveTime = 24 * 60 * 60 * 1000; // 24 hours

  for (const [sessionId, session] of activeSessions.entries()) {
    if (now - session.lastActivity > inactiveTime) {
      activeSessions.delete(sessionId);
    }
  }

  res.json({ cleaned: true });
});

// Utility function to generate session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

module.exports = router;