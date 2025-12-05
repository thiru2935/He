(function ($) {
    "use strict";

    // Move isMobile to module scope so all event handlers can use it
    function isMobile() {
        return window.matchMedia('(max-width: 1100px)').matches;
    }

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.sticky-top').addClass('bg-white shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-white shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 100, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".hero-section-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // Testimonials carousel
    $(".testimonial-section-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: true,
        loop: true,
        nav: false
    });
    

})(jQuery);


function initNavSequence() {
  var toggler = document.querySelector('.navbar-toggler');
  var collapseEl = document.getElementById('navbarCollapse');
  var backdrop = document.getElementById('nav-backdrop');
  var navbar = document.querySelector('.navbar');
  var isMobileView = function() { return window.matchMedia('(max-width: 1000px)').matches; };

  if (!toggler || !collapseEl || !backdrop) return;

  // Create mobile close button if doesn't exist
  var mobileClose = document.querySelector('.mobile-nav-close');
  if (!mobileClose && isMobileView()) {
    mobileClose = document.createElement('button');
    mobileClose.className = 'mobile-nav-close';
    mobileClose.setAttribute('aria-label', 'Close navigation');
    mobileClose.setAttribute('type', 'button');
    document.body.appendChild(mobileClose);
  }

  try {
    toggler.removeAttribute('data-bs-toggle');
    toggler.removeAttribute('data-bs-target');
  } catch (err) {}

  var bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
  var backdropMs = 400;
  var collapseMs = 560;

  function setNavbarHeight() {
    if (!navbar) return;
    var h = navbar.offsetHeight || 80;
    document.documentElement.style.setProperty('--navbar-height', h + 'px');
  }

  function openSequence() {
    if (!isMobileView()) {
      try { bsCollapse.show(); } catch (e) { collapseEl.classList.add('show'); }
      return;
    }

    // Measure navbar height for CSS positioning
    setNavbarHeight();

    // Add nav-open class (CSS handles overflow: hidden)
    document.documentElement.classList.add('nav-open');
    document.body.classList.add('nav-open');

    // Step 1: Animate backdrop in first
    backdrop.classList.add('visible');

    // Step 2: After backdrop animation, show collapse panel
    setTimeout(function() {
      try { bsCollapse.show(); } catch (e) { collapseEl.classList.add('show'); }
    }, backdropMs);

    // Hide toggler, show close button
    toggler.classList.add('nav-hidden');
    if (mobileClose) mobileClose.style.display = 'flex';

    // Set stagger indices for nav items
    var items = collapseEl.querySelectorAll('.nav-item');
    items.forEach(function (it, i) { 
      it.style.setProperty('--stagger-index', i);
    });
    // Set total items count for reverse stagger on exit
    collapseEl.style.setProperty('--total-items', items.length);
  }

  function closeSequence() {
    if (!isMobileView()) {
      try { bsCollapse.hide(); } catch (e) { collapseEl.classList.remove('show'); }
      return;
    }

    // Step 1: Add exit class to collapse (triggers slide-out animation)
    collapseEl.classList.add('exit');

    // Step 2: After collapse exits, hide collapse and animate backdrop out
    setTimeout(function() {
      try { bsCollapse.hide(); } catch (e) { collapseEl.classList.remove('show'); }
      collapseEl.classList.remove('exit');

      // Step 3: Add exit class to backdrop (triggers fade-out animation)
      backdrop.classList.add('exit');

      // Step 4: After backdrop animation, remove nav-open and restore UI
      setTimeout(function() {
        backdrop.classList.remove('visible');
        backdrop.classList.remove('exit');
        
        document.documentElement.classList.remove('nav-open');
        document.body.classList.remove('nav-open');

        toggler.classList.remove('nav-hidden');
        if (mobileClose) mobileClose.style.display = 'none';
      }, backdropMs + 50);
    }, collapseMs);
  }

  toggler.addEventListener('click', function (e) {
    var cs = window.getComputedStyle(toggler);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.pointerEvents === 'none') return;
    e.preventDefault();
    e.stopImmediatePropagation && e.stopImmediatePropagation();

    if (!collapseEl.classList.contains('show')) {
      openSequence();
    } else {
      closeSequence();
    }
  });

  // Mobile close button click
  if (mobileClose) {
    mobileClose.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeSequence();
    });
  }

  // Backdrop click closes
  backdrop.addEventListener('click', function (e) {
    if (!isMobileView()) return;
    e && e.preventDefault && e.preventDefault();
    closeSequence();
  });

  // Sync UI with Bootstrap collapse events
  collapseEl.addEventListener('shown.bs.collapse', function () {
    if (navbar) navbar.classList.add('nav-open-top');
  });
  collapseEl.addEventListener('hidden.bs.collapse', function () {
    if (navbar) navbar.classList.remove('nav-open-top');
  });

  // Update navbar height on resize/orientation change
  window.addEventListener('resize', function () {
    if (isMobileView() && document.body.classList.contains('nav-open')) {
      setNavbarHeight();
    }
  }, { passive: true });
  window.addEventListener('orientationchange', function () {
    if (isMobileView() && document.body.classList.contains('nav-open')) {
      setNavbarHeight();
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  try { initNavSequence(); } catch (err) { console.error(err); }
});


/**
 * initTreeResponsive
 * - Makes the nested tree (ul/li) toggleable on small screens (<=768px)
 * - Adds/removes `expanded` class to li when its heading is tapped
 * - Non-invasive: only runs on mobile widths and does not modify HTML
 */
function initTreeResponsive() {
  var mq = window.matchMedia('(max-width: 1200px)');
  var tree = document.querySelector('.tree');
  if (!tree) return;

  // attach toggles to heading elements contained directly under li
  function attach() {
    // avoid duplicate handlers
    detach();

    var headings = tree.querySelectorAll('li > h4, li > h5, li > h6');
    headings.forEach(function (hd) {
      hd.__treeToggleHandler = function (e) {
        var li = hd.parentElement;
        if (!li) return;
        li.classList.toggle('expanded');
      };
      hd.addEventListener('click', hd.__treeToggleHandler, { passive: true });
    });

    // start collapsed: collapse all nested ULs
    tree.querySelectorAll('li').forEach(function (li) {
      // if li contains nested ul, ensure collapsed initially
      if (li.querySelector('ul')) li.classList.remove('expanded');
    });
  }

  function detach() {
    var headings = tree.querySelectorAll('li > h4, li > h5, li > h6');
    headings.forEach(function (hd) {
      if (hd.__treeToggleHandler) {
        hd.removeEventListener('click', hd.__treeToggleHandler);
        delete hd.__treeToggleHandler;
      }
    });
  }

  function handleChange() {
    if (mq.matches) {
      attach();
    } else {
      // desktop: ensure everything visible, remove expanded classes and handlers
      detach();
      tree.querySelectorAll('li').forEach(function (li) { li.classList.remove('expanded'); });
      // ensure nested lists are visible on larger screens
      tree.querySelectorAll('li > ul').forEach(function (ul) { ul.style.display = ''; });
    }
  }

  // init and listen for changes
  handleChange();
  try {
    mq.addEventListener ? mq.addEventListener('change', handleChange) : mq.addListener(handleChange);
  } catch (e) { window.addEventListener('resize', handleChange); }
}

// init on DOM ready (do not disturb existing DOMContentLoaded usage)
document.addEventListener('DOMContentLoaded', function () {
  try { initTreeResponsive(); } catch (err) { /* ignore */ }
});

