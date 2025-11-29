// Enhanced moderation middleware
// Extend badWords with a proper, comprehensive list for production use
const badWords = [
  'abuse',
  'slur',
  'harass',
  'stupid',
  'idiot',
  'hate',
  'annoying'
];

const moderationCheck = (req, res, next) => {
  // Collect possible user input fields
  const { content, description, message, text } = req.body;
  const input = content || description || message || text || "";

  // Normalize text
  const normalized = input.trim().toLowerCase();

  // Find if any bad word is present
  const found = badWords.find(word => normalized.includes(word));

  if (found) {
    return res.status(400).json({
      error: 'Content violates community guidelines',
      word: found
    });
  }

  // Safe → continue to controller
  next();
};

module.exports = { moderationCheck };