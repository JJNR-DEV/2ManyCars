"use strict";
const lazyLoad = () => {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    const lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains("lazy-background")) {
                    entry.target.classList.add('visible');
                    lazyImageObserver.unobserve(entry.target);
                }
                else if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
        lazyBackgrounds.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
    else {
        // Possibly fall back to a more compatible method here
    }
    smallScreenStates();
};
const smallScreenStates = () => {
    if (screen.width <= 500) {
        const content = `
    <div class="container text-center">
        <div class="row">
        <h1>Find us in all 50 States</h1>
          <div class="col-md-2 col-sm-2 col-xs-4">
          <ul>
              <li><a href="#">Alabama</a></li>
              <li><a href="#">Alaska</a></li>
              <li><a href="#">Arizona</a></li>
              <li><a href="#">Arkansas</a></li>
              <li><a href="#">California</a></li>
              <li><a href="#">Colorado</a></li>
              <li><a href="#">Connecticut</a></li>
              <li><a href="#">Delaware</a></li>
              <li><a href="#">Florida</a></li>
              </ul>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-4">
            <ul>
            <li><a href="#">Maine</a></li>
              <li><a href="#">Maryland</a></li>
              <li><a href="#">Massachusetts</a></li>
              <li><a href="#">Michigan</a></li>
              <li><a href="#">minnesota</a></li>
              <li><a href="#">Mississippi</a></li>
              <li><a href="#">Missouri</a></li>
              <li><a href="#">Montana</a></li>
              <li><a href="#">Nebraska</a></li>
              </ul>
              <a href="#">See all</a>
              </div>
              <div class="col-md-2 col-sm-2 col-xs-4">
              <ul>
              <li><a href="#">Nevada</a></li>
              <li><a href="#">New Hampshire</a></li>
              <li><a href="#">New Jersey</a></li>
              <li><a href="#">New Mexico</a></li>
              <li><a href="#">New York</a></li>
              <li><a href="#">North Carolina</a></li>
              <li><a href="#">North Dakota</a></li>
              <li><a href="#">Ohio</a></li>
              <li><a href="#">Oklahoma</a></li>
              </ul>
          </div>
          </div>
      </div>`;
        document.querySelectorAll('.states')[0].innerHTML = content;
    }
};
document.addEventListener("DOMContentLoaded", lazyLoad);
