document.addEventListener('DOMContentLoaded', function() {
  // Select the timeline section
  var timelineWrap = document.querySelector('.timeline-wrap');
  if (!timelineWrap) return;
  var timelineItems = timelineWrap.querySelectorAll('.timeline > span');
  timelineItems.forEach(function(item) {
    item.classList.remove('timeline--active');
  });
  // Observer triggers when the top of .timeline-wrap enters the viewport
  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        timelineItems.forEach(function(item, i) {
          setTimeout(function() {
            item.classList.add('timeline--active');
          }, 700 * i);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  observer.observe(timelineWrap);
});