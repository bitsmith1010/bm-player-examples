let yTotal = document.querySelector("body").scrollHeight;

// case not considered: window height changes
let yPartitionSize = parseInt(window.outerHeight/2);

yIntervalLoaded = Array(parseInt(yTotal/yPartitionSize) + 1);

/* "scroll" event handler - if the window is scrolled
 *  we check if the y-partition is entered for the
 *  first time or not. If it's as so, load the
 *  images that are in the new interval
 */
yIntervalIndexVisited = [parseInt(window.scrollY/2)];
document.addEventListener("scroll", function(event)
{
  // todo - add a throttle to the event handler
  yIntervalIndex = parseInt(window.scrollY / yPartitionSize);
  if (!yIntervalLoaded[yIntervalIndex]) {
    for (let image of document.images)
      if (0 < image.y && image.y < window.outerHeight)
        // THE DELAY IS INTENTIONAL:
        setTimeout(() => image.src = image.dataset.src, 1000)
      // this is for the case yPartitionSize = 1/2 * window size:
      yIntervalLoaded[yIntervalIndex] = true;
      yIntervalLoaded[yIntervalIndex + 1] = true;
  }
});
