document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal on scroll
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Mobile sticky CTA bar: hidden while the hero is on screen (if there is one),
  // otherwise shown after a small scroll so it doesn't cover a short page header.
  var mobileCta = document.getElementById('mobileCta');
  if (mobileCta) {
    var hero = document.querySelector('.hero');
    if (hero && 'IntersectionObserver' in window) {
      var ioCta = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          mobileCta.classList.toggle('visible', !e.isIntersecting);
        });
      }, { threshold: 0 });
      ioCta.observe(hero);
    } else {
      var onScroll = function () {
        mobileCta.classList.toggle('visible', window.scrollY > 160);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
});
