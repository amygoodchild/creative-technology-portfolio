/* Nav: collapse to hamburger on scroll (or always below 768px) */
(function() {
    var nav = document.getElementById('main-nav');
    var hamburger = document.getElementById('nav-hamburger');
    var scrollThreshold = 80;
    var mobileBreakpoint = 768;
    var initialLoad = true;

    function isMobileNav() {
        return window.innerWidth <= mobileBreakpoint;
    }

    function updateNav() {
        if (isMobileNav() || window.scrollY > scrollThreshold) {
            nav.classList.add('nav-collapsed');
            if (!isMobileNav() && initialLoad === false) {
                nav.classList.add('nav-transition-disable');
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        nav.classList.remove('nav-transition-disable');
                    });
                });
            }
        } else {
            if (!nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-collapsed');
                nav.classList.remove('nav-open');
            }
        }
    }

    hamburger.addEventListener('click', function() {
        if (nav.classList.contains('nav-collapsed')) {
            nav.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
            if (!nav.classList.contains('nav-open') && !isMobileNav() && window.scrollY <= scrollThreshold) {
                nav.classList.remove('nav-collapsed');
            }
        }
    });

    document.addEventListener('click', function(e) {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
            nav.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            if (!isMobileNav() && window.scrollY <= scrollThreshold) {
                nav.classList.remove('nav-collapsed');
            }
        }
    });

    nav.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            if (!isMobileNav() && window.scrollY <= scrollThreshold) {
                nav.classList.remove('nav-collapsed');
            }
        });
    });

    window.addEventListener('scroll', updateNav);
    window.addEventListener('resize', updateNav);

    /* Disable transitions for initial state to prevent flicker on load */
    nav.classList.add('nav-transition-disable');
    updateNav();
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            nav.classList.remove('nav-transition-disable');
            initialLoad = false;
        });
    });
})();

/* Section title: release to scroll away with last project text */
(function() {
    var sectionTitle = document.querySelector('.projects .section-title');
    var textPanel = document.querySelector('.project-text-panel');
    if (!sectionTitle || !textPanel) return;

    function checkTitleRelease() {
        var rect = textPanel.getBoundingClientRect();
        if (rect.top < 100) {
            sectionTitle.classList.add('section-title-released');
        } else {
            sectionTitle.classList.remove('section-title-released');
        }
    }

    window.addEventListener('scroll', checkTitleRelease, { passive: true });
    checkTitleRelease();
})();

/* Case study: project title sticks next to name when it reaches the top */
(function() {
    var hero = document.querySelector('.case-study-hero');
    var title = document.getElementById('case-study-hero-title');
    if (!hero || !title) return;

    var stickThreshold = 250;

    var titleTop = 15;

    function checkTitleStick() {
        var userScroll = window.scrollY;


        if (userScroll >= stickThreshold) {   /* Title has reached top - stick it */
            title.classList.add('case-study-hero-title-stuck');
        } else {
          title.classList.remove('case-study-hero-title-stuck');
        }
    }

    window.addEventListener('scroll', checkTitleStick, { passive: true });
    checkTitleStick();
})();

