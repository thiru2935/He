(function ($) {
    "use strict";

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
        if ($(this).scrollTop() > 300) {
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
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
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
    
    function handleNavOverlay() {
      var toggler = document.querySelector('.navbar-toggler');
      var collapseEl = document.getElementById('navbarCollapse');
      var backdrop = document.getElementById('nav-backdrop');
      if (!toggler || !collapseEl || !backdrop || typeof bootstrap === 'undefined') return;
    
      var bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    
      // keep this in sync with the CSS transition (0.35s above) + small buffer
      var backdropFadeMs = 350;
      var openDelay = backdropFadeMs + 40;
      // helper that matches CSS breakpoint exactly
      function isMobile() {
        return window.matchMedia('(max-width: 767.98px)').matches;
      }    
      function startCloseSequence() {
        if (!collapseEl.classList.contains('show')) {
          // no menu -> hide backdrop immediately
          backdrop.classList.remove('visible');
          return;
        }
        if (collapseEl.classList.contains('closing')) return;
        collapseEl.classList.add('closing');
    
        var onEnd = function (e) {
          if (e && e.target !== collapseEl) return;
          collapseEl.removeEventListener('animationend', onEnd);
          collapseEl.classList.remove('closing');
          try { bsCollapse.hide(); } catch (err) { collapseEl.classList.remove('show'); }
        };
        collapseEl.addEventListener('animationend', onEnd);
    
        // fallback
        setTimeout(function () {
          if (collapseEl.classList.contains('closing')) {
            collapseEl.classList.remove('closing');
            try { bsCollapse.hide(); } catch (err) { collapseEl.classList.remove('show'); }
          }
        }, 800);
      }
    
      toggler.addEventListener('click', function (e) {
        if (!isMobile()) return;
        e.preventDefault();
        if (!collapseEl.classList.contains('show')) {
          // fade in backdrop first, then show collapse
          backdrop.classList.add('visible');
          setTimeout(function () { bsCollapse.show(); }, openDelay);
        } else {
          startCloseSequence();
        }
      });
    
      // all mobile close buttons
      var closeBtns = document.querySelectorAll('.mobile-nav-close');
      closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          if (!isMobile()) return;
          startCloseSequence();
        });
      });
    
      // clicking backdrop triggers same close sequence
      backdrop.addEventListener('click', function () {
        if (collapseEl.classList.contains('show')) startCloseSequence();
        else backdrop.classList.remove('visible');
      });
    
      // AFTER bootstrap hides the collapse, start backdrop fade-out (use backdropFadeMs)
      collapseEl.addEventListener('hidden.bs.collapse', function () {
        // allow small buffer then start fade-out; the CSS transition will animate opacity
        setTimeout(function () { backdrop.classList.remove('visible'); }, 10);
        // optionally ensure complete removal after fade finishes
        setTimeout(function () { backdrop.style.pointerEvents = ''; }, backdropFadeMs + 60);
      });
    
      // if collapse is shown programmatically ensure backdrop visible
      collapseEl.addEventListener('show.bs.collapse', function () {
        if (isMobile()) backdrop.classList.add('visible');
      });
    
      // cleanup on resize
      window.addEventListener('resize', function () {
        if (!isMobile()) {
          backdrop.classList.remove('visible');
          if (collapseEl.classList.contains('show')) {
            try { bsCollapse.hide(); } catch (err) { collapseEl.classList.remove('show'); }
          }
        }
      });
    }
    // call on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
      // ...existing init...
      handleNavOverlay(); // see: [`handleNavOverlay`](javascript/main.js)
    });
})(jQuery);

