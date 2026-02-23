/* Restore scroll position on reload (e.g. Live Reload) */
(function() {
    var key = 'scrollPos' + (location.pathname || '');
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem(key, window.scrollY);
    });
    var saved = sessionStorage.getItem(key);
    if (saved !== null) {
        requestAnimationFrame(function() {
            window.scrollTo(0, parseInt(saved, 10));
        });
    }
})();

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

/* Projects: fade text/inages based on which image is in view */
(function() {
    var imageLinks = document.querySelectorAll('.project-image-link');
    var textItems = document.querySelectorAll('.project-text-item');
    if (!imageLinks.length || !textItems.length) return;

    var ratios = new Map();
    imageLinks.forEach(function(link, i) {
        var img = link.querySelector('.project-intro-image');
        if (img) ratios.set(img, { index: i, ratio: 0 });
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var data = ratios.get(entry.target);
            if (data) data.ratio = entry.intersectionRatio;
        });
        var best = { index: 0, ratio: 0 };
        ratios.forEach(function(data) {
            if (data.ratio > best.ratio) best = data;
        });
        var activeIndex = best.ratio > 0 ? best.index : 0;
        textItems.forEach(function(t) { t.classList.remove('project-active'); });
        imageLinks.forEach(function(l) { l.classList.remove('project-active'); });
        if (textItems[activeIndex]) textItems[activeIndex].classList.add('project-active');
        if (imageLinks[activeIndex]) imageLinks[activeIndex].classList.add('project-active');
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-15% 0px -35% 0px'
    });

    imageLinks.forEach(function(link) {
        var img = link.querySelector('.project-intro-image');
        if (img) observer.observe(img);
    });

    textItems[0].classList.add('project-active');
    if (imageLinks[0]) imageLinks[0].classList.add('project-active');
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


/* Case study: image gallery */
// Create thumbnails for each image in the gallery
let galleries = [
    "when-in-dome-gallery-0",
    "when-in-dome-gallery-1",
];

galleries.forEach(gallery => {
    
    let images = document.querySelectorAll(`#${gallery} img`);
    if (images.length == 0) return;

    let w = images[0].width;

    let captionHolder = document.getElementById(`${gallery}-captions`);
    captionHolder.style.width = `${w}px`;

    let thumbnailHolder = document.getElementById(`${gallery}-thumbnails`);

    let i = 0;
    images.forEach(image => {
        let thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.alt;
        thumbnail.id = `${gallery}-${i}`;

        if (i == 0) thumbnail.classList.add('active');

        thumbnailHolder.appendChild(thumbnail);

        thumbnail.addEventListener('click', function() {
            let thisIndex = thumbnail.id.split('-')[thumbnail.id.split('-').length - 1];

            let images = document.querySelectorAll(`#${gallery} img`);
            let thumbnails = document.querySelectorAll(`#${gallery}-thumbnails img`);
            let captions = document.querySelectorAll(`#${gallery}-captions div`);
            let thisCaption = document.getElementById(`${gallery}-caption-${thisIndex}`);

            images.forEach(image => image.style.display = 'none');
            image.style.display = 'block';

            let w = image.width;
            let captionHolder = document.getElementById(`${gallery}-captions`);
            captionHolder.style.width = `${w}px`;

            captions.forEach(caption => caption.style.display = 'none');
            thisCaption.style.display = 'block';

            thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        i++;
    });
});