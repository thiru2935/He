var gallery = document.querySelector('#gallery');

if (!gallery) {
  console.error('Gallery element not found');
} else {
  var getVal = function (elem, style) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
  };
  
  var getHeight = function (item) {
    return item.querySelector('.content').getBoundingClientRect().height;
  };
  
  var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
      var el = item;
      el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
  };

  // Wait for all images to load before calculating spans
  var images = gallery.querySelectorAll('img');
  var loadedCount = 0;

  images.forEach(function (img) {
    img.classList.add('byebye');
    
    if (img.complete) {
      // Image already cached/loaded
      loadedCount++;
      if (loadedCount === images.length) {
        setTimeout(resizeAll, 100); // Small delay to ensure layout is ready
      }
    } else {
      // Wait for load event
      img.addEventListener('load', function () {
        loadedCount++;
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        var gitem = img.parentElement.parentElement;
        gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
        img.classList.remove('byebye');
        
        // All images loaded — final resize
        if (loadedCount === images.length) {
          resizeAll();
        }
      });
      
      // Handle load errors
      img.addEventListener('error', function () {
        loadedCount++;
        console.warn('Image failed to load:', img.src);
        if (loadedCount === images.length) {
          resizeAll();
        }
      });
    }
  });

  // Recalculate on window resize
  window.addEventListener('resize', resizeAll);

  // Click to zoom
  gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('full');
    });
  });
}