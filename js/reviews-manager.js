/**
 * Reviews Manager - Barsam Reviews System
 *
 * Handles loading and displaying approved reviews from Firebase
 * Works with all language versions (EN, NL, FA)
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    REVIEWS_PER_PAGE: 50,
    CACHE_DURATION: 300000, // 5 minutes
    AUTO_REFRESH: false,     // Set true for real-time updates
    REFRESH_INTERVAL: 60000  // 1 minute
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  let reviewsCache = {
    data: [],
    timestamp: null,
    language: null
  };

  let isLoading = false;
  let currentLanguage = 'en'; // Default

  // ============================================
  // DETECT CURRENT LANGUAGE
  // ============================================
  function detectLanguage() {
    // Check HTML lang attribute
    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang && Object.values(LANGUAGES).includes(htmlLang)) {
      return htmlLang;
    }

    // Check URL path
    const path = window.location.pathname;
    if (path.includes('/en/')) return LANGUAGES.ENGLISH;
    if (path.includes('/nl/')) return LANGUAGES.DUTCH;
    if (path.includes('/fa/')) return LANGUAGES.FARSI;

    // Check hidden input in form
    const langInput = document.querySelector('input[name="_language"]');
    if (langInput && langInput.value) {
      return langInput.value;
    }

    return LANGUAGES.ENGLISH; // Default fallback
  }

  // ============================================
  // LOAD REVIEWS FROM FIREBASE
  // ============================================
  async function loadReviews(language = currentLanguage, forceRefresh = false) {
    // Check cache first
    if (!forceRefresh && isCacheValid(language)) {
      console.log('📦 Using cached reviews');
      return reviewsCache.data;
    }

    // Prevent concurrent loads
    if (isLoading) {
      console.log('⏳ Already loading reviews...');
      return reviewsCache.data;
    }

    isLoading = true;

    try {
      const db = getFirestore();
      if (!db) {
        throw new Error('Firestore not initialized');
      }

      console.log(`🔍 Loading approved reviews for language: ${language}`);

      // Query approved reviews for current language
      const query = db.collection(COLLECTIONS.REVIEWS)
        .where('status', '==', REVIEW_STATUS.APPROVED)
        .where('language', '==', language)
        .orderBy('timestamp', 'desc')
        .limit(CONFIG.REVIEWS_PER_PAGE);

      const snapshot = await query.get();

      const reviews = [];
      snapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Update cache
      reviewsCache = {
        data: reviews,
        timestamp: Date.now(),
        language: language
      };

      console.log(`✅ Loaded ${reviews.length} reviews`);
      return reviews;

    } catch (error) {
      console.error('❌ Error loading reviews:', error);

      // Return cached data if available
      if (reviewsCache.data.length > 0) {
        console.log('⚠️ Using stale cache due to error');
        return reviewsCache.data;
      }

      return [];

    } finally {
      isLoading = false;
    }
  }

  // ============================================
  // CACHE VALIDATION
  // ============================================
  function isCacheValid(language) {
    if (!reviewsCache.timestamp || !reviewsCache.data.length) {
      return false;
    }

    if (reviewsCache.language !== language) {
      return false;
    }

    const age = Date.now() - reviewsCache.timestamp;
    return age < CONFIG.CACHE_DURATION;
  }

  // ============================================
  // DISPLAY REVIEWS IN HTML
  // ============================================
  function displayReviews(reviews) {
    const container = document.getElementById('reviewsList');
    if (!container) {
      console.warn('⚠️ Reviews container not found');
      return;
    }

    // Check if there are static reviews already in the HTML
    const existingStaticReviews = container.querySelectorAll('.review-card:not([data-review-id])');
    const hasStaticReviews = existingStaticReviews.length > 0;

    // If no Firebase reviews and we have static reviews, keep them
    if (reviews.length === 0 && hasStaticReviews) {
      console.log(`✅ Keeping ${existingStaticReviews.length} static reviews`);
      return;
    }

    // Only clear dynamic reviews (those with data-review-id)
    const dynamicReviews = container.querySelectorAll('.review-card[data-review-id]');
    dynamicReviews.forEach(card => card.remove());

    // If we have no reviews at all, show "no reviews" message
    if (reviews.length === 0 && !hasStaticReviews) {
      displayNoReviews(container);
      return;
    }

    // Create review cards for Firebase reviews
    reviews.forEach((review) => {
      const card = createReviewCard(review);
      container.appendChild(card);
    });

    console.log(`✅ Displayed ${reviews.length} Firebase reviews + ${existingStaticReviews.length} static reviews`);
  }

  // ============================================
  // CREATE REVIEW CARD ELEMENT
  // ============================================
  function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('data-review-id', review.id);

    // Review header (name and rating)
    const header = document.createElement('div');
    header.className = 'review-header';

    const authorName = document.createElement('div');
    authorName.className = 'review-author';
    authorName.textContent = sanitizeInput(review.name);

    const rating = document.createElement('div');
    rating.className = 'review-rating';
    rating.textContent = getStarRating(review.rating);
    rating.setAttribute('aria-label', `${review.rating} out of 5 stars`);

    header.appendChild(authorName);
    header.appendChild(rating);

    // Review text
    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = sanitizeInput(review.review);

    // Review date
    const date = document.createElement('div');
    date.className = 'review-date';
    date.textContent = formatDate(review.timestamp, review.language);

    // Assemble card
    card.appendChild(header);
    card.appendChild(text);
    card.appendChild(date);

    // Add fade-in animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Trigger animation
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);

    return card;
  }

  // ============================================
  // DISPLAY "NO REVIEWS" MESSAGE
  // ============================================
  function displayNoReviews(container) {
    const noReviews = document.createElement('div');
    noReviews.className = 'no-reviews';

    const message = document.createElement('p');

    // Multi-language messages
    const messages = {
      'en': 'No reviews yet. Be the first to share your thoughts!',
      'nl': 'Nog geen recensies. Wees de eerste om uw gedachten te delen!',
      'fa': 'هنوز نظری ثبت نشده است. اولین نفری باشید که نظر خود را به اشتراک می‌گذارد!'
    };

    message.textContent = messages[currentLanguage] || messages['en'];

    noReviews.appendChild(message);
    container.appendChild(noReviews);
  }

  // ============================================
  // REFRESH REVIEWS
  // ============================================
  async function refreshReviews() {
    console.log('🔄 Refreshing reviews...');

    const reviews = await loadReviews(currentLanguage, true);
    displayReviews(reviews);
  }

  // ============================================
  // SETUP REAL-TIME LISTENER (OPTIONAL)
  // ============================================
  function setupRealtimeListener() {
    if (!CONFIG.AUTO_REFRESH) {
      return;
    }

    const db = getFirestore();
    if (!db) {
      console.warn('⚠️ Cannot setup real-time listener: Firestore not initialized');
      return;
    }

    console.log('👂 Setting up real-time listener for reviews');

    const query = db.collection(COLLECTIONS.REVIEWS)
      .where('status', '==', REVIEW_STATUS.APPROVED)
      .where('language', '==', currentLanguage)
      .orderBy('timestamp', 'desc')
      .limit(CONFIG.REVIEWS_PER_PAGE);

    // Listen for real-time updates
    query.onSnapshot((snapshot) => {
      console.log('🔔 Reviews updated in real-time');

      const reviews = [];
      snapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Update cache and display
      reviewsCache = {
        data: reviews,
        timestamp: Date.now(),
        language: currentLanguage
      };

      displayReviews(reviews);
    }, (error) => {
      console.error('❌ Real-time listener error:', error);
    });
  }

  // ============================================
  // SUBMIT NEW REVIEW TO FIREBASE
  // ============================================
  async function submitReview(formData) {
    try {
      const db = getFirestore();
      if (!db) {
        throw new Error('Firestore not initialized');
      }

      // Prepare review data
      const reviewData = {
        name: sanitizeInput(formData.get('name')),
        email: formData.get('email') || '',
        rating: parseInt(formData.get('rating')),
        review: sanitizeInput(formData.get('review')),
        language: formData.get('_language') || currentLanguage,
        status: REVIEW_STATUS.PENDING,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        approvedAt: null,
        approvedBy: null,
        userAgent: navigator.userAgent,
        // Do NOT store IP address (privacy)
      };

      // Validate data
      const validation = validateReviewData(reviewData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // Rate limiting check (client-side)
      const lastSubmission = localStorage.getItem('lastReviewSubmission');
      if (lastSubmission) {
        const timeSince = Date.now() - parseInt(lastSubmission);
        if (timeSince < RATE_LIMITS.MIN_TIME_BETWEEN_SUBMISSIONS) {
          throw new Error('Please wait a moment before submitting another review');
        }
      }

      console.log('📤 Submitting review to Firebase...');

      // Add to Firestore
      const docRef = await db.collection(COLLECTIONS.REVIEWS).add(reviewData);

      console.log(`✅ Review submitted with ID: ${docRef.id}`);

      // Update rate limiting
      localStorage.setItem('lastReviewSubmission', Date.now().toString());

      return {
        success: true,
        id: docRef.id
      };

    } catch (error) {
      console.error('❌ Error submitting review:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // ============================================
  // INITIALIZE REVIEWS SYSTEM
  // ============================================
  async function initReviewsManager() {
    try {
      console.log('🚀 Initializing Reviews Manager...');

      // Detect current language
      currentLanguage = detectLanguage();
      console.log(`🌍 Detected language: ${currentLanguage}`);

      // Initialize Firebase
      if (!initializeFirebase()) {
        console.error('❌ Failed to initialize Firebase');
        return;
      }

      // Load and display reviews
      const reviews = await loadReviews(currentLanguage);
      displayReviews(reviews);

      // Setup real-time listener if enabled
      if (CONFIG.AUTO_REFRESH) {
        setupRealtimeListener();
      }

      // Setup periodic refresh if enabled (alternative to real-time)
      if (!CONFIG.AUTO_REFRESH && CONFIG.REFRESH_INTERVAL > 0) {
        setInterval(refreshReviews, CONFIG.REFRESH_INTERVAL);
      }

      console.log('✅ Reviews Manager initialized successfully');

    } catch (error) {
      console.error('❌ Failed to initialize Reviews Manager:', error);
    }
  }

  // ============================================
  // AUTO-INITIALIZE ON PAGE LOAD
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsManager);
  } else {
    initReviewsManager();
  }

  // ============================================
  // EXPOSE PUBLIC API
  // ============================================
  window.ReviewsManager = {
    loadReviews,
    refreshReviews,
    submitReview,
    displayReviews,
    getCurrentLanguage: () => currentLanguage
  };

  console.log('📦 Reviews Manager loaded');

})();
