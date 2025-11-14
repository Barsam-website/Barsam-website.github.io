/**
 * Firebase Configuration - Barsam Reviews System
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Go to Project Settings > General > Your apps
 * 4. Click "Web" (</>) to add a web app
 * 5. Copy the firebaseConfig object
 * 6. Replace the config below with your actual values
 *
 * SECURITY: This config is safe to commit to GitHub (API key is public-safe)
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
// TODO: Replace with YOUR Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ============================================
// ADMIN CREDENTIALS
// ============================================
// TODO: Change these to your own secure credentials
const ADMIN_CONFIG = {
  email: "admin@barsam-website.com",      // Your admin email
  // Password will be set in Firebase Console
};

// ============================================
// COLLECTION NAMES
// ============================================
const COLLECTIONS = {
  REVIEWS: 'reviews'
};

// ============================================
// REVIEW STATUS
// ============================================
const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// ============================================
// SUPPORTED LANGUAGES
// ============================================
const LANGUAGES = {
  ENGLISH: 'en',
  DUTCH: 'nl',
  FARSI: 'fa'
};

// ============================================
// VALIDATION RULES
// ============================================
const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  REVIEW_MIN_LENGTH: 10,
  REVIEW_MAX_LENGTH: 5000,
  MIN_RATING: 1,
  MAX_RATING: 5,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// ============================================
// RATE LIMITING
// ============================================
const RATE_LIMITS = {
  MAX_SUBMISSIONS_PER_IP_PER_DAY: 3,
  MIN_TIME_BETWEEN_SUBMISSIONS: 60000 // 1 minute in milliseconds
};

// ============================================
// CACHE SETTINGS
// ============================================
const CACHE = {
  APPROVED_REVIEWS_TTL: 300000, // 5 minutes
  ENABLE_OFFLINE_PERSISTENCE: true
};

// ============================================
// INITIALIZE FIREBASE
// ============================================
let app, db, auth;

function initializeFirebase() {
  try {
    // Check if Firebase SDK is loaded
    if (typeof firebase === 'undefined') {
      console.error('❌ Firebase SDK not loaded. Include Firebase scripts in HTML.');
      return false;
    }

    // Initialize Firebase app
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
      console.log('✅ Firebase initialized successfully');
    } else {
      app = firebase.app();
      console.log('✅ Firebase already initialized');
    }

    // Initialize Firestore
    db = firebase.firestore();

    // Enable offline persistence
    if (CACHE.ENABLE_OFFLINE_PERSISTENCE) {
      db.enablePersistence()
        .then(() => console.log('✅ Offline persistence enabled'))
        .catch((err) => {
          if (err.code === 'failed-precondition') {
            console.warn('⚠️ Offline persistence failed: Multiple tabs open');
          } else if (err.code === 'unimplemented') {
            console.warn('⚠️ Offline persistence not supported by browser');
          }
        });
    }

    // Initialize Auth
    auth = firebase.auth();

    return true;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get Firestore database instance
 */
function getFirestore() {
  if (!db) {
    console.error('❌ Firestore not initialized. Call initializeFirebase() first.');
    return null;
  }
  return db;
}

/**
 * Get Firebase Auth instance
 */
function getAuth() {
  if (!auth) {
    console.error('❌ Auth not initialized. Call initializeFirebase() first.');
    return null;
  }
  return auth;
}

/**
 * Check if user is authenticated admin
 */
function isAdmin() {
  const currentUser = auth?.currentUser;
  return currentUser !== null && currentUser.email === ADMIN_CONFIG.email;
}

/**
 * Format timestamp to readable date
 */
function formatDate(timestamp, language = 'en') {
  if (!timestamp) return '';

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const locales = {
    'en': 'en-US',
    'nl': 'nl-NL',
    'fa': 'fa-IR'
  };

  return date.toLocaleDateString(locales[language] || 'en-US', options);
}

/**
 * Convert rating number to star display
 */
function getStarRating(rating) {
  const fullStar = '★';
  const emptyStar = '☆';
  const maxStars = 5;

  return fullStar.repeat(rating) + emptyStar.repeat(maxStars - rating);
}

/**
 * Validate review data
 */
function validateReviewData(data) {
  const errors = [];

  // Validate name
  if (!data.name || data.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    errors.push('Name is too short');
  }
  if (data.name && data.name.length > VALIDATION.NAME_MAX_LENGTH) {
    errors.push('Name is too long');
  }

  // Validate email (if provided)
  if (data.email && !VALIDATION.EMAIL_REGEX.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate rating
  if (!data.rating || data.rating < VALIDATION.MIN_RATING || data.rating > VALIDATION.MAX_RATING) {
    errors.push('Invalid rating (must be 1-5)');
  }

  // Validate review text
  if (!data.review || data.review.trim().length < VALIDATION.REVIEW_MIN_LENGTH) {
    errors.push('Review is too short');
  }
  if (data.review && data.review.length > VALIDATION.REVIEW_MAX_LENGTH) {
    errors.push('Review is too long');
  }

  // Validate language
  if (!data.language || !Object.values(LANGUAGES).includes(data.language)) {
    errors.push('Invalid language');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Sanitize user input
 */
function sanitizeInput(text) {
  if (!text) return '';

  // Remove HTML tags
  const div = document.createElement('div');
  div.textContent = text;
  let sanitized = div.innerHTML;

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

// ============================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    firebaseConfig,
    ADMIN_CONFIG,
    COLLECTIONS,
    REVIEW_STATUS,
    LANGUAGES,
    VALIDATION,
    RATE_LIMITS,
    CACHE,
    initializeFirebase,
    getFirestore,
    getAuth,
    isAdmin,
    formatDate,
    getStarRating,
    validateReviewData,
    sanitizeInput
  };
}

console.log('📦 Firebase config loaded');
