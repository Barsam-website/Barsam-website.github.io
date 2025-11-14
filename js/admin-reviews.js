/**
 * Admin Reviews Dashboard - Barsam Reviews System
 *
 * Handles admin authentication and review approval/rejection
 */

(function() {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  let currentUser = null;
  let currentTab = 'pending';
  let reviews = {
    pending: [],
    approved: [],
    rejected: []
  };

  // ============================================
  // INITIALIZE DASHBOARD
  // ============================================
  async function initDashboard() {
    try {
      console.log('🚀 Initializing Admin Dashboard...');

      // Initialize Firebase
      if (!initializeFirebase()) {
        throw new Error('Failed to initialize Firebase');
      }

      // Setup authentication listener
      setupAuthListener();

      // Setup UI event listeners
      setupUIListeners();

      console.log('✅ Admin Dashboard initialized');

    } catch (error) {
      console.error('❌ Failed to initialize dashboard:', error);
      showMessage('error', 'Failed to initialize dashboard: ' + error.message);
    }
  }

  // ============================================
  // AUTHENTICATION LISTENER
  // ============================================
  function setupAuthListener() {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        console.log('✅ User authenticated:', user.email);
        currentUser = user;
        showDashboard();
        loadAllReviews();
      } else {
        // User is logged out
        console.log('👤 User not authenticated');
        currentUser = null;
        showAuth();
      }
    });
  }

  // ============================================
  // UI EVENT LISTENERS
  // ============================================
  function setupUIListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }

    // Tab buttons
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
      });
    });
  }

  // ============================================
  // SHOW/HIDE SECTIONS
  // ============================================
  function showAuth() {
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  }

  function showDashboard() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    // Display user email
    const userEmailEl = document.getElementById('userEmail');
    if (userEmailEl && currentUser) {
      userEmailEl.textContent = `Logged in as: ${currentUser.email}`;
    }
  }

  // ============================================
  // AUTHENTICATION HANDLERS
  // ============================================
  async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    try {
      console.log('🔐 Attempting login...');

      await auth.signInWithEmailAndPassword(email, password);

      console.log('✅ Login successful');
      showMessage('success', 'Login successful!');

    } catch (error) {
      console.error('❌ Login failed:', error);

      let errorMessage = 'Login failed. ';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage += 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage += 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage += 'Incorrect password.';
          break;
        default:
          errorMessage += error.message;
      }

      showMessage('error', errorMessage, 'authMessage');
    }
  }

  async function handleLogout() {
    const auth = getAuth();

    try {
      await auth.signOut();
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      showMessage('error', 'Logout failed: ' + error.message);
    }
  }

  // ============================================
  // LOAD REVIEWS
  // ============================================
  async function loadAllReviews() {
    console.log('📥 Loading all reviews...');

    try {
      await Promise.all([
        loadReviewsByStatus('pending'),
        loadReviewsByStatus('approved'),
        loadReviewsByStatus('rejected')
      ]);

      updateStats();
      displayReviews(currentTab);

      console.log('✅ All reviews loaded');

    } catch (error) {
      console.error('❌ Error loading reviews:', error);
      showMessage('error', 'Failed to load reviews: ' + error.message);
    }
  }

  async function loadReviewsByStatus(status) {
    const db = getFirestore();

    const query = db.collection(COLLECTIONS.REVIEWS)
      .where('status', '==', status)
      .orderBy('timestamp', 'desc');

    const snapshot = await query.get();

    reviews[status] = [];
    snapshot.forEach((doc) => {
      reviews[status].push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ Loaded ${reviews[status].length} ${status} reviews`);
  }

  // ============================================
  // UPDATE STATISTICS
  // ============================================
  function updateStats() {
    document.getElementById('statPending').textContent = reviews.pending.length;
    document.getElementById('statApproved').textContent = reviews.approved.length;
    document.getElementById('statTotal').textContent =
      reviews.pending.length + reviews.approved.length + reviews.rejected.length;

    document.getElementById('pendingBadge').textContent = reviews.pending.length;
  }

  // ============================================
  // TAB SWITCHING
  // ============================================
  function switchTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tab') === tabName) {
        tab.classList.add('active');
      }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Display reviews for this tab
    displayReviews(tabName);
  }

  // ============================================
  // DISPLAY REVIEWS
  // ============================================
  function displayReviews(status) {
    const container = document.getElementById(`${status}List`);
    if (!container) return;

    container.innerHTML = '';

    const reviewsToDisplay = reviews[status];

    if (reviewsToDisplay.length === 0) {
      displayEmptyState(container, status);
      return;
    }

    reviewsToDisplay.forEach(review => {
      const reviewEl = createReviewElement(review, status);
      container.appendChild(reviewEl);
    });
  }

  // ============================================
  // CREATE REVIEW ELEMENT
  // ============================================
  function createReviewElement(review, status) {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.setAttribute('data-review-id', review.id);

    // Header
    const header = document.createElement('div');
    header.className = 'review-header';

    const meta = document.createElement('div');
    meta.className = 'review-meta';

    const author = document.createElement('div');
    author.className = 'review-author';
    author.textContent = review.name;

    const info = document.createElement('div');
    info.className = 'review-info';

    const timestamp = review.timestamp ? formatDate(review.timestamp, review.language) : 'N/A';
    const languageBadge = `<span class="language-badge ${review.language}">${review.language.toUpperCase()}</span>`;

    info.innerHTML = `${timestamp} • ${languageBadge}`;

    if (review.email) {
      info.innerHTML += ` • ${sanitizeInput(review.email)}`;
    }

    meta.appendChild(author);
    meta.appendChild(info);

    const rating = document.createElement('div');
    rating.className = 'review-rating';
    rating.textContent = getStarRating(review.rating);

    header.appendChild(meta);
    header.appendChild(rating);

    // Review text
    const text = document.createElement('div');
    text.className = 'review-text';
    text.textContent = review.review;

    // Actions
    const actions = document.createElement('div');
    actions.className = 'review-actions';

    if (status === 'pending') {
      // Approve and Reject buttons
      const approveBtn = document.createElement('button');
      approveBtn.className = 'btn btn-success';
      approveBtn.textContent = '✓ Approve';
      approveBtn.onclick = () => handleApprove(review.id);

      const rejectBtn = document.createElement('button');
      rejectBtn.className = 'btn btn-danger';
      rejectBtn.textContent = '✗ Reject';
      rejectBtn.onclick = () => handleReject(review.id);

      actions.appendChild(approveBtn);
      actions.appendChild(rejectBtn);

    } else if (status === 'approved') {
      // Unapprove button
      const unapproveBtn = document.createElement('button');
      unapproveBtn.className = 'btn btn-secondary';
      unapproveBtn.textContent = 'Unapprove';
      unapproveBtn.onclick = () => handleUnapprove(review.id);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => handleDelete(review.id);

      actions.appendChild(unapproveBtn);
      actions.appendChild(deleteBtn);

    } else if (status === 'rejected') {
      // Approve and Delete buttons
      const approveBtn = document.createElement('button');
      approveBtn.className = 'btn btn-success';
      approveBtn.textContent = '✓ Approve';
      approveBtn.onclick = () => handleApprove(review.id);

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => handleDelete(review.id);

      actions.appendChild(approveBtn);
      actions.appendChild(deleteBtn);
    }

    // Assemble
    div.appendChild(header);
    div.appendChild(text);
    div.appendChild(actions);

    return div;
  }

  // ============================================
  // EMPTY STATE
  // ============================================
  function displayEmptyState(container, status) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';

    const messages = {
      pending: 'No pending reviews',
      approved: 'No approved reviews yet',
      rejected: 'No rejected reviews'
    };

    empty.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p>${messages[status]}</p>
    `;

    container.appendChild(empty);
  }

  // ============================================
  // REVIEW ACTIONS
  // ============================================
  async function handleApprove(reviewId) {
    if (!confirm('Approve this review?')) return;

    try {
      const db = getFirestore();

      await db.collection(COLLECTIONS.REVIEWS).doc(reviewId).update({
        status: REVIEW_STATUS.APPROVED,
        approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
        approvedBy: currentUser.email
      });

      console.log(`✅ Review ${reviewId} approved`);
      showMessage('success', 'Review approved successfully!');

      // Reload reviews
      await loadAllReviews();

    } catch (error) {
      console.error('❌ Error approving review:', error);
      showMessage('error', 'Failed to approve review: ' + error.message);
    }
  }

  async function handleReject(reviewId) {
    if (!confirm('Reject this review? You can approve it later from the Rejected tab.')) return;

    try {
      const db = getFirestore();

      await db.collection(COLLECTIONS.REVIEWS).doc(reviewId).update({
        status: REVIEW_STATUS.REJECTED
      });

      console.log(`✅ Review ${reviewId} rejected`);
      showMessage('success', 'Review rejected');

      // Reload reviews
      await loadAllReviews();

    } catch (error) {
      console.error('❌ Error rejecting review:', error);
      showMessage('error', 'Failed to reject review: ' + error.message);
    }
  }

  async function handleUnapprove(reviewId) {
    if (!confirm('Move this review back to pending?')) return;

    try {
      const db = getFirestore();

      await db.collection(COLLECTIONS.REVIEWS).doc(reviewId).update({
        status: REVIEW_STATUS.PENDING,
        approvedAt: null,
        approvedBy: null
      });

      console.log(`✅ Review ${reviewId} unapproved`);
      showMessage('success', 'Review moved back to pending');

      // Reload reviews
      await loadAllReviews();

    } catch (error) {
      console.error('❌ Error unapproving review:', error);
      showMessage('error', 'Failed to unapprove review: ' + error.message);
    }
  }

  async function handleDelete(reviewId) {
    if (!confirm('Permanently delete this review? This cannot be undone.')) return;

    try {
      const db = getFirestore();

      await db.collection(COLLECTIONS.REVIEWS).doc(reviewId).delete();

      console.log(`✅ Review ${reviewId} deleted`);
      showMessage('success', 'Review deleted permanently');

      // Reload reviews
      await loadAllReviews();

    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showMessage('error', 'Failed to delete review: ' + error.message);
    }
  }

  // ============================================
  // SHOW MESSAGE
  // ============================================
  function showMessage(type, text, containerId = null) {
    const container = containerId ?
      document.getElementById(containerId) :
      document.querySelector('.container');

    if (!container) return;

    // Remove existing messages
    const existingMsg = container.querySelector('.message');
    if (existingMsg) {
      existingMsg.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    message.textContent = text;

    // Insert at top of container
    if (containerId) {
      container.appendChild(message);
    } else {
      container.insertBefore(message, container.firstChild);
    }

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        message.remove();
      }, 5000);
    }
  }

  // ============================================
  // AUTO-INITIALIZE
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }

  console.log('📦 Admin Reviews Dashboard loaded');

})();
