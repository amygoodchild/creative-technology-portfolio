/* Nav: hamburger menu toggle */
(function() {
    var nav = document.getElementById('main-nav');
    var hamburger = document.getElementById('nav-hamburger');
    if (!nav || !hamburger) return;

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
    });

    document.addEventListener('click', function(e) {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
            nav.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    nav.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    nav.classList.add('nav-transition-disable');
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            nav.classList.remove('nav-transition-disable');
        });
    });
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

