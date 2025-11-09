/**
 * Language Switcher
 * Handles language switching between Farsi, English, and Dutch
 */

(function() {
    'use strict';

    // Language configuration
    const LANGUAGES = {
        fa: {
            code: 'fa',
            name: 'فارسی',
            dir: 'rtl',
            path: '/fa/index.html'
        },
        en: {
            code: 'en',
            name: 'English',
            dir: 'ltr',
            path: '/en/index.html'
        },
        nl: {
            code: 'nl',
            name: 'Nederlands',
            dir: 'ltr',
            path: '/nl/index.html'
        }
    };

    // Get current language from page
    function getCurrentLanguage() {
        const html = document.documentElement;
        return html.getAttribute('lang') || 'fa';
    }

    // Save language preference
    function saveLanguagePreference(langCode) {
        try {
            localStorage.setItem('preferredLanguage', langCode);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    // Get saved language preference
    function getSavedLanguagePreference() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (e) {
            return null;
        }
    }

    // Switch language
    function switchLanguage(langCode) {
        if (!LANGUAGES[langCode]) {
            console.error('Invalid language code:', langCode);
            return;
        }

        const currentLang = getCurrentLanguage();
        if (langCode === currentLang) {
            return; // Already on this language
        }

        // Save preference
        saveLanguagePreference(langCode);

        // Get the path - handle both root and subdirectory cases
        const currentPath = window.location.pathname;
        let targetPath;

        if (currentPath === '/' || currentPath === '/index.html') {
            // From root, go to language subdirectory
            targetPath = `.${LANGUAGES[langCode].path}`;
        } else {
            // From language subdirectory, switch to another
            targetPath = `..${LANGUAGES[langCode].path}`;
        }

        // Navigate to new language
        window.location.href = targetPath;
    }

    // Initialize language switcher buttons
    function initLanguageSwitcher() {
        const buttons = document.querySelectorAll('.lang-btn');
        const currentLang = getCurrentLanguage();

        buttons.forEach(button => {
            const langCode = button.getAttribute('data-lang');

            // Set active state
            if (langCode === currentLang) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }

            // Add click handler
            button.addEventListener('click', function(e) {
                e.preventDefault();
                switchLanguage(langCode);
            });

            // Add keyboard accessibility
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    switchLanguage(langCode);
                }
            });
        });
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }

    // Expose functions for external use if needed
    window.BarsamLanguage = {
        switch: switchLanguage,
        current: getCurrentLanguage,
        available: Object.keys(LANGUAGES)
    };

})();